<template>
  <div class="page-container">
    <header class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="title">maverick scrape api</h1>
          <p class="subtitle">sebuah koleksi rest api multifungsi yang dirancang untuk kecepatan dan kemudahan integrasi. dapatkan data, buat konten, dan otomatiskan tugas dengan mudah.</p>
        </div>
        <div class="hero-animation">
          <dotlottie-wc src="https://lottie.host/27bf3aa1-d6b1-4c4c-85ab-921e099f7607/kHRCpixVDW.lottie" style="width: 300px;height: 300px" autoplay loop></dotlottie-wc>
        </div>
      </div>
    </header>
    <main class="main-content">
      <div class="feature-section">
        <h2 class="section-title">ai & kreasi konten</h2>
        <p class="section-description">manfaatkan kekuatan kecerdasan buatan. berinteraksi dengan model bahasa gpt, hasilkan gambar unik dari teks dengan animagine atau flatai, dan ubah foto anda menjadi karya seni bergaya ghibli atau anime.</p>
      </div>
      <div class="feature-section">
        <h2 class="section-title">unduhan media lengkap</h2>
        <p class="section-description">unduh konten dari platform media sosial terpopuler tanpa watermark. tersedia dukungan untuk tiktok, instagram, youtube, twitter, spotify, dan banyak lagi melalui downloader universal kami.</p>
      </div>
      <div class="cta-section">
        <h2 class="section-title">mulai menggunakan</h2>
        <p class="section-description">semua endpoint dapat diakses melalui base url kami. lihat daftar lengkap endpoint untuk detail lebih lanjut.</p>
        <div class="cta-card">
          <p class="cta-card-title">contoh pemanggilan api:</p>
          <div class="code-block"><pre><code>curl "https://scrape-maverick.vercel.app/api/github-stalk?user=google"</code></pre></div>
          <router-link to="/endpoints" class="cta-button"><i class="fa-solid fa-arrow-right"></i> lihat semua endpoint</router-link>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
.page-container { display: flex; flex-direction: column; align-items: center; padding: 0 2rem; max-width: 1000px; margin: 0 auto; }
.hero-section { width: 100%; padding: 4rem 0; }
.hero-content { display: grid; grid-template-columns: 2fr 1fr; align-items: center; gap: 3rem; text-align: left; }
.title { font-size: 3.5rem; font-weight: 900; margin: 0; letter-spacing: -2px; background: -webkit-linear-gradient(45deg, #fff, #aaa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { font-size: 1.25rem; color: var(--text-muted-color); max-width: 550px; margin-top: 1rem; line-height: 1.6; }
.hero-animation { max-width: 300px; margin: 0 auto; }
.main-content { width: 100%; padding: 4rem 0; border-top: 1px solid var(--border-color); }
.feature-section, .cta-section { padding-bottom: 3rem; margin-bottom: 3rem; border-bottom: 1px solid var(--border-color); }
.cta-section { border-bottom: none; margin-bottom: 0; }
.section-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
.section-description { font-size: 1.1rem; line-height: 1.7; color: var(--text-muted-color); max-width: 750px; }
.cta-card { background-color: #0a0a0a; border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; margin-top: 2rem; }
.cta-card-title { font-size: 1rem; font-weight: 500; color: var(--text-muted-color); margin: 0 0 1rem 0; }
.code-block { background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 1rem; overflow-x: auto; }
pre, code { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.9rem; color: #c9d1d9; margin: 0; padding: 0; white-space: pre-wrap; word-wrap: break-word; }
.cta-button { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 2rem; padding: 0.8rem 1.5rem; background-color: #fff; color: #000; font-weight: 700; border-radius: 8px; text-decoration: none; transition: background-color 0.2s ease; }
.cta-button:hover { background-color: #d1d1d1; }
@media (max-width: 900px) {
  .hero-content { grid-template-columns: 1fr; text-align: center; }
  .hero-text { order: 2; }
  .hero-animation { order: 1; max-width: 250px; margin-bottom: 2rem; }
  .title { font-size: 2.8rem; }
  .subtitle { margin: 1rem auto 0 auto; }
}
@media (max-width: 480px) {
  .page-container { padding: 0 1rem; }
  .title { font-size: 2.2rem; }
  .subtitle { font-size: 1rem; }
  .cta-card { padding: 1.5rem; }
}
</style>
