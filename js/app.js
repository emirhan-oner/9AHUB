function updateCurrentTime() {
    const now = new Date();

    // Desktop Time: HH:mm
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    // Desktop Date: D MMMM YYYY (Matches screenshot style)
    const dateOptions = { day: 'numeric', month: 'long', weekday: 'long' };
    const dateStr = now.toLocaleDateString('tr-TR', dateOptions);

    const timeEl = document.getElementById('currentTime');
    const dateEl = document.getElementById('currentDate');
    const mobileDateEl = document.getElementById('mobileDateDisplay');

    if (timeEl) timeEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
    // Mobile stays uppercase as per previous design unless specified
    if (mobileDateEl) {
        const mobileDateStr = now.toLocaleDateString('tr-TR', { weekday: 'long', month: 'long', day: 'numeric' });
        mobileDateEl.textContent = mobileDateStr.toUpperCase();
    }

    // Sync Mobile Hero Card
    if (typeof updateMobileHeroCard === 'function') {
        updateMobileHeroCard();
    }

    // Sync Home Date Icons (NEW)
    if (typeof updateHomeDateIcons === 'function') {
        updateHomeDateIcons();
    }
}

/**
 * Sync Home Page Date Icons (Pzt-Cum) based on current week
 */
function updateHomeDateIcons() {
    const now = new Date();
    const monday = new Date(now);
    const day = now.getDay();
    const diff = (day === 0) ? -6 : 1 - day; // Adjust if Sunday
    monday.setDate(now.getDate() + diff);

    const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
    const cols = document.querySelectorAll('.modern-day-selector .day-col');

    cols.forEach((col, index) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + index);
        
        const circle = col.querySelector('.day-circle');
        if (circle) {
            circle.textContent = d.getDate();
            circle.dataset.day = dayNames[index];
            
            // Auto-highlight TODAY
            if (d.toDateString() === now.toDateString()) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        }
    });

    // Default timeline update for today
    const currentDayName = dayNames[day === 0 || day === 6 ? 0 : day - 1];
    if (typeof updateMobileTimeline === 'function') {
        updateMobileTimeline(currentDayName);
    }
}

// Real Weather Update for Ankara using Open-Meteo API (free, no key, CORS-friendly)
function updateWeather() {
    // Ankara coordinates: 39.9208, 32.8541
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=39.92&longitude=32.85&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Europe%2FIstanbul';
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const current = data.current;
            const tempC = Math.round(current.temperature_2m);
            const feelsLike = Math.round(current.apparent_temperature);
            const humidity = current.relative_humidity_2m;
            const weatherCode = current.weather_code;
            
            // Get Turkish weather description
            const conditionTR = getWeatherDescTR(weatherCode);
            // Get Lucide icon name
            const iconName = getWeatherIcon(weatherCode);
            
            // Update Desktop Weather Widget
            const tempEl = document.querySelector('.weather-info .temp');
            const condEl = document.querySelector('.weather-info .condition');
            if (tempEl) tempEl.textContent = tempC + '°';
            if (condEl) condEl.textContent = conditionTR;
            
            // Update Mobile Weather Widget
            const mTempEl = document.getElementById('mobileWeatherTemp');
            const mIconEl = document.getElementById('mobileWeatherIconInline');
            
            if (mTempEl) mTempEl.textContent = tempC + '°';
            
            // Update icon
            if (mIconEl) {
                mIconEl.setAttribute('data-lucide', iconName);
                if (window.lucide) lucide.createIcons();
            }
        })
        .catch(err => {
            console.warn('Hava durumu alınamadı:', err);
            const mTempEl = document.getElementById('mobileWeatherTemp');
            if (mTempEl) mTempEl.textContent = '--°';
        });
}

// WMO weather codes to Turkish descriptions
function getWeatherDescTR(code) {
    const map = {
        0: 'Açık', 1: 'Az Bulutlu', 2: 'Parçalı Bulutlu', 3: 'Kapalı',
        45: 'Sisli', 48: 'Kırağılı Sis',
        51: 'Hafif Çisenti', 53: 'Orta Çisenti', 55: 'Yoğun Çisenti',
        56: 'Dondurucu Çisenti', 57: 'Yoğun Don. Çisenti',
        61: 'Hafif Yağmur', 63: 'Yağmurlu', 65: 'Şiddetli Yağmur',
        66: 'Dondurucu Yağmur', 67: 'Yoğun Don. Yağmur',
        71: 'Hafif Kar', 73: 'Kar Yağışı', 75: 'Yoğun Kar',
        77: 'Kar Taneleri', 80: 'Hafif Sağanak', 81: 'Sağanak Yağmur',
        82: 'Şiddetli Sağanak', 85: 'Hafif Kar Sağanağı', 86: 'Yoğun Kar Sağanağı',
        95: 'Gök Gürültülü Fırtına', 96: 'Dolu ile Fırtına', 99: 'Şiddetli Dolu Fırtınası'
    };
    return map[code] || 'Bilinmeyen';
}

// WMO weather codes to Lucide icon names
function getWeatherIcon(code) {
    if (code === 0) return 'sun';
    if ([1, 2].includes(code)) return 'cloud-sun';
    if (code === 3) return 'cloud';
    if ([45, 48].includes(code)) return 'cloud-fog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'cloud-drizzle';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'cloud-rain';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'cloud-snow';
    if ([95, 96, 99].includes(code)) return 'cloud-lightning';
    return 'cloud';
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Reset Mobile Nav Active States
    document.querySelectorAll('.mobile-nav-item, .floating-nav-item, .dock-item').forEach(link => {
        link.classList.remove('active');
        link.style.color = ''; // Reset to CSS default
        const i = link.querySelector('i');
        if (i) i.style.color = '';
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });

    // Handle Mobile Top Nav Active state
    document.querySelectorAll('.mobile-top-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.onclick.toString().includes(`'${pageName}'`)) {
            link.classList.add('active');
        }
    });

    // Handle Mobile Back Button visibility
    const backBtn = document.getElementById('mobileBackBtn');
    if (backBtn) {
        if (pageName === 'home') {
            backBtn.classList.remove('show');
        } else {
            backBtn.classList.add('show');
        }
    }
    if (window.lucide) lucide.createIcons();


    if (pageName === 'home') {
        const homePage = document.getElementById('homePage');
        const mobileNav = document.getElementById('mobile-nav-home');
        if (homePage) homePage.classList.add('active');
        if (mobileNav) {
            mobileNav.classList.add('active');
            mobileNav.style.color = '#fff';
            const i = mobileNav.querySelector('i');
            if (i) i.style.color = '#fff';
        }
    } else if (pageName === 'schedule') {
        const schedulePage = document.getElementById('schedulePage');
        const navSchedule = document.getElementById('nav-schedule');
        const mobileNav = document.getElementById('mobile-nav-schedule');
        if (schedulePage) schedulePage.classList.add('active');
        if (navSchedule) navSchedule.classList.add('active');
        if (mobileNav) {
            mobileNav.classList.add('active');
            mobileNav.style.color = '#fff';
            const i = mobileNav.querySelector('i');
            if (i) i.style.color = '#fff';
        }
        if (window.innerWidth <= 768) {
            const mobileSchedule = document.getElementById('mobileScheduleContainer');
            const desktopControls = document.getElementById('desktopScheduleControls');
            const desktopTable = document.querySelector('.schedule-table');
            if (mobileSchedule) mobileSchedule.style.display = 'block';
            if (desktopControls) desktopControls.style.display = 'none';
            if (desktopTable) desktopTable.style.display = 'none';
            if (typeof setMobileScheduleView === 'function') {
                setMobileScheduleView('week');
            }
        }

    } else if (pageName === 'homework') {
        const homeworkPage = document.getElementById('homeworkPage');
        const navHomework = document.getElementById('nav-homework');
        const mobileNav = document.getElementById('mobile-nav-homework');
        if (homeworkPage) homeworkPage.classList.add('active');
        if (navHomework) navHomework.classList.add('active');
        if (mobileNav) {
            mobileNav.classList.add('active');
            mobileNav.style.color = '#fff';
            const i = mobileNav.querySelector('i');
            if (i) i.style.color = '#fff';
        }
        generateCalendar();
        renderHomeworkCards();
        // Also render mobile homework list to update count
        if (typeof renderMobileHomeworkList === 'function') {
            renderMobileHomeworkList();
        }
    } else if (pageName === 'exams') {
        const examsPage = document.getElementById('examsPage');
        const navExams = document.getElementById('nav-exams');
        const mobileNav = document.getElementById('mobile-nav-exams');
        if (examsPage) examsPage.classList.add('active');
        if (navExams) navExams.classList.add('active');
        if (mobileNav) {
            mobileNav.classList.add('active');
            mobileNav.style.color = '#fff';
            const i = mobileNav.querySelector('i');
            if (i) i.style.color = '#fff';
        }
        if (typeof initExams === 'function') {
            initExams();
        }
    } else if (pageName === 'hub') {
        const hubPage = document.getElementById('hubPage');
        const mobileNav = document.getElementById('mobile-nav-hub');
        const navHub = document.getElementById('nav-hub');
        if (hubPage) hubPage.classList.add('active');
        if (navHub) navHub.classList.add('active');
        if (mobileNav) {
            mobileNav.classList.add('active');
            mobileNav.style.color = '#fff';
            const i = mobileNav.querySelector('i');
            if (i) i.style.color = '#fff';
        }
        if (typeof initHub === 'function' && window.innerWidth <= 768) {
            initHub();
        }
        if (typeof initAi === 'function') initAi();
    } else if (pageName === 'calendar') {
        const calendarPage = document.getElementById('calendarPage');
        const mobileCalendarPage = document.getElementById('mobileCalendarPage');
        const navCalendar = document.getElementById('nav-calendar');
        if (calendarPage) calendarPage.classList.add('active');
        if (mobileCalendarPage) mobileCalendarPage.classList.add('active');
        if (navCalendar) navCalendar.classList.add('active');
        if (window.CalendarApp) CalendarApp.render();
    } else if (pageName === 'weather') {
        const weatherPage = document.getElementById('weatherDetailPage');
        if (weatherPage) weatherPage.classList.add('active');
        updateWeatherDetails();
    } else if (pageName === 'reminders') {
        const remindersPage = document.getElementById('remindersPage');
        if (remindersPage) remindersPage.classList.add('active');
        initReminders();
    } else if (pageName === 'obs') {
        const obsPage = document.getElementById('obsPage');
        const navObs = document.getElementById('nav-obs');
        if (obsPage) obsPage.classList.add('active');
        if (navObs) navObs.classList.add('active');
        if (typeof initOBS === 'function') initOBS();
    } else if (pageName === 'yemekhane') {
        const yemekhanePage = document.getElementById('yemekhanePage');
        const navYemekhane = document.getElementById('nav-yemekhane');
        if (yemekhanePage) yemekhanePage.classList.add('active');
        if (navYemekhane) navYemekhane.classList.add('active');
        if (typeof initYemekhane === 'function') initYemekhane();
    }
}

// Fetch and Render Detailed Weather (Hourly & Daily)
function updateWeatherDetails() {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=39.92&longitude=32.85&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FIstanbul';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Update Current Detail
            const current = data.current;
            const tempC = Math.round(current.temperature_2m);
            const feelsLike = Math.round(current.apparent_temperature);
            const humidity = current.relative_humidity_2m;
            const wind = current.wind_speed_10m;
            const weatherCode = current.weather_code;

            const dTemp = document.getElementById('detailWeatherTemp');
            const dIcon = document.getElementById('detailWeatherIcon');
            const dCond = document.getElementById('detailWeatherCond');
            const dHum = document.getElementById('detailWeatherHum');
            const dWind = document.getElementById('detailWeatherWind');
            const dFeels = document.getElementById('detailWeatherFeels');

            if (dTemp) dTemp.innerHTML = tempC + '<span style="margin-left: 6px;">°</span>';
            if (dCond) dCond.textContent = getWeatherDescTR(weatherCode);
            if (dHum) dHum.textContent = humidity + '%';
            if (dWind) dWind.textContent = wind + ' km/h';
            if (dFeels) dFeels.textContent = feelsLike + '°';
            if (dIcon) {
                const iconName = getWeatherIcon(weatherCode);
                dIcon.innerHTML = `<i data-lucide="${iconName}" style="width: 64px; height: 64px;"></i>`;
            }

            // Render Hourly
            const hourlyScroll = document.getElementById('hourlyForecastScroll');
            if (hourlyScroll) {
                hourlyScroll.innerHTML = '';
                const nowHour = new Date().getHours();
                
                // Show next 24 hours
                for (let i = nowHour; i < nowHour + 24; i++) {
                    const time = data.hourly.time[i];
                    const temp = Math.round(data.hourly.temperature_2m[i]);
                    const code = data.hourly.weather_code[i];
                    const date = new Date(time);
                    const hourStr = date.getHours().toString().padStart(2, '0') + ':00';
                    const icon = getWeatherIcon(code);
                    const isActive = i === nowHour;

                    const item = document.createElement('div');
                    item.className = `hourly-item ${isActive ? 'active' : ''}`;
                    item.innerHTML = `
                        <span class="h-time">${isActive ? 'Şimdi' : hourStr}</span>
                        <i data-lucide="${icon}"></i>
                        <span class="h-temp">${temp}°</span>
                    `;
                    hourlyScroll.appendChild(item);
                }
            }

            // Render Daily
            const dailyList = document.getElementById('dailyForecastList');
            if (dailyList) {
                dailyList.innerHTML = '';
                const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
                
                for (let i = 0; i < 7; i++) {
                    const date = new Date(data.daily.time[i]);
                    const dayName = i === 0 ? 'Bugün' : days[date.getDay()];
                    const dateStr = date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
                    const max = Math.round(data.daily.temperature_2m_max[i]);
                    const min = Math.round(data.daily.temperature_2m_min[i]);
                    const code = data.daily.weather_code[i];
                    const icon = getWeatherIcon(code);

                    const item = document.createElement('div');
                    item.className = 'daily-item';
                    item.innerHTML = `
                        <div class="d-day-info">
                            <span class="d-day-name">${dayName}</span>
                            <span class="d-day-date">${dateStr}</span>
                        </div>
                        <i data-lucide="${icon}"></i>
                        <div class="d-temp-info">
                            <span class="d-temp-max">${max}°</span>
                            <span class="d-temp-min">${min}°</span>
                        </div>
                    `;
                    dailyList.appendChild(item);
                }
            }

            if (window.lucide) lucide.createIcons();
        })
        .catch(err => console.error('Hava durumu detay hatası:', err));
}

window.addEventListener('load', () => {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    updateWeather();
    if (window.lucide) lucide.createIcons();
    setupViewToggles();

    // Setup day selection event listeners
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectDay(btn.dataset.day);
        });
    });

    // Mobile Day Selector Listeners (Modern)
    document.querySelectorAll('.day-circle').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedDay = btn.dataset.day;
            currentMobileTimelineDay = selectedDay;
            updateMobileTimeline(selectedDay);
        });
    });

    // Old Mobile Day Selector Listeners (Fallback)
    document.querySelectorAll('.m-day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedDay = btn.dataset.day;
            currentMobileTimelineDay = selectedDay;
            updateMobileTimeline(selectedDay);
        });
    });

    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
    const today = new Date().getDay();
    const currentDayName = days[today === 0 || today === 6 ? 0 : today - 1];

    selectDay(currentDayName);

    // Initialize Mobile Dashboard independently
    if (typeof updateMobileHeroCard === 'function') {
        updateMobileHeroCard();
    }
    if (typeof updateMobileTimeline === 'function') {
        // Default to TODAY instead of tomorrow for更好的 user exp
        const TurkishDays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        const todayName = TurkishDays[new Date().getDay()];
        currentMobileTimelineDay = (todayName === 'Pazar' || todayName === 'Cumartesi') ? 'Pazartesi' : todayName;
        updateMobileTimeline(currentMobileTimelineDay);
    }
});

// --- Class Reminders App Logic ---
let remindersData = JSON.parse(localStorage.getItem('classReminders')) || [];
let isAdmin = false;
let countdownInterval = null;

const SUPABASE_REM_URL = 'https://znrlvhbuzmukznnfxpjy.supabase.co/rest/v1/reminders';
const SUPABASE_REM_KEY = 'sb_publishable_VQ6Eu0R0LKEMZOh9P93L0w_qR3Ylyu3';

async function fetchRemindersFromSupabase() {
    try {
        const res = await fetch(SUPABASE_REM_URL, {
            headers: { 'apikey': SUPABASE_REM_KEY, 'Authorization': `Bearer ${SUPABASE_REM_KEY}` }
        });
        if (res.ok) {
            const data = await res.json();
            remindersData = data;
            localStorage.setItem('classReminders', JSON.stringify(remindersData));
            renderReminders();
        }
    } catch (e) {
        console.error("Reminders Supabase fetch error:", e);
    }
}

function initReminders() {
    // Show cached immediately
    renderReminders();
    
    // Fetch fresh from Supabase only when page opens
    fetchRemindersFromSupabase();
    
    if (!countdownInterval) {
        countdownInterval = setInterval(updateRemindersCountdowns, 1000);
    }
}

function renderReminders() {
    const list = document.getElementById('remindersList');
    const countBadge = document.getElementById('activeRemindersCount');
    if (!list) return;

    if (remindersData.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i data-lucide="bell-off"></i>
                <p>Henüz aktif bir hatırlatıcı yok.</p>
            </div>`;
    } else {
        // Sort: Countdowns first (by date), then Announcements (by creation)
        const sorted = [...remindersData].sort((a, b) => {
            if (a.type === 'announcement' && b.type !== 'announcement') return 1;
            if (a.type !== 'announcement' && b.type === 'announcement') return -1;
            if (a.type === 'countdown' && b.type === 'countdown') {
                return new Date(a.target) - new Date(b.target);
            }
            return (b.id + '').split('-')[1] - (a.id + '').split('-')[1]; // Newest announcements first
        });
        
        list.innerHTML = sorted.map(rem => {
            const isAnnouncement = rem.type === 'announcement';
            const timeRemaining = isAnnouncement ? "YAYINDA" : calculateTimeRemaining(rem.target);
            const catInfo = getCategoryInfo(rem.category);
            
            return `
                <div class="reminder-card ${rem.urgency} ${isAnnouncement ? 'announcement' : ''}" id="rem-${rem.id}">
                    <div class="reminder-header">
                        <div class="rem-cat-icon" style="background: ${catInfo.bg}; color: ${catInfo.color}">
                            <i data-lucide="${catInfo.icon}"></i>
                        </div>
                        <div class="rem-title-wrap">
                            <span class="rem-title">${rem.title}</span>
                            <p class="rem-desc">${rem.desc}</p>
                        </div>
                        ${isAdmin ? `
                            <button class="delete-rem-btn" onclick="deleteReminder('${rem.id}')">
                                <i data-lucide="trash-2"></i>
                            </button>
                        ` : ''}
                    </div>
                    <div class="reminder-footer">
                        <div class="countdown-wrap">
                            <span class="countdown-label">${isAnnouncement ? 'BİLGİ' : 'KALAN SÜRE'}</span>
                            <div class="countdown-timer" id="timer-${rem.id}" style="${isAnnouncement ? 'color: #a69076; font-size: 14px;' : ''}">${timeRemaining}</div>
                        </div>
                        <span class="rem-date-tag">${isAnnouncement ? 'Duyuru' : formatRemDate(rem.target)}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (countBadge) countBadge.textContent = remindersData.length;
    if (window.lucide) lucide.createIcons();
}

function calculateTimeRemaining(targetDate) {
    if (!targetDate) return "SÜRE BELİRTİLMEDİ";
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff <= 0) return "SÜRE DOLDU";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}g ${hours}s ${mins}d`;
    return `${hours}s ${mins}d ${secs}s`;
}

// Logic for Admin / Modal handling
function onReminderTypeChange() {
    const type = document.getElementById('remType').value;
    const timingSection = document.getElementById('timingSection');
    if (type === 'announcement') {
        timingSection.style.display = 'none';
    } else {
        timingSection.style.display = 'block';
    }
}

function onTimeModeChange() {
    const mode = document.getElementById('remTimeMode').value;
    const dtFields = document.getElementById('dateTimeFields');
    const durFields = document.getElementById('durationFields');
    
    if (mode === 'datetime') {
        dtFields.style.display = 'flex';
        durFields.style.display = 'none';
    } else {
        dtFields.style.display = 'none';
        durFields.style.display = 'block';
    }
}

function saveReminder() {
    const type = document.getElementById('remType').value;
    const title = document.getElementById('remTitle').value;
    const desc = document.getElementById('remDesc').value;
    const cat = document.getElementById('remCategory').value;
    const urgency = document.querySelector('input[name="remUrgency"]:checked').value;

    if (!title) {
        alert("Lütfen başlık alanını doldurun.");
        return;
    }

    let target = null;

    if (type === 'countdown') {
        const mode = document.getElementById('remTimeMode').value;
        if (mode === 'datetime') {
            const date = document.getElementById('remDate').value;
            const time = document.getElementById('remTime').value;
            if (!date || !time) {
                alert("Lütfen tarih ve saat seçin.");
                return;
            }
            // Add seconds and parse as fully valid Date, then convert to strict UTC ISO string
            const localDateObj = new Date(`${date}T${time}:00`);
            target = localDateObj.toISOString();
        } else {
            const duration = parseInt(document.getElementById('remDuration').value);
            if (!duration || duration <= 0) {
                alert("Lütfen geçerli bir süre girin.");
                return;
            }
            const targetDate = new Date(new Date().getTime() + duration * 60000);
            target = targetDate.toISOString(); // Full UTC ISO string preserving timezone accuracy
        }
    }

    const newRem = {
        id: 'rem-' + Date.now(),
        type,
        title,
        desc,
        target,
        category: cat,
        urgency: urgency
    };

    // Save to Supabase asynchronously
    fetch(SUPABASE_REM_URL, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_REM_KEY,
            'Authorization': `Bearer ${SUPABASE_REM_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(newRem)
    }).catch(e => console.error("Supabase Save Error:", e));

    remindersData.push(newRem);
    localStorage.setItem('classReminders', JSON.stringify(remindersData));
    
    closeAddReminderModal();
    renderReminders();
    
    // Reset form fields
    document.getElementById('remTitle').value = '';
    document.getElementById('remDesc').value = '';
    document.getElementById('remDate').value = '';
    document.getElementById('remTime').value = '';
    document.getElementById('remDuration').value = '';
    document.getElementById('remType').value = 'countdown';
    document.getElementById('remTimeMode').value = 'datetime';
    onReminderTypeChange();
    onTimeModeChange();
}

function deleteReminder(id) {
    if (!confirm("Bu hatırlatıcıyı silmek istediğinize emin misiniz?")) return;
    
    // Delete from Supabase asynchronously
    fetch(`${SUPABASE_REM_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: { 'apikey': SUPABASE_REM_KEY, 'Authorization': `Bearer ${SUPABASE_REM_KEY}` }
    }).catch(e => console.error("Supabase Delete Error", e));

    remindersData = remindersData.filter(rem => rem.id !== id);
    localStorage.setItem('classReminders', JSON.stringify(remindersData));
    renderReminders();
}

function getCategoryInfo(cat) {
    const cats = {
        exam: { icon: 'pencil', bg: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d' },
        homework: { icon: 'book-open', bg: 'rgba(77, 166, 255, 0.1)', color: '#4da6ff' },
        event: { icon: 'calendar', bg: 'rgba(166, 77, 255, 0.1)', color: '#a64dff' },
        alert: { icon: 'alert-triangle', bg: 'rgba(255, 166, 77, 0.1)', color: '#ffa64d' },
        custom: { icon: 'star', bg: 'rgba(77, 255, 173, 0.1)', color: '#4da676' }
    };
    return cats[cat] || cats.custom;
}

function formatRemDate(dateStr) {
    if (!dateStr) return "Duyuru";
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function updateRemindersCountdowns() {
    remindersData.forEach(rem => {
        if (rem.type === 'countdown') {
            const timerEl = document.getElementById(`timer-${rem.id}`);
            if (timerEl) {
                timerEl.textContent = calculateTimeRemaining(rem.target);
            }
        }
    });
}

// Admin / Modal helpers
function toggleAdminPanel() {
    if (isAdmin) {
        isAdmin = false;
        document.getElementById('addReminderBtn').classList.add('hidden');
        renderReminders();
        alert("Yönetici modundan çıkıldı.");
    } else {
        document.getElementById('adminLoginModal').style.display = 'flex';
        document.getElementById('adminPasswordInput').value = '';
        document.getElementById('loginError').classList.add('hidden');
    }
}

function verifyAdminPassword() {
    const pass = document.getElementById('adminPasswordInput').value;
    if (pass === '829615') {
        isAdmin = true;
        closeAdminModal();
        document.getElementById('addReminderBtn').classList.remove('hidden');
        renderReminders();
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function closeAdminModal() {
    document.getElementById('adminLoginModal').style.display = 'none';
}

function openAddReminderModal() {
    document.getElementById('addReminderModal').style.display = 'flex';
}

function closeAddReminderModal() {
    document.getElementById('addReminderModal').style.display = 'none';
}


