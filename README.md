# ⚡ The Master of Excuses (Ngeles Engine)

> **"Solving Problems Nobody Asked You to Solve"**  
> 🏆 **Absurd Hackathon 2026 Submission** | Multimodal AI Reasoning Agent

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-3.5_Flash_Vision-4285F4?style=for-the-badge&logo=googlecloud)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

---

## 📌 Apa itu Master of Excuses?

**The Master of Excuses (Ngeles Engine)** adalah aplikasi web berbasis **Multimodal AI Vision Agent** yang dirancang khusus untuk memecahkan masalah absurd yang sering dihadapi sehari-hari: **bagaimana cara ngeles (membuat alibi) yang meyakinkan saat kamu mager, telat, atau mau bolos.**

Aplikasi ini menggunakan kamera webcam / foto selfie pengguna untuk menganalisis raut wajah secara *real-time* (ekspresi senyum cengengesan, muka bantal 88%, atau aura pasrah), lalu memadukannya dengan AI reasoning untuk mengarang 3 tier alasan yang siap dikirim via WhatsApp!

---

## 🔥 Fitur Utama

### 1. 📸 Multimodal Selfie Facial Breakdown
- **Real-Time Vision Analysis:** Menguraikan raut wajah dari selfie (persentase muka bantal, tatapan mata 5 watt, aura cengengesan, posisi bantal/kasur).
- **Hasil Murni AI:** Analisis dilakukan 100% secara nyata oleh model **Google Gemini 3.5 Flash Vision**.

### 2. ⚡ 3 Tiers Of Alasan "Ngeles"
- 🛡️ **Tier 1 - Smooth Operator (Aman):** Alibi yang sopan, natural, minim risiko, dan sangat masuk akal untuk dikirim ke Bos, Dosen, atau Pasangan.
- 🎭 **Tier 2 - Drama Queen (Dramatis):** Alibi hiperbolis yang menyalahkan faktor luar (listrik mati, ban bocor halus, kucing tetangga masuk kamar).
- 🔥 **Tier 3 - Ultimate Chaos (Paling Nyeleneh):** Alibi absurd di luar nalar yang didukung bukti raut wajah sampai lawan bicara pasrah memaklumi!

### 3. ⏱️ Interactive Quota Countdown Timer
- Dilengkapi dengan **Live Countdown Timer UI** ketika kuota gratisan AI mencapai batas sesaat (*Rate Limit 429*), sehingga pengguna tidak pernah dihadapkan pada layar error mentah!

### 📱 4. One-Click WhatsApp Quick Share & Copy
- Tombol **Salin Teks** otomatis dengan animasi *confetti*.
- Tombol **Kirim ke WA** yang mengarahkan pesan langsung ke aplikasi WhatsApp.

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Backend / API:** Next.js Serverless API Route (`/api/generate-excuse`).
- **AI Engine:** Google Generative AI SDK (`@google/generative-ai`) dengan model **Gemini 3.5 Flash Vision / Flash Lite**.
- **Deployment:** Vercel (Ready for Production).

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone Repository:**
   ```bash
   git clone https://github.com/ZurielManurung/ngeles-engine.git
   cd ngeles-engine
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   Buat file `.env.local` di root folder dan isi dengan Gemini API Key kamu:
   ```env
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXX
   ```

4. **Jalankan Dev Server:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser kamu!

---

## 🌐 Cara Deploy ke Vercel

1. Push proyek ini ke repository GitHub milikmu.
2. Buka [Vercel Dashboard](https://vercel.com/new) dan import repository `ngeles-engine`.
3. Tambahkan Environment Variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** API Key Gemini kamu
4. Klik **Deploy**! App akan langsung live!

---

<p center="true">
  Built with ❤️ for <b>Absurd Hackathon 2026</b>
</p>
