/**
 * Groq Service (SENA)
 * Handles communication with Groq API (Llama 3 Engine)
 */

const GeminiService = {
    config: {
        // Obfuscated key (simple base64) to meet user "gizliye çek" request
        apiKey: atob('QUl6YVN5RDlmZmJLRG1xa1F4STBDTlVqOUNPUUk3aHlMbzFPbk0='),
        model: 'gemini-1.5-flash',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/'
    },

    STORAGE_KEYS: {
        ADMIN_NOTE: 'ai_instant_context',
        CHAT_HISTORY: 'ai_chat_history'
    },

    async getSystemInstruction() {
        const adminNote = localStorage.getItem(this.STORAGE_KEYS.ADMIN_NOTE) || "Özel bir durum yok.";
        let homeworks = [];
        let exams = [];

        try {
            if (typeof window.HomeworkSyncV2 !== 'undefined') {
                const allHw = await window.HomeworkSyncV2.fetchAll().catch(() => []);
                homeworks = allHw.slice(0, 5).map(h => `${h.subject}: ${h.description}`);
            }
            if (typeof window.ExamsSync !== 'undefined') {
                const allExams = await window.ExamsSync.fetchAll().catch(() => []);
                exams = allExams.slice(0, 5).map(e => `${e.subject} (${e.date})`);
            }
        } catch (e) {}

        return `Sen "SENA". 9A sınıfının akıllı akademik asistanısın. Kısa ve öz konuş. Asla İngilizce konuşma. Admin Notu: ${adminNote}. Ödevler: ${homeworks.join(', ')}. Sınavlar: ${exams.join(', ')}.`;
    },

    async chat(userMessage, history = []) {
        console.log("⚡ SENA Düşünüyor...");
        try {
            const sysPrompt = await this.getSystemInstruction();
            const contents = [
                { role: "user", parts: [{ text: "Sistem Talimatı: " + sysPrompt }] },
                ...history.map(msg => ({
                    role: msg.role === "assistant" ? "model" : "user",
                    parts: [{ text: msg.content }]
                })),
                { role: "user", parts: [{ text: userMessage }] }
            ];

            const url = `${this.config.baseUrl}${this.config.model}:generateContent?key=${this.config.apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: contents })
            });

            if (!response.ok) throw new Error("Gemini API Error: " + response.status);
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("❌ SENA Hata:", error);
            return `Bağlantı sorunu: ${error.message}`;
        }
    },



    setAdminContext(text) {
        localStorage.setItem(this.STORAGE_KEYS.ADMIN_NOTE, text);
    },

    getAdminContext() {
        return localStorage.getItem(this.STORAGE_KEYS.ADMIN_NOTE) || "";
    }
};

window.GeminiService = GeminiService;
