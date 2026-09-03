import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Timeout helper: Maximum 10 seconds per attempt
function generateWithTimeout(model: any, contents: any[], timeoutMs = 10000): Promise<any> {
  return Promise.race([
    model.generateContent(contents),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT_10S')), timeoutMs)
    ),
  ]);
}

export async function POST(req: Request) {
  const startTime = Date.now();
  console.log('\n=================== 🤖 [PURE AI HIT INITIATED] ===================');
  console.log(`⏰ Timestamp : ${new Date().toLocaleTimeString('id-ID')}`);

  try {
    const { user_problem, target_recipient, user_selfie } = await req.json();

    console.log(`📌 Masalah Input  : "${user_problem}"`);
    console.log(`🎯 Target Penerima: "${target_recipient || 'Teman / Tongkrongan'}"`);
    console.log(`📸 Foto Selfie    : ${user_selfie ? `ADA (${Math.round(user_selfie.length / 1024)} KB)` : 'TIDAK ADA'}`);

    if (!user_problem) {
      return NextResponse.json(
        { error: 'Problem / Masalah harus diisi!' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY belum dipasang di .env.local! Dapatkan gratis di https://aistudio.google.com/' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Optimized models: gemini-3.5-flash-lite has much higher RPM quota & ultra fast vision speed
    const candidateModels = [
      'gemini-3.5-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.5-flash',
      'gemini-3.7-flash',
    ];

    const prompt = `Role: The Master of Excuses (Ngeles Engine & Multimodal Reasoning Agent)

Tugas:
Kamu adalah pakar alibi & "ngeles" paling jenius dan serbabisa di Indonesia. Tugasmu adalah menganalisis FOTO SELFIE USER secara AKURAT untuk membaca ekspresi wajah asli pengguna (apakah senyum, cengengesan, kaget, kuyu, pasrah, atau stres), lalu buatkan 3 tier alasan ngeles (alibi) yang SANGAT MASUK AKAL, KOCAK, dan RELEVAN dengan masalah yang diinput ("${user_problem}").

INSTRUKSI SANGAT PENTING ANALISIS WAJAH (visual_breakdown):
Di bagian "visual_breakdown", BACALAH FOTO SUNGGUHAN YANG DILAMPIRKAN! 
- Jika pengguna TERSENYUM atau CENGENGESAN di foto, sebutkan: "Pengguna terlihat senyum/cengengesan (misal 90% aura pura-pura polos/senyum misterius)"!
- Jika pengguna KUYU/NGANTUK/STRES, sebutkan sesuai fakta di foto!
- Wajib analisis secara REAL: 
  1. Ekspresi Utama Wajah & % Estimasi (sesuai foto asli!)
  2. Kondisi Mata (tatapan mata, keceriaan/kelopak mata)
  3. Raut Mulut & Senyuman (apakah senyum lebar, senyum simpul, bibir terkatup)
  4. Latar Belakang & Pencahayaan.

INSTRUKSI ATURAN TEKS ALASAN ("excuse"):
1. WAJIB PENUH DENGAN RELEVANSI KONTEKS MASALAH ("${user_problem}"):
   - Analisis situasi masalah user! Jika masalahnya tentang PEKERJAAN / TASK / DEADLINE, buatlah alasan alibi seputar progres riset, optimasi sistem, testing ulang, atau pengendapan ide. JANGAN buat alasan telat jalan pagi / kendaraan bocor jika masalahnya tentang tugas!
   - Jika masalahnya tentang KEHADIRAN / TELAT MASUK, baru gunakan alibi perjalanan/kesehatan.
   - Jika masalahnya tentang NONGKRONG / JANJI KETEMU, buatkan alibi urusan rumah/kesibukan.
2. FOTO SELFIE HANYA DIGUNAKAN UNTUK ANALISIS (visual_breakdown)!
   - JANGAN PERNAH menyelipkan kata "foto ini", "selfie ini", "kamu lihat di foto", atau "foto terlampir" di dalam teks alasan ("excuse")! Teks alasan ("excuse") harus murni berupa pesan WhatsApp biasa.
3. JANGAN PERNAH menyalin pengakuan jujur user secara mentah! Ubah niat jujur tersebut menjadi alibi penyamaran yang cerdas & meyakinkan.
4. Gaya Bahasa Pesan ("excuse"):
   - Jika Target = "Bos / Atasan" atau "Dosen": Bahasa sopan, pasrah, beralasan kendala teknis/kesehatan/keluarga.
   - Jika Target = "Teman" atau "Pasangan": Bahasa chat WA santai modern (gue-lu / aku-kamu, singkat-singkatan WA alami seperti yg, bgt, wkwk, njir, sori, bro, beb).

Output HANYA berupa JSON valid sesuai format ini:
{
  "visual_breakdown": "Analisis REAL & JUJUR dari AI tentang ekspresi WAJAH pengguna di foto (apakah senyum, cengengesan, kuyu, dll) & latar belakang foto selfie dengan humor cerdas",
  "recommendations": [
    {
      "tier": "Smooth Operator (Aman)",
      "excuse": "Teks pesan WA murni yang siap dikirim (SANGAT RELEVAN KONTEKS MASALAH, TANPA menyebut kata 'foto/selfie')",
      "tactic": "Tips cara ngirim (misal: kirim foto selfie ini sekali lihat / View Once sebagai bukti jika ditanya)"
    },
    {
      "tier": "Drama Queen (Dramatis)",
      "excuse": "Teks pesan WA dramatis dari AI menyalahkan faktor alam/semesta/teknis (RELEVAN KONTEKS MASALAH, TANPA menyebut kata 'foto/selfie')",
      "tactic": "Tips cara ngirim (misal: kirim via Voice Note dengan nafas terengah-engah)"
    },
    {
      "tier": "Ultimate Chaos (Paling Nyeleneh / Ngeles Maksimal)",
      "excuse": "Teks pesan WA absurd, kocak, di luar nalar dari AI (RELEVAN KONTEKS MASALAH, TANPA menyebut kata 'foto/selfie')",
      "tactic": "Tips cara ngirim (misal: kirim Once View / foto sekali lihat di WA)"
    }
  ]
}`;

    const contents: any[] = [prompt];

    if (user_selfie && typeof user_selfie === 'string' && user_selfie.includes('base64,')) {
      const mimeMatch = user_selfie.match(/data:(.*?);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const base64Data = user_selfie.split('base64,')[1];

      contents.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      });
    }

    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`🚀 Mengirim prompt & foto ke Model High-Quota (${modelName})...`);

        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.95,
          },
        });

        const attemptStart = Date.now();
        const result = await generateWithTimeout(model, contents, 10000);
        const duration = Date.now() - attemptStart;
        const text = result.response.text();
        const jsonResponse = JSON.parse(text);

        console.log(`✅ [100% PURE AI SUCCESS] Respon AI (${modelName}) diterima dalam ${duration}ms!`);
        console.log(`🎭 Analisis Wajah Hasil AI : "${jsonResponse.visual_breakdown}"`);
        console.log('=============================================================\n');

        return NextResponse.json(jsonResponse);
      } catch (err: any) {
        lastError = err;
        const errStr = err?.message || String(err);
        console.warn(`⚠️ Model ${modelName} Gagal: ${errStr}`);

        if (errStr.includes('429') || errStr.includes('Quota exceeded') || errStr.includes('rate-limits')) {
          const retryMatch = errStr.match(/retry in (\d+)/i) || errStr.match(/retryDelay.*?(\d+)/i);
          const seconds = retryMatch ? parseInt(retryMatch[1], 10) : 30;

          // If current model is rate limited, try next candidate model!
          continue;
        }
      }
    }

    console.error('❌ [PURE AI FAILED]:', lastError);
    return NextResponse.json(
      {
        isQuotaError: true,
        retrySeconds: 30,
        error: `Kuota gratisan Gemini AI tercapai sementara. Silakan tunggu jeda 30 detik!`,
      },
      { status: 429 }
    );
  } catch (error: any) {
    console.error('💥 [CRITICAL ERROR]:', error);
    return NextResponse.json(
      { error: 'Gagal memproses alasan. Silakan coba lagi!' },
      { status: 500 }
    );
  }
}
