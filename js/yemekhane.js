let yemekMenu = [
    { date: "01.04.2026", day: "Çarşamba", soup: "EZOGELİN ÇORBA", main: "CIZBIZ KÖFTE+SALATA", side: "PİRİNÇ PİLAVI", dessert: "AYRAN" },
    { date: "02.04.2026", day: "Perşembe", soup: "MERCİMEK ÇORBASI", main: "TAVUK ÇİFTLİK KEBAP", side: "MAKARNA", dessert: "ISLAK KEK" },
    { date: "03.04.2026", day: "Cuma", soup: "TARHANA ÇORBASI", main: "KIY. MANTI MAKARNA", side: "PATATES SALATASI", dessert: "SUPANGLE" },
    { date: "06.04.2026", day: "Pazartesi", soup: "EZOGELİN ÇORBA", main: "ETLİ KURU FASULYE", side: "PİRİNÇ PİLAVI", dessert: "KARIŞIK TURŞU" },
    { date: "07.04.2026", day: "Salı", soup: "MERCİMEK ÇORBASI", main: "EKŞİLİ KÖFTE", side: "BULGUR PİLAVI", dessert: "MEYVE SUYU" },
    { date: "08.04.2026", day: "Çarşamba", soup: "DOMATES ÇORBASI", main: "ÇITIRTI KEBAP", side: "MAKARNA", dessert: "MEYVE SUYU" },
    { date: "09.04.2026", day: "Perşembe", soup: "YAYLA ÇORBASI", main: "İZMİR KÖFTE", side: "BULGUR PİLAVI", dessert: "AYRAN" },
    { date: "10.04.2026", day: "Cuma", soup: "MERCİMEK ÇORBASI", main: "ETLİ BEZELYE", side: "PİRİNÇ PİLAVI", dessert: "TULUMBA TATLISI" },
    { date: "13.04.2026", day: "Pazartesi", soup: "MERCİMEK ÇORBASI", main: "ETLİ MANTI", side: "KISIR", dessert: "SUPANGLE" },
    { date: "14.04.2026", day: "Salı", soup: "EZOGELİN ÇORBA", main: "FIRIN TAVUK PİRZOLA", side: "MAKARNA", dessert: "MEYVE SUYU" },
    { date: "15.04.2026", day: "Çarşamba", soup: "DOMATES ÇORBASI", main: "YOĞ.SOS ISPANAK", side: "DİLİM PİZZA", dessert: "TREMİSU" },
    { date: "16.04.2026", day: "Perşembe", soup: "YAYLA ÇORBASI", main: "TAVUK ŞİNİZTEL", side: "PATATESLİ BÖREK", dessert: "İÇECEK" },
    { date: "17.04.2026", day: "Cuma", soup: "MERCİMEK ÇORBASI", main: "SOSİS TAVA&SEBZE", side: "SPAGETTİ", dessert: "YAŞ PASTA" },
    { date: "20.04.2026", day: "Pazartesi", soup: "EZOGELİN ÇORBA", main: "ETLİ NOHUT", side: "PİRİNÇ PİLAVI", dessert: "YOĞURT" },
    { date: "21.04.2026", day: "Salı", soup: "TARHANA ÇORBASI", main: "DÜRÜM TAVUK ŞİŞ", side: "MAKARNA", dessert: "MEYVE SUYU" },
    { date: "22.04.2026", day: "Çarşamba", soup: "SEBZE ÇORBASI", main: "HASAN PAŞA KÖFTE", side: "BULGUR PİLAVI", dessert: "AYRAN" },
    { date: "23.04.2026", day: "Perşembe", soup: "", main: "İYİ BAYRAMLAR", side: "", dessert: "" },
    { date: "24.04.2026", day: "Cuma", soup: "MERCİMEK ÇORBASI", main: "KIY. MANTI MAKARNA", side: "PATATES SALATASI", dessert: "SUPANGLE" },
    { date: "27.04.2026", day: "Pazartesi", soup: "TARHANA ÇORBASI", main: "KADINBUDU KÖFTE", side: "PATATESLİ BÖREK", dessert: "İÇECEK" },
    { date: "28.04.2026", day: "Salı", soup: "EZOGELİN ÇORBA", main: "ETLİ KURU FASULYE", side: "PİRİNÇ PİLAVI", dessert: "CACIK" },
    { date: "29.04.2026", day: "Çarşamba", soup: "DOMATES ÇORBASI", main: "SALÇALI KÖFTE", side: "BULGUR PİLAVI", dessert: "AYRAN" },
    { date: "30.04.2026", day: "Perşembe", soup: "YAYLA ÇORBASI", main: "KARNIYARIK", side: "PİRİNÇ PİLAVI", dessert: "YOĞURT" }
];

function initYemekhane() {
    // Sync with localStorage
    localStorage.setItem('yemekhane_menu', JSON.stringify(yemekMenu));
    renderYemekhaneDesktop();
    renderYemekhaneMobile();
}

function isToday(dateStr) {
    const today = new Date();
    // Parse our format "DD.MM.YYYY"
    const [d, m, y] = dateStr.split('.');
    const itemDate = new Date(y, m - 1, d);
    return today.toDateString() === itemDate.toDateString();
}

function renderYemekhaneDesktop() {
    const tableBody = document.getElementById('yemekTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = yemekMenu.map(item => {
        const activeClass = isToday(item.date) ? 'today-highlight' : '';
        return `
            <tr class="${activeClass}">
                <td>${item.date}<br><small>${item.day}</small></td>
                <td>Öğle Yemeği</td>
                <td>${item.soup}</td>
                <td>${item.main}</td>
                <td>${item.side}</td>
                <td>${item.dessert}</td>
            </tr>
        `;
    }).join('');
}

function renderYemekhaneMobile() {
    const mobileContainer = document.getElementById('mobileYemekList');
    if (!mobileContainer) return;

    mobileContainer.innerHTML = yemekMenu.map(item => {
        const activeClass = isToday(item.date) ? 'today-highlight' : '';
        return `
            <div class="yemek-card ${activeClass}">
                <div class="yemek-card-header">
                    <span class="yemek-date">${item.date}</span>
                    <span class="yemek-day">${item.day}</span>
                    ${isToday(item.date) ? '<span class="today-badge">BUGÜN</span>' : ''}
                </div>
                <div class="yemek-card-body">
                    <div class="yemek-item">
                        <i data-lucide="soup"></i>
                        <div class="yemek-text">
                            <label>Çorba</label>
                            <span>${item.soup}</span>
                        </div>
                    </div>
                    <div class="yemek-item">
                        <i data-lucide="utensils"></i>
                        <div class="yemek-text">
                            <label>Ana Yemek</label>
                            <span>${item.main}</span>
                        </div>
                    </div>
                    <div class="yemek-item">
                        <i data-lucide="component"></i>
                        <div class="yemek-text">
                            <label>Yardımcı Yemek</label>
                            <span>${item.side}</span>
                        </div>
                    </div>
                    <div class="yemek-item">
                        <i data-lucide="coffee"></i>
                        <div class="yemek-text">
                            <label>Tatlı / İçecek</label>
                            <span>${item.dessert}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    if (window.lucide) lucide.createIcons();
}
