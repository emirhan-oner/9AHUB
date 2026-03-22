/**
 * Calendar App Core Logic
 * Handles Rendering, Supabase Sync, and Gemini AI Integration
 */

const CalendarApp = {
    state: {
        currentDate: new Date(),
        selectedDate: new Date(),
        birthdays: [],
        customEvents: [], // NEW
        dateMode: 'day', // 'day' or 'week'
        geminiKey: 'AIzaSyBFjFwAwZWufsh2sVgz6azEcvxAOp58x3o',
        supabaseConfig: {
            baseUrl: 'https://znrlvhbuzmukznnfxpjy.supabase.co/rest/v1/',
            apiKey: 'sb_publishable_VQ6Eu0R0LKEMZOh9P93L0w_qR3Ylyu3'
        }
    },

    async init() {
        console.log('📅 Calendar App Initializing...');
        this.render();
        await this.fetchBirthdays();
        await this.fetchCustomEvents(); // NEW
        await this.loadGeminiInsight();
        
        // Listen for page changes
        const observer = new MutationObserver(() => {
            const calPage = document.getElementById('calendarPage');
            const mCalPage = document.getElementById('mobileCalendarPage');
            if ((calPage && calPage.classList.contains('active')) || 
                (mCalPage && mCalPage.classList.contains('active'))) {
                this.render();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
        if (document.getElementById('calendarPage')) observer.observe(document.getElementById('calendarPage'), { attributes: true });
        if (document.getElementById('mobileCalendarPage')) observer.observe(document.getElementById('mobileCalendarPage'), { attributes: true });
    },

    async fetchBirthdays() {
        try {
            const res = await fetch(this.state.supabaseConfig.baseUrl + 'birthdays', {
                headers: {
                    'apikey': this.state.supabaseConfig.apiKey,
                    'Authorization': `Bearer ${this.state.supabaseConfig.apiKey}`
                }
            });
            if (res.ok) {
                this.state.birthdays = await res.json();
                this.render();
            }
        } catch (err) {
            console.error('Bday fetch error:', err);
        }
    },

    async fetchCustomEvents() {
        try {
            const res = await fetch(this.state.supabaseConfig.baseUrl + 'custom_events', {
                headers: {
                    'apikey': this.state.supabaseConfig.apiKey,
                    'Authorization': `Bearer ${this.state.supabaseConfig.apiKey}`
                }
            });
            if (res.ok) {
                this.state.customEvents = await res.json();
                this.render();
            }
        } catch (err) {
            console.error('Custom events fetch error:', err);
        }
    },

    async submitCustomEvent() {
        const title = document.getElementById('eventTitle').value;
        const type = document.getElementById('eventType').value;
        const dateVal = document.getElementById('eventDate').value;
        const certainty = document.getElementById('eventCertainty').value;
        const color = document.querySelector('input[name="eventColor"]:checked').value;
        const description = document.getElementById('eventDescription').value;

        if (!title || !dateVal) { alert("Lütfen başlık ve tarih girin."); return; }

        const eventData = {
            title,
            type,
            date: dateVal,
            certainty,
            color,
            description,
            mode: this.state.dateMode
        };

        try {
            const res = await fetch(this.state.supabaseConfig.baseUrl + 'custom_events', {
                method: 'POST',
                headers: {
                    'apikey': this.state.supabaseConfig.apiKey,
                    'Authorization': `Bearer ${this.state.supabaseConfig.apiKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(eventData)
            });

            if (res.ok) {
                await this.fetchCustomEvents();
                this.closeAddEventModal();
            } else {
                // Table might not exist yet, fallback to local
                console.warn('Supabase save failed, saving to localStorage fallback');
                const local = JSON.parse(localStorage.getItem('local_custom_events') || '[]');
                local.push(eventData);
                localStorage.setItem('local_custom_events', JSON.stringify(local));
                this.state.customEvents.push(eventData);
                this.render();
                this.closeAddEventModal();
            }
        } catch (err) {
            console.error('Submit error:', err);
        }
    },

    async loadGeminiInsight() {
        const todayStr = new Date().toISOString().split('T')[0];
        
        // 1. Check Local Cache
        const cached = localStorage.getItem('gemini_daily_insight');
        const cachedDate = localStorage.getItem('gemini_daily_date');
        if (cached && cachedDate === todayStr) {
            this.updateGeminiUI(cached);
            return;
        }

        // 2. Check Supabase 'daily_ai_insights'
        try {
            const res = await fetch(`${this.state.supabaseConfig.baseUrl}daily_ai_insights?date=eq.${todayStr}`, {
                headers: { 'apikey': this.state.supabaseConfig.apiKey, 'Authorization': `Bearer ${this.state.supabaseConfig.apiKey}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.length > 0) {
                    const text = data[0].insight;
                    localStorage.setItem('gemini_daily_insight', text);
                    localStorage.setItem('gemini_daily_date', todayStr);
                    this.updateGeminiUI(text);
                    return;
                }
            }
        } catch (e) {
            console.error("Supabase insight fetch error:", e);
        }

        // 3. Generate with Gemini
        const eventsToday = this.getEventsForDate(new Date());
        let prompt = `Bugün ${new Date().toLocaleDateString('tr-TR')}. `;
        if (eventsToday.length > 0) {
            prompt += `Bugünün özel olayları: ${eventsToday.map(e => e.title).join(', ')}. `;
        }
        prompt += "Bu günün anlamı veya bu özel günler hakkında çok kısa, ilham verici ve samimi bir Türkçe mesaj yaz (en fazla 2 cümle). Eğer özel bir gün yoksa genel bir günaydın/motivasyon mesajı ver. Yanıtı ham metin olarak ver.";

        try {
            const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.state.geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await geminiRes.json();
            const text = data.candidates[0].content.parts[0].text;
            
            // Save to Local
            localStorage.setItem('gemini_daily_insight', text);
            localStorage.setItem('gemini_daily_date', todayStr);
            this.updateGeminiUI(text);
            
            // Save to Supabase
            await fetch(this.state.supabaseConfig.baseUrl + 'daily_ai_insights', {
                method: 'POST',
                headers: { 'apikey': this.state.supabaseConfig.apiKey, 'Authorization': `Bearer ${this.state.supabaseConfig.apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: todayStr, insight: text })
            });
        } catch (err) {
            this.updateGeminiUI("Güzel bir gün dileriz! 🌟");
        }
    },

    updateGeminiUI(text) {
        const dEl = document.getElementById('geminiText');
        const mEl = document.getElementById('mobileGeminiText');
        if (dEl) dEl.innerText = text;
        if (mEl) mEl.innerText = text;
    },

    render() {
        const year = this.state.currentDate.getFullYear();
        const month = this.state.currentDate.getMonth();
        
        const monthName = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(this.state.currentDate);
        if (document.getElementById('desktopCalendarMonth')) document.getElementById('desktopCalendarMonth').innerText = monthName.toUpperCase();
        if (document.getElementById('mobileMonthLabel')) document.getElementById('mobileMonthLabel').innerText = monthName;

        this.renderDesktopGrid(year, month);
        this.renderMobileMiniGrid(year, month);
        this.renderEventList();
    },

    getEventsForDate(date) {
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const key = `${mm}-${dd}`;
        const dateStr = date.toISOString().split('T')[0];
        const events = [];

        // 1. Static Events (calendar_data.js)
        if (typeof CALENDAR_EVENTS_2026 !== 'undefined' && CALENDAR_EVENTS_2026[key]) {
            const evData = CALENDAR_EVENTS_2026[key];
            if (Array.isArray(evData)) {
                evData.forEach(ev => events.push({ ...ev, date: new Date(date) }));
            } else {
                events.push({ ...evData, date: new Date(date) });
            }
        }

        // 2. Birthdays
        this.state.birthdays.forEach(b => {
            const bDate = new Date(b.birth_date);
            if (bDate.getMonth() === date.getMonth() && bDate.getDate() === date.getDate()) {
                events.push({ title: `${b.name}'un Doğum Günü`, type: 'birthday', date: new Date(date) });
            }
        });

        // 3. Custom Events
        const allCustom = [...this.state.customEvents, ...JSON.parse(localStorage.getItem('local_custom_events') || '[]')];
        allCustom.forEach(e => {
            const eDate = new Date(e.date);
            if (e.mode === 'week') {
                const startOfWeek = new Date(eDate);
                const diff = (eDate.getDay() === 0) ? -6 : 1 - eDate.getDay();
                startOfWeek.setDate(eDate.getDate() + diff);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                if (date >= startOfWeek && date <= endOfWeek) {
                    events.push({ ...e, date: new Date(date) });
                }
            } else {
                if (eDate.toDateString() === date.toDateString()) {
                    events.push({ ...e, date: new Date(date) });
                }
            }
        });
        return events;
    },

    renderDesktopGrid(year, month) {
        const grid = document.getElementById('calendarDaysGrid');
        if (!grid) return;
        grid.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let startingPoint = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < startingPoint; i++) {
            grid.innerHTML += '<div class="cal-day-cell empty"></div>';
        }

        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const events = this.getEventsForDate(date);
            const isToday = date.toDateString() === today.toDateString();

            let cellHtml = `
                <div class="cal-day-cell ${isToday ? 'today' : ''}" onclick="CalendarApp.selectDate(${year}, ${month}, ${day})">
                    <span class="day-num">${day} ${isToday ? '<span style="font-size:8px; vertical-align:middle; opacity:0.5;">● BUGÜN</span>' : ''}</span>
                    <div class="cal-events-container" style="display:flex; flex-direction:column; gap:4px; margin-top:8px; overflow-x:hidden; overflow-y:auto; max-height:80px;">
                        ${events.map(e => `
                            <div class="cal-event-tag tag-${e.type}" 
                                 onclick="event.stopPropagation(); CalendarApp.showAiExplanation('${e.title}')"
                                 style="font-size:10px; padding:4px 8px; border-radius:6px; font-weight:700; ${e.color ? `background:${e.color}; color:#fff;` : ''} white-space:nowrap; overflow:hidden; text-overflow:ellipsis; cursor:pointer; max-width:100%; box-sizing:border-box;">
                                ${e.title}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            grid.innerHTML += cellHtml;
        }
    },

    selectDate(y, m, d) {
        this.state.selectedDate = new Date(y, m, d);
        this.render();
    },

    async showAiExplanation(title) {
        const modal = document.getElementById('aiExplanationModal');
        const titleEl = document.getElementById('aiModalTitle');
        const textEl = document.getElementById('aiModalText');
        const loading = document.getElementById('aiModalLoading');
        const result = document.getElementById('aiModalResult');

        if (!modal) return;
        modal.style.display = 'flex';
        titleEl.innerText = title;
        textEl.innerText = '';
        loading.style.display = 'block';
        result.style.display = 'none';

        let explanation = await this.fetchExplanationFromSupabase(title);
        if (!explanation) {
            explanation = await this.generateAiExplanation(title);
            if (explanation) await this.saveExplanationToSupabase(title, explanation);
        }

        loading.style.display = 'none';
        result.style.display = 'block';
        textEl.innerText = explanation || "Bu konu hakkında şu an bilgi veremiyorum.";
    },

    async fetchExplanationFromSupabase(title) {
        try {
            const res = await fetch(`${this.state.supabaseConfig.baseUrl}event_explanations?title=eq.${encodeURIComponent(title)}`, {
                headers: { 'apikey': this.state.supabaseConfig.apiKey, 'Authorization': `Bearer ${this.state.supabaseConfig.apiKey}` }
            });
            if (res.ok) {
                const data = await res.json();
                return data.length > 0 ? data[0].explanation : null;
            }
        } catch (e) { console.error(e); }
        return null;
    },

    async saveExplanationToSupabase(title, explanation) {
        try {
            await fetch(this.state.supabaseConfig.baseUrl + 'event_explanations', {
                method: 'POST',
                headers: { 'apikey': this.state.supabaseConfig.apiKey, 'Authorization': `Bearer ${this.state.supabaseConfig.apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, explanation })
            });
        } catch (e) { console.error(e); }
    },

    async generateAiExplanation(title) {
        const prompt = `"${title}" adlı özel gün/olay hakkında çok kısa, bilgilendirici ve samimi bir açıklama yaz. En fazla 3-4 cümle olsun. Yanıtı ham metin olarak ver.`;
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${this.state.geminiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await res.json();
            return data.candidates[0].content.parts[0].text;
        } catch (e) { return null; }
    },

    renderMobileMiniGrid(year, month) {
        const grid = document.getElementById('mobileCalendarMiniGrid');
        if (!grid) return;
        grid.innerHTML = '';
        
        const firstDay = new Date(year, month, 1).getDay(); 
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let startingPoint = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < startingPoint; i++) {
            grid.innerHTML += '<div class="mini-day-cell empty"></div>';
        }

        const today = new Date();
        const selDay = this.state.selectedDate;

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const events = this.getEventsForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = date.toDateString() === selDay.toDateString();
            
            let dotsHtml = '';
            if (events.length > 0) {
                dotsHtml = `<div style="display:flex; justify-content:center; gap:2px; margin-top:2px;">
                    ${events.slice(0,3).map(e => `<span style="width:4px; height:4px; border-radius:50%; background:${e.color || '#a69076'};"></span>`).join('')}
                </div>`;
            }

            let bg = 'transparent';
            let col = '#a69076';
            if (isSelected) { bg = '#413225'; col = '#fff'; }
            if (isToday && !isSelected) { bg = 'rgba(65, 50, 37, 0.1)'; col = '#413225'; }

            grid.innerHTML += `
                <div onclick="CalendarApp.selectDate(${year}, ${month}, ${day})" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; height:46px; border-radius:16px; margin:2px; background:${bg}; transition:all 0.2s;">
                    <span style="font-size:15px; font-weight:${isToday||isSelected?'900':'700'}; color:${col};">${day}</span>
                    ${dotsHtml}
                </div>
            `;
        }
    },

    renderEventList() {
        const list = document.getElementById('mobileEventList');
        const monthlyList = document.getElementById('monthlyEventsList');
        const selLabel = document.getElementById('selectedDateLabel');
        
        if (selLabel) {
            const isToday = this.state.selectedDate.toDateString() === new Date().toDateString();
            selLabel.innerText = isToday ? 'BUGÜN' : this.state.selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
        }

        if (list) {
            const events = this.getEventsForDate(this.state.selectedDate);
            if (events.length === 0) {
                list.innerHTML = `<div style="text-align:center; padding:20px; color:#a69076; font-size:12px; font-weight:700;">Bu tarihte etkinlik yok.</div>`;
            } else {
                list.innerHTML = events.map(e => `
                    <div style="background:#fff; border-radius:20px; padding:18px; margin-bottom:12px; display:flex; align-items:center; gap:15px; box-shadow:0 4px 15px rgba(166,144,118,0.05); border-left:4px solid ${e.color || '#a69076'};">
                        <div style="flex:1;">
                            <h4 style="margin:0 0 4px 0; font-size:15px; color:#413225; font-weight:850;">${e.title}</h4>
                            <span style="font-size:12px; color:#a69076; font-weight:700;">${e.description || e.type.toUpperCase()}</span>
                        </div>
                        <button onclick="CalendarApp.showAiExplanation('${e.title}')" style="background:rgba(147, 51, 234, 0.1); color:#9333ea; border:none; width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                            <i data-lucide="sparkles" style="width:18px; height:18px;"></i>
                        </button>
                    </div>
                `).join('');
            }
        }
        
        if (monthlyList) {
            const y = this.state.currentDate.getFullYear();
            const m = this.state.currentDate.getMonth();
            const endD = new Date(y, m + 1, 0).getDate();
            let allMonth = [];
            for(let d=1; d<=endD; d++) {
                allMonth = allMonth.concat(this.getEventsForDate(new Date(y, m, d)));
            }
            
            if (allMonth.length === 0) {
                monthlyList.innerHTML = `<div style="text-align:center; padding:20px; color:#a69076; font-size:12px; font-weight:700;">Bu ay için kayıtlı özel gün/etkinlik yok.</div>`;
            } else {
                const uniqueTitles = new Set();
                const uniqueEvents = allMonth.filter(e => {
                    if(uniqueTitles.has(e.title)) return false;
                    uniqueTitles.add(e.title);
                    return true;
                });
                
                monthlyList.innerHTML = uniqueEvents.map(e => `
                    <div style="background:#fff; border-radius:20px; padding:16px; margin-bottom:12px; display:flex; align-items:center; gap:18px; box-shadow:0 4px 15px rgba(166,144,118,0.05); border-left:4px solid ${e.color || '#f39c12'};">
                        <div style="width:45px; height:45px; background:rgba(243, 156, 18, 0.1); border-radius:14px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                            <span style="display:block; font-size:18px; font-weight:950; color:#f39c12; line-height:1;">${e.date.getDate()}</span>
                            <span style="font-size:9px; font-weight:800; color:#f39c12; margin-top:2px;">GÜN</span>
                        </div>
                        <div style="flex:1;">
                            <h4 style="margin:0 0 2px 0; font-size:14px; color:#413225; font-weight:850;">${e.title}</h4>
                            <span style="font-size:11px; color:#a69076; font-weight:700;">${e.type.toUpperCase()}</span>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 10);
        }
    },

    // UI HELPER METHODS
    openAddEventModal() {
        const modal = document.getElementById('addEventModal');
        if (modal) {
            modal.style.cssText = 'display: flex !important; visibility: visible !important; opacity: 1 !important; z-index: 999999 !important; pointer-events: auto !important; position: fixed !important; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); justify-content: center; align-items: center;';
            // Set default date to selected date
            const d = this.state.selectedDate;
            document.getElementById('eventDate').value = d.toISOString().split('T')[0];
        }
    },

    closeAddEventModal() {
        const modal = document.getElementById('addEventModal');
        if (modal) modal.style.display = 'none';
    },

    toggleDateMode(mode) {
        this.state.dateMode = mode;
        const btnDay = document.getElementById('btnSelectDay');
        const btnWeek = document.getElementById('btnSelectWeek');
        const hint = document.getElementById('weekSelectionHint');

        if (mode === 'day') {
            btnDay.classList.add('active');
            btnDay.style.background = '#413225';
            btnDay.style.color = '#fff';
            btnWeek.classList.remove('active');
            btnWeek.style.background = '#fff';
            btnWeek.style.color = '#a69076';
            if (hint) hint.style.display = 'none';
        } else {
            btnWeek.classList.add('active');
            btnWeek.style.background = '#413225';
            btnWeek.style.color = '#fff';
            btnDay.classList.remove('active');
            btnDay.style.background = '#fff';
            btnDay.style.color = '#a69076';
            if (hint) hint.style.display = 'block';
        }
    },

    onEventTypeChange() {
        const type = document.getElementById('eventType').value;
        const colorRadios = document.getElementsByName('eventColor');
        // Auto-select color based on type
        if (type === 'holiday') colorRadios[0].checked = true; // Red
        else if (type === 'special') colorRadios[1].checked = true; // Blue
        else if (type === 'birthday') colorRadios[2].checked = true; // Green
        else if (type === 'school-holiday') colorRadios[3].checked = true; // Orange
    }
};

// Global Helpers
function closeAiModal() {
    const modal = document.getElementById('aiExplanationModal');
    if (modal) modal.style.display = 'none';
}

function changeMonth(dir) {
    CalendarApp.state.currentDate.setMonth(CalendarApp.state.currentDate.getMonth() + dir);
    CalendarApp.render();
}

function goToToday() {
    CalendarApp.state.currentDate = new Date();
    CalendarApp.state.selectedDate = new Date();
    CalendarApp.render();
}

document.addEventListener('DOMContentLoaded', () => CalendarApp.init());
window.CalendarApp = CalendarApp;
