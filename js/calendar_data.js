/**
 * 2026 Turkish Holidays and Special Days
 * Data sourced from creamake.com and official calendars
 */
const CALENDAR_EVENTS_2026 = {
    // format: 'MM-DD': { title: '...', type: 'holiday|special' }
    '01-01': { title: 'Yılbaşı', type: 'holiday' },
    
    // School Breaks & Holidays 2025-2026
    '09-08': { title: 'Ders Yılı Başlangıcı', type: 'school-holiday' },

    '11-10': { title: 'Ara Tatil Başlangıcı', type: 'school-holiday' },
    '11-11': { title: 'Ara Tatil', type: 'school-holiday' },
    '11-12': { title: 'Ara Tatil', type: 'school-holiday' },
    '11-13': { title: 'Ara Tatil', type: 'school-holiday' },
    '11-14': { title: 'Ara Tatil Sonu', type: 'school-holiday' },

    '01-19': { title: 'Yarıyıl Tatili Başlangıcı', type: 'school-holiday' },
    '01-20': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-21': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-22': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-23': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-26': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-27': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-28': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-29': { title: 'Yarıyıl Tatili', type: 'school-holiday' },
    '01-30': { title: 'Yarıyıl Tatili Sonu', type: 'school-holiday' },

    '03-16': { title: 'Ara Tatil Başlangıcı', type: 'school-holiday' },
    '03-17': { title: 'Ara Tatil', type: 'school-holiday' },
    '03-18': { title: 'Ara Tatil', type: 'school-holiday' },
    '03-19': { title: 'Ara Tatil', type: 'school-holiday' },
    '03-20': { title: 'Ara Tatil Sonu', type: 'school-holiday' },

    '06-26': { title: 'Yaz Tatili Başlangıcı (Okullar Kapanıyor)', type: 'school-holiday' },

    '01-02': { title: 'Bilim Kurgu Günü', type: 'special' },
    '01-10': { title: 'Dünya Gazeteciler Günü', type: 'special' },
    '01-15': { title: 'Miraç Kandili', type: 'special' },
    '01-21': { title: 'Dünya Sarılma Günü', type: 'special' },
    '01-28': { title: 'Veri Koruma Günü', type: 'special' },
    
    '02-02': { title: 'Berat Kandili', type: 'special' },
    '02-04': { title: 'Dünya Kanser Günü', type: 'special' },
    '02-09': { title: 'Dünya Sigarayı Bırakma Günü', type: 'special' },
    '02-14': { title: 'Sevgililer Günü', type: 'special' },
    '02-17': { title: 'Dünya Kediler Günü', type: 'special' },
    '02-19': { title: 'Ramazan Ayı Başlangıcı', type: 'special' },
    '02-27': { title: 'Dünya Ressamlar Günü', type: 'special' },
    
    '03-08': { title: 'Dünya Kadınlar Günü', type: 'special' },
    '03-12': { title: 'İstiklâl Marşı\'nın Kabulü', type: 'special' },
    '03-14': { title: 'Tıp Bayramı', type: 'special' },
    '03-16': { title: 'Kadir Gecesi', type: 'special' },
    '03-18': { title: 'Çanakkale Zaferi', type: 'special' },
    '03-19': { title: 'Ramazan Bayramı Arefesi', type: 'holiday' },
    '03-20': { title: 'Ramazan Bayramı 1. Gün', type: 'holiday' },
    '03-21': { title: 'Ramazan Bayramı 2. Gün / Nevruz', type: 'holiday' },
    '03-22': { title: 'Ramazan Bayramı 3. Gün / Dünya Su Günü', type: 'holiday' },
    '03-27': { title: 'Dünya Tiyatrolar Günü', type: 'special' },
    
    '04-01': { title: 'Dünya Şaka Günü', type: 'special' },
    '04-02': { title: 'Dünya Otizm Farkındalık Günü', type: 'special' },
    '04-22': { title: 'Dünya Günü', type: 'special' },
    '04-23': { title: 'Ulusal Egemenlik ve Çocuk Bayramı', type: 'holiday' },
    
    '05-01': { title: 'Emek ve Dayanışma Günü', type: 'holiday' },
    '05-05': { title: 'Hıdırellez', type: 'special' },
    '05-10': { title: 'Anneler Günü', type: 'special' },
    '05-19': { title: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', type: 'holiday' },
    '05-26': { title: 'Kurban Bayramı Arefesi', type: 'holiday' },
    '05-27': { title: 'Kurban Bayramı 1. Gün', type: 'holiday' },
    '05-28': { title: 'Kurban Bayramı 2. Gün', type: 'holiday' },
    '05-29': { title: 'Kurban Bayramı 3. Gün / İstanbul\'un Fethi', type: 'holiday' },
    '05-30': { title: 'Kurban Bayramı 4. Gün', type: 'holiday' },
    
    '06-05': { title: 'Dünya Çevre Günü', type: 'special' },
    '06-16': { title: 'Hicri Yılbaşı', type: 'special' },
    '06-21': { title: 'Babalar Günü / En Uzun Gün', type: 'special' },
    '06-25': { title: 'Aşure Günü', type: 'special' },
    
    '07-15': { title: 'Demokrasi ve Millî Birlik Günü', type: 'holiday' },
    '07-30': { title: 'Dünya Arkadaşlık Günü', type: 'special' },
    
    '08-24': { title: 'Mevlid Kandili', type: 'special' },
    '08-30': { title: 'Zafer Bayramı', type: 'holiday' },
    
    '09-01': { title: 'Dünya Barış Günü', type: 'special' },
    '09-19': { title: 'Gaziler Günü', type: 'special' },
    '09-29': { title: 'Dünya Kalp Günü', type: 'special' },
    
    '10-11': { title: 'Dünya Kız Çocukları Günü', type: 'special' },
    '10-13': { title: 'Ankara\'nın Başkent Oluşu', type: 'special' },
    '10-29': { title: 'Cumhuriyet Bayramı', type: 'holiday' },
    
    '11-10': { title: 'Atatürk\'ü Anma Günü', type: 'special' },
    '11-20': { title: 'Dünya Çocuk Hakları Günü', type: 'special' },
    '11-24': { title: 'Öğretmenler Günü', type: 'special' },
    
    '12-05': { title: 'Dünya Kadın Hakları Günü', type: 'special' },
    '12-31': { title: 'Yılbaşı Gecesi', type: 'special' }
};

// --- MEB 2025-2026 Tatil Takvimi Entegrasyonu ---
const MEB_HOLIDAYS_25_26 = [
    // 1. Dönem Ara Tatili
    { range: ['11-10', '11-11', '11-12', '11-13', '11-14'], title: '1. Dönem Ara Tatili', type: 'school-holiday' },
    // Yarıyıl Tatili
    { range: ['01-19', '01-20', '01-21', '01-22', '01-23', '01-26', '01-27', '01-28', '01-29', '01-30'], title: 'Yarıyıl Tatili', type: 'school-holiday' },
    // 2. Dönem Ara Tatili
    { range: ['03-16', '03-17', '03-18', '03-19', '03-20'], title: '2. Dönem Ara Tatili', type: 'school-holiday' },
    // Yaz Tatili format
    { range: ['06-26', '06-29', '06-30'], title: 'Yaz Tatili', type: 'school-holiday' }
];

MEB_HOLIDAYS_25_26.forEach(holiday => {
    holiday.range.forEach(day => {
        if (CALENDAR_EVENTS_2026[day]) {
            if (!Array.isArray(CALENDAR_EVENTS_2026[day])) {
                CALENDAR_EVENTS_2026[day] = [CALENDAR_EVENTS_2026[day]];
            }
            CALENDAR_EVENTS_2026[day].push({ title: holiday.title, type: holiday.type });
        } else {
            CALENDAR_EVENTS_2026[day] = { title: holiday.title, type: holiday.type };
        }
    });
});

