const teacherData = [
    {
        id: "cihan-ulusu",
        name: "CİHAN ULUSU (C.ULS)",
        subject: "Biyoloji / Sağlık Bilgisi",
        classTeacher: "10-G",
        classes: ["9-A", "9-B", "9-G", "10-F", "10-G", "10-H", "12-B"],
        freeDay: "Hafta içi her gün dersi var",
        schedule: {
            "Pazartesi": ["08:00 (9-A Sağlık)", "11:30 (10-H Biyoloji)", "13:50 (10-F Biyoloji)"],
            "Salı": ["09:40 (12-B Biyoloji)", "10:30 (9-B Sağlık)", "11:30 (9-G Sağlık)"],
            "Çarşamba": ["08:00 (9-B Biyoloji)"],
            "Perşembe": ["09:40 (9-G Biyoloji)", "11:30 (12-B Biyoloji)"],
            "Cuma": ["09:40 (9-A Biyoloji)", "11:30 (10-G Rehberlik)", "13:50 (10-G Biyoloji)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=cihan"
    },
    {
        id: "maruf-beddur",
        name: "MARUF BEDDUR (M.BDD)",
        subject: "Coğrafya",
        classTeacher: "10-B",
        classes: ["9-A", "9-C", "9-E", "9-G", "9-H", "10-B", "10-C", "10-D", "10-F", "10-H", "11-J", "12-L"],
        freeDay: "Pazartesi",
        schedule: {
            "Salı": ["13:00 (10-B Rehberlik)", "13:50 (9-G Coğrafya)"],
            "Çarşamba": ["08:00 (10-H Coğrafya)", "09:40 (11-J Coğrafya)", "11:30 (10-F Coğrafya)"],
            "Perşembe": ["08:00 (9-C Coğrafya)", "10:30 (10-B Coğrafya)", "11:30 (9-H Coğrafya)", "13:50 (10-D Coğrafya)"],
            "Cuma": ["08:00 (9-A Coğrafya)", "09:40 (9-E Coğrafya)", "13:50 (11-J Coğrafya)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maruf"
    },
    {
        id: "ozcan-kilic",
        name: "ÖZCAN KILIÇ (Ö.KLÇ)",
        subject: "Fizik",
        classTeacher: null,
        classes: ["9-A", "9-B", "11-C", "11-H", "12-C", "12-D", "12-E"],
        freeDay: "Pazartesi",
        schedule: {
            "Salı": ["13:50 (12-C/D Fizik)"],
            "Çarşamba": ["13:50 (9-B Fizik)"],
            "Perşembe": ["08:00 (12-C Fizik)", "10:30 (9-A Fizik)", "13:50 (11-C Fizik)", "15:20 (12-D/E Fizik)"],
            "Cuma": ["09:40 (11-H/12-D Fizik)", "13:50 (12-C Fizik)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ozcan"
    },
    {
        id: "ayse-bayazit",
        name: "AYŞE BAYAZİT (A.BYZ)",
        subject: "Kimya",
        classTeacher: "9-A",
        classes: ["9-A", "9-B", "9-C", "9-D", "10-B", "10-C", "10-D"],
        freeDay: "Yok",
        schedule: {
            "Pazartesi": ["11:30 (9-B Kimya)", "13:50 (9-A Kimya)"],
            "Salı": ["13:50 (10-B Kimya)"],
            "Çarşamba": ["11:30 (9-C Kimya)", "13:50 (10-D Kimya)"],
            "Perşembe": ["09:40 (9-D Kimya)", "11:30 (9-A Rehberlik)"],
            "Cuma": ["13:50 (10-C Kimya)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ayse"
    },
    {
        id: "deniz-yuksel-tas",
        name: "DENİZ YÜKSEL TAŞ (D.TAŞ)",
        subject: "Matematik",
        classTeacher: "9-B",
        classes: ["9-A", "9-B", "12-A"],
        freeDay: "Yok",
        schedule: {
            "Pazartesi": ["09:40 (9-B Rehberlik)", "10:30 (12-A Matematik)", "11:30 (9-B Matematik)", "13:00-15:20 (12-A Destek)"],
            "Salı": ["09:40 (9-A Matematik)", "11:30 (12-A Matematik)"],
            "Çarşamba": ["11:30 (12-A Matematik)", "13:50 (9-B Matematik)"],
            "Perşembe": ["08:00 (12-A Matematik)", "13:50 (9-B Matematik)"],
            "Cuma": ["11:30 (9-A Matematik)", "13:50 (9-B Matematik)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=deniz"
    },
    {
        id: "tahsin-findik",
        name: "TAHSİN FINDIK (T.FND)",
        subject: "Tarih / İnkılap Tarihi",
        classTeacher: null,
        classes: ["9-A", "9-B", "10-A", "10-B", "12-J", "12-K", "12-L", "12-M"],
        freeDay: "Pazartesi",
        schedule: {
            "Salı": ["08:00 (10-A Tarih)", "09:40 (10-B Tarih)", "16:00 (12-L Tarih)"],
            "Çarşamba": ["08:00 (9-A Tarih)", "11:30 (12-M Tarih)"],
            "Perşembe": ["13:50 (12-K İnkılap)", "15:20 (12-L İnkılap)"],
            "Cuma": ["13:50 (12-M İnkılap)", "16:00 (12-J İnkılap)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=tahsin"
    },
    {
        id: "erkan-nakas",
        name: "ERKAN NAKAS (E.NKS)",
        subject: "Türk Sosyal Hayatında Aile",
        classTeacher: null,
        classes: ["9-A", "9-B", "9-C", "9-D", "9-E", "9-F"],
        freeDay: "Çarşamba ve Perşembe",
        schedule: {
            "Pazartesi": ["08:50 (9-A Aile)", "13:00 (9-C Aile)"],
            "Salı": ["08:00 (9-D Aile)", "08:50 (9-B Aile)"],
            "Cuma": ["13:50 (9-F Aile)", "14:35 (9-E Aile)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=erkan"
    },
    {
        id: "meliha-bulut",
        name: "MELİHA BULUT (M.BLT)",
        subject: "Almanca",
        classTeacher: null,
        classes: ["HAZ-B", "HAZ-C", "9-A", "9-B", "10-A"],
        freeDay: "Yok",
        schedule: {
            "Pazartesi": ["11:30 (HAZ-B)", "11:30 (10-A)", "16:00 (HAZ-C)"],
            "Salı": ["09:40 (9-B)", "11:30 (9-A)"],
            "Çarşamba": ["11:30 (10-A)", "13:50 (HAZ-B)"],
            "Perşembe": ["11:30 (9-B)", "13:50 (10-A)"],
            "Cuma": ["13:50 (9-A)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=meliha"
    },
    {
        id: "murat-degirmenci",
        name: "MURAT DEĞİRMENCİ (M.DĞR)",
        subject: "Beden Eğitimi",
        classTeacher: null,
        classes: ["HAZ-B", "HAZ-D", "HAZ-G", "9-A", "9-D", "10-C", "11-A..."],
        freeDay: "Yok",
        schedule: "Program geneline yayılmıştır.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=murat"
    },
    {
        id: "cahit-nalli",
        name: "CAHİT NALLI (C.NAL)",
        subject: "Bilişim Teknolojileri ve Yazılım",
        classTeacher: null,
        classes: ["HAZ-D", "HAZ-E", "HAZ-F", "HAZ-G", "9-A", "9-B", "9-E", "9-F"],
        freeDay: "Yok",
        schedule: {
            "Pazartesi": ["11:30 (HAZ-D)", "13:50 (HAZ-E)"],
            "Salı": ["11:30 (HAZ-F)", "13:50 (HAZ-G)"],
            "Çarşamba": ["10:30 (9-A)", "11:30 (HAZ-D)"],
            "Perşembe": ["10:30 (9-B)", "13:50 (HAZ-E)"],
            "Cuma": ["11:30 (HAZ-F)", "13:50 (9-E)", "14:35 (9-F)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=cahit"
    },
    {
        id: "arif-domurcuk",
        name: "ARİF DOMURCUK (A.DMR)",
        subject: "Din Kültürü / Temel Dini Bilgiler",
        classTeacher: null,
        classes: ["9-A", "9-B", "9-C", "9-D", "10-A", "12-A", "12-D"],
        freeDay: "Cuma",
        schedule: {
            "Pazartesi": ["08:00 (9-B Din)", "11:30 (10-A TDB)"],
            "Salı": ["08:00 (9-B TDB)", "08:50 (9-C TDB)", "09:40 (9-D TDB)"],
            "Çarşamba": ["11:30 (9-A TDB)"],
            "Perşembe": ["09:40 (12-D Din)", "11:30 (12-A Din)", "13:50 (9-A Din)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=arif"
    },
    {
        id: "677-dincer-esitgin",
        id: "dincer-esitgin",
        name: "DİNÇER EŞİTGİN (D.EŞT)",
        subject: "Türk Dili ve Edebiyatı",
        classTeacher: null,
        classes: ["HAZ-E", "HAZ-F", "9-A", "9-B"],
        freeDay: "Pazartesi",
        schedule: {
            "Salı": ["08:00 (9-A Edebiyat)"],
            "Çarşamba": ["09:40 (9-A Edebiyat)", "13:50 (HAZ-E Edebiyat)"],
            "Perşembe": ["08:00 (9-B Edebiyat)"],
            "Cuma": ["08:00 (HAZ-F Edebiyat)", "09:40 (9-B Edebiyat)", "11:30 (HAZ-E Edebiyat)"]
        },
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dincer"
    },
    {
        id: "ali-eroglu-ebru-misirli",
        name: "Ali Eroğlu / Ebru Mısırlı",
        subject: "Görsel Sanatlar / Müzik",
        classTeacher: null,
        classes: ["Okulun tüm seviyeleri"],
        freeDay: "Yok",
        schedule: "Her gün farklı sınıflarda dersleri bulunmaktadır.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=art"
    }
];

const OBS_API_KEY = 'sb_publishable_VQ6Eu0R0LKEMZOh9P93L0w_qR3Ylyu3';

function getTeacherImgUrl(teacherId) {
    return `https://znrlvhbuzmukznnfxpjy.supabase.co/storage/v1/object/public/hub_files/teacher_profiles/${teacherId}.jpg`;
}

function renderTeachers(query = '') {
    const grid = document.getElementById('teacherGrid');
    if (!grid) return;

    const filtered = teacherData.filter(t => 
        t.name.toLowerCase().includes(query.toLowerCase()) || 
        t.subject.toLowerCase().includes(query.toLowerCase())
    );

    grid.innerHTML = filtered.map(teacher => `
        <div class="teacher-card animate-fade-in" onclick="openTeacherDetail('${teacher.id}')">
            <div class="teacher-profile-img">
                <img id="grid-img-${teacher.id}" src="${getTeacherImgUrl(teacher.id)}" onerror="this.onerror=null; this.src='${teacher.image}';" alt="${teacher.name}">
            </div>
            <div class="teacher-info">
                <h3 class="teacher-name">${teacher.name}</h3>
                <span class="teacher-subject">${teacher.subject}</span>
            </div>
            <div class="teacher-card-action">
                <i data-lucide="chevron-right"></i>
            </div>
        </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
}

function initOBS() {
    renderTeachers('');
}

function filterTeachers() {
    const input = document.getElementById('obsTeacherSearch');
    if(input) {
        renderTeachers(input.value);
    }
}

function openTeacherDetail(id) {
    const teacher = teacherData.find(t => t.id === id);
    if (!teacher) return;

    const modal = document.getElementById('teacherDetailModal');
    const modalContent = document.getElementById('teacherDetailContent');
    if (!modal || !modalContent) return;

    let scheduleHtml = '';
    if (typeof teacher.schedule === 'string') {
        scheduleHtml = `<p class="schedule-text">${teacher.schedule}</p>`;
    } else {
        scheduleHtml = `
            <div class="teacher-schedule-table">
                ${Object.entries(teacher.schedule).map(([day, lessons]) => `
                    <div class="schedule-row">
                        <span class="day-label">${day}</span>
                        <div class="lessons-list">
                            ${lessons.map(lesson => `<span class="lesson-tag">${lesson}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    modalContent.innerHTML = `
        <div class="teacher-detail-header">
            <div class="detail-profile-img" style="position: relative;">
                <img id="modal-img-${teacher.id}" src="${getTeacherImgUrl(teacher.id)}" onerror="this.onerror=null; this.src='${teacher.image}';" alt="${teacher.name}">
                <label for="uploadTeacherImg-${teacher.id}" style="position: absolute; bottom: -5px; right: -5px; background: #a69076; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border: 2px solid #fff;">
                    <i id="upload-icon-${teacher.id}" data-lucide="camera" style="width: 16px; height: 16px;"></i>
                </label>
                <input type="file" id="uploadTeacherImg-${teacher.id}" style="display: none;" accept="image/*" onchange="uploadTeacherImage(event, '${teacher.id}')">
            </div>
            <div class="detail-main-info">
                <h2>${teacher.name}</h2>
                <div class="detail-badge">${teacher.subject}</div>
            </div>
        </div>
        <div class="teacher-detail-body">
            <div class="detail-section">
                <h3>Genel Bilgiler</h3>
                <div class="detail-tags">
                    <div class="detail-tag-item">
                        <i data-lucide="users"></i>
                        <span>Sınıflar: ${teacher.classes.join(', ')}</span>
                    </div>
                    ${teacher.classTeacher ? `
                        <div class="detail-tag-item highlight">
                            <i data-lucide="award"></i>
                            <span>Rehber: ${teacher.classTeacher}</span>
                        </div>
                    ` : ''}
                    <div class="detail-tag-item ${teacher.freeDay !== 'Yok' && teacher.freeDay !== 'Hafta içi her gün dersi var' ? 'free' : ''}">
                        <i data-lucide="calendar"></i>
                        <span>Boş Gün: ${teacher.freeDay}</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3>Haftalık Ders Programı</h3>
                ${scheduleHtml}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
}

function closeTeacherDetail() {
    const modal = document.getElementById('teacherDetailModal');
    if (modal) modal.style.display = 'none';
}

window.initOBS = initOBS;
window.openTeacherDetail = openTeacherDetail;
window.closeTeacherDetail = closeTeacherDetail;
window.filterTeachers = filterTeachers;

window.uploadTeacherImage = async function(event, teacherId) {
    const file = event.target.files[0];
    if (!file) return;

    const btnIcon = document.getElementById(`upload-icon-${teacherId}`);
    if (btnIcon) {
        btnIcon.setAttribute('data-lucide', 'loader');
        if (window.lucide) lucide.createIcons();
    }

    try {
        const path = `teacher_profiles/${teacherId}.jpg`;
        // Supabase upload (PUT for upsert/replace)
        const res = await fetch(`https://znrlvhbuzmukznnfxpjy.supabase.co/storage/v1/object/hub_files/${path}`, {
            method: 'POST', // POST with x-upsert works best in Supabase REST API for storage
            headers: {
                'apikey': OBS_API_KEY,
                'Authorization': `Bearer ${OBS_API_KEY}`,
                'Content-Type': file.type,
                'x-upsert': 'true'
            },
            body: file
        });

        // If POST fails (sometimes requires PUT if path already exists depending on config), let's fallback to PUT
        if (res.status === 400 || res.status === 409) {
            await fetch(`https://znrlvhbuzmukznnfxpjy.supabase.co/storage/v1/object/hub_files/${path}`, {
                method: 'PUT',
                headers: {
                    'apikey': OBS_API_KEY,
                    'Authorization': `Bearer ${OBS_API_KEY}`,
                    'Content-Type': file.type,
                    'x-upsert': 'true'
                },
                body: file
            });
        }

        // Force reload images with timestamp to defeat browser cache
        const newUrl = `${getTeacherImgUrl(teacherId)}?t=${Date.now()}`;
        const detailImg = document.getElementById(`modal-img-${teacherId}`);
        const gridImg = document.getElementById(`grid-img-${teacherId}`);
        if (detailImg) detailImg.src = newUrl;
        if (gridImg) gridImg.src = newUrl;

    } catch (err) {
        alert("Fotoğraf yüklenemedi: " + err.message);
    } finally {
        if (btnIcon) {
            btnIcon.setAttribute('data-lucide', 'camera');
            if (window.lucide) lucide.createIcons();
        }
    }
};
