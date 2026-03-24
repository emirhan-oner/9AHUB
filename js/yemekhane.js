let yemekMenu = [
    {
        date: "24.03.2026",
        day: "Salı",
        soup: "EZOGELİN ÇORBASI",
        main: "TAVUK SOTE",
        side: "PİRİNÇ PİLAVI",
        dessert: "AYRAN"
    },
    {
        date: "25.03.2026",
        day: "Çarşamba",
        soup: "DOMATES ÇORBASI",
        main: "İZMİR KÖFTE",
        side: "MAKARNA",
        dessert: "MEYVE"
    },
    {
        date: "26.03.2026",
        day: "Perşembe",
        soup: "YAYLA ÇORBASI",
        main: "MANİSA KEBAP",
        side: "BULGUR PİLAVI",
        dessert: "YOĞURT"
    },
    {
        date: "27.03.2026",
        day: "Cuma",
        soup: "MERCİMEK ÇORBASI",
        main: "TAVUK DÖNER",
        side: "PİRİNÇ PİLAVI",
        dessert: "AYRAN"
    }
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
