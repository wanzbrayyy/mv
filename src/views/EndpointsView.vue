<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="title">endpoints interaktif</h1>
      <p class="subtitle">coba langsung setiap endpoint dari sini. isi parameter yang dibutuhkan dan klik tombol "run" untuk melihat hasilnya.</p>
    </div>

    <div class="features-grid">
      <div v-for="category in featureCategories" :key="category.name" class="category-section">
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="grid">
          <EndpointCard 
            v-for="feature in category.features" 
            :key="feature.title"
            :title="feature.title"
            :description="feature.description"
            :endpoint="feature.endpoint"
            :icon="feature.icon"
            @execute="handleExecuteApi"
          />
        </div>
      </div>
    </div>
    
    <div v-if="isResultModalVisible" class="modal-overlay" @click="isResultModalVisible = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="isResultModalVisible = false"><i class="fa-solid fa-xmark"></i></button>
        <div v-if="apiResult.loading" class="modal-loading">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <span>menjalankan permintaan...</span>
        </div>
        <div v-else>
          <div class="modal-header">
            <h3>hasil respons api</h3>
            <div class="status-badge" :class="statusClass">
              <span class="status-code">{{ apiResult.status }}</span>
              <span class="status-text">{{ statusText }}</span>
            </div>
            <div class="duration">{{ apiResult.duration }} ms</div>
          </div>
          <div class="modal-body">
            <div v-if="apiResult.previewImageUrl" class="image-preview-container">
              <img :src="apiResult.previewImageUrl" alt="pratinjau gambar api" class="image-preview">
            </div>
            <pre><code>{{ JSON.stringify(apiResult.data, null, 2) }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EndpointCard from '../components/EndpointCard.vue';
import { executeApi } from '../services/api.js';

export default {
  name: 'EndpointsView',
  components: { EndpointCard },
  data() {
    return {
      isResultModalVisible: false,
      apiResult: { loading: false, status: null, data: null, duration: 0, previewImageUrl: null },
      featureCategories: [
        { name: 'pencarian & stalking', features: [
            { title: 'github stalk', description: 'lihat profil detail pengguna github.', endpoint: 'get /api/github-stalk?user=', icon: 'fa-brands fa-github' },
            { title: 'npm stalk', description: 'dapatkan informasi package dari npm.', endpoint: 'get /api/npm-stalk?package=', icon: 'fa-brands fa-npm' },
            { title: 'youtube channel', description: 'dapatkan info detail channel youtube.', endpoint: 'get /api/youtube-channel?username=', icon: 'fa-solid fa-magnifying-glass-chart' },
            { title: 'spotify search', description: 'cari lagu dari spotify berdasarkan judul.', endpoint: 'get /api/spotify?q=', icon: 'fa-brands fa-spotify' },
            { title: 'tiktok search', description: 'cari konten video di tiktok.', endpoint: 'get /api/tiktok-search?q=', icon: 'fa-solid fa-magnifying-glass' },
            { title: 'happymod search', description: 'cari aplikasi di happymod.', endpoint: 'get /api/happymod?q=', icon: 'fa-solid fa-mobile-screen-button' },
            { title: 'capcut search', description: 'cari template di capcut.', endpoint: 'get /api/capcut-search?q=', icon: 'fa-solid fa-magnifying-glass-location' },
            { title: 'pinterest video search', description: 'cari video di pinterest.', endpoint: 'get /api/pinterest-video?q=', icon: 'fa-brands fa-pinterest' },
            { title: 'nekopoi search', description: 'cari konten di nekopoi.', endpoint: 'get /api/nekopoi-search?q=', icon: 'fa-solid fa-cat' },
            { title: 'nhentai search', description: 'cari konten di nhentai.', endpoint: 'get /api/nhentai/search?q=&sort=&page=', icon: 'fa-solid fa-book-open-reader' },
            { title: 'nhentai doujin', description: 'dapatkan detail doujin nhentai.', endpoint: 'get /api/nhentai/doujin?id=', icon: 'fa-solid fa-book' },
            { title: 'nhentai related', description: 'cari doujin terkait di nhentai.', endpoint: 'get /api/nhentai/related?id=', icon: 'fa-solid fa-layer-group' },
          ]},
        { name: 'unduhan media', features: [
            { title: 'tiktok downloader', description: 'unduh video tiktok tanpa watermark.', endpoint: 'get /api/tiktok-dl?url=', icon: 'fa-brands fa-tiktok' },
            { title: 'youtube downloader', description: 'unduh video atau audio youtube.', endpoint: 'get /api/yt-dl?url=', icon: 'fa-brands fa-youtube' },
            { title: 'instagram downloader', description: 'unduh foto atau video dari instagram.', endpoint: 'get /api/ig-dl?url=', icon: 'fa-brands fa-instagram' },
            { title: 'twitter downloader', description: 'unduh video dari postingan twitter.', endpoint: 'get /api/twitter-dl?url=', icon: 'fa-brands fa-twitter' },
            { title: 'bstation downloader', description: 'unduh video dari bilibili/bstation.', endpoint: 'get /api/bstation-dl?url=', icon: 'fa-solid fa-tv' },
            { title: 'capcut downloader', description: 'unduh video dari template capcut.', endpoint: 'get /api/capcut-dl?url=', icon: 'fa-solid fa-film' },
            { title: 'savefrom downloader', description: 'downloader universal untuk media sosial.', endpoint: 'get /api/savefrom?url=', icon: 'fa-solid fa-download' },
            { title: 'twdown downloader', description: 'alternatif pengunduh video twitter.', endpoint: 'get /api/twdown?url=', icon: 'fa-brands fa-x-twitter' },
            { title: 'xnxx downloader', description: 'unduh video dari xnxx.', endpoint: 'get /api/xnxx-dl?url=', icon: 'fa-solid fa-video' },
          ]},
        { name: 'ai & generasi gambar', features: [
            { title: 'gpt', description: 'interaksi dengan model ai gpt.', endpoint: 'post /api/gpt?message=', icon: 'fa-solid fa-robot' },
            { title: 'aigpt', description: 'alternatif endpoint untuk ai teks.', endpoint: 'get /api/aigpt?prompt=', icon: 'fa-solid fa-brain' },
            { title: 'character ai', description: 'chat dengan berbagai karakter fiksi.', endpoint: 'post /api/cai?query=&character=', icon: 'fa-solid fa-user-astronaut' },
            { title: 'generate image', description: 'membuat gambar dari deskripsi teks.', endpoint: 'post /api/generate-image?prompt=', icon: 'fa-solid fa-image' },
            { title: 'animagine', description: 'membuat gambar bergaya anime.', endpoint: 'post /api/animagine?prompt=', icon: 'fa-solid fa-palette' },
            { title: 'to anime', description: 'mengubah url gambar menjadi anime.', endpoint: 'get /api/to-anime?url=', icon: 'fa-solid fa-ghost' },
            { title: 'to hitam (skin tone)', description: 'ubah warna kulit pada gambar via url.', endpoint: 'get /api/to-hitam?url=', icon: 'fa-solid fa-fill-drip' },
          ]},
        { name: 'utilitas & alat bantu', features: [
            { title: 'wallpaper hd', description: 'cari wallpaper 4k ultra hd.', endpoint: 'get /api/wallpaper-hd?q=', icon: 'fa-solid fa-mountain-sun' },
            { title: 'shortlink', description: 'perpendek url panjang menggunakan tinyurl.', endpoint: 'get /api/shortlink?url=', icon: 'fa-solid fa-compress' },
            { title: 'random mail', description: 'hasilkan alamat email sementara.', endpoint: 'get /api/random-mail', icon: 'fa-solid fa-envelope-open-text' },
            { title: 'nhentai home', description: 'lihat halaman utama nhentai.', endpoint: 'get /api/nhentai/home?type=', icon: 'fa-solid fa-book-bookmark' },
          ]}
      ]
    };
  },
  computed: {
    statusClass() {
      if (!this.apiResult.status) return '';
      if (this.apiResult.status >= 200 && this.apiResult.status < 300) return 'status-success';
      if (this.apiResult.status >= 400 && this.apiResult.status < 500) return 'status-client-error';
      return 'status-server-error';
    },
    statusText() {
      if (!this.apiResult.status) return '';
      if (this.apiResult.status >= 200 && this.apiResult.status < 300) return 'success';
      if (this.apiResult.status === 404) return 'not found';
      if (this.apiResult.status >= 400 && this.apiResult.status < 500) return 'client error';
      return 'server error';
    }
  },
  methods: {
    findImageInResponse(data) {
      if (!data || typeof data !== 'object') return null;
      let imageUrl = null;
      const imageKeys = ['avatar', 'thumbnail', 'image', 'pic', 'icon', 'cover', 'profile_pic'];

      function traverse(obj) {
        for (const key in obj) {
          if (imageUrl) return; 
          const value = obj[key];
          if (typeof value === 'string') {
            const lowerKey = key.toLowerCase();
            const isImageKey = imageKeys.some(imgKey => lowerKey.includes(imgKey));
            const isImageUrl = value.startsWith('http') && (isImageKey || /\.(jpg|jpeg|png|gif|webp)$/i.test(value));
            if (isImageUrl) {
              imageUrl = value;
              return;
            }
          } else if (typeof value === 'object' && value !== null) {
            traverse(value);
          }
        }
      }
      traverse(data);
      return imageUrl;
    },
    async handleExecuteApi(payload) {
      this.isResultModalVisible = true;
      this.apiResult = { loading: true, status: null, data: null, duration: 0, previewImageUrl: null };
      const result = await executeApi(payload);
      const imageUrl = this.findImageInResponse(result.data);
      this.apiResult = { ...result, loading: false, previewImageUrl: imageUrl };
    }
  }
};
</script>
<style scoped>
.page-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
.page-header { text-align: center; padding: 2rem 0 4rem 0; }
.title { font-size: 2.5rem; font-weight: 900; margin: 0; }
.subtitle { font-size: 1.1rem; color: var(--text-muted-color); max-width: 600px; margin: 0.5rem auto 0 auto; line-height: 1.6; }
.category-section { margin-bottom: 4rem; }
.category-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(5px); }
.modal-content { background: #111; border: 1px solid var(--border-color); border-radius: 12px; width: 90%; max-width: 800px; max-height: 80vh; display: flex; flex-direction: column; position: relative; }
.modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted-color); font-size: 1.5rem; cursor: pointer; }
.modal-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 4rem; font-size: 1.2rem; }
.modal-header { padding: 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 1rem; }
.modal-header h3 { margin: 0; font-size: 1rem; }
.status-badge { display: flex; align-items: center; border-radius: 6px; overflow: hidden; font-weight: 700; }
.status-code { padding: 0.3rem 0.6rem; color: #fff; }
.status-text { padding: 0.3rem 0.6rem; background: #333; color: #ccc; }
.status-success .status-code { background: var(--success-color); }
.status-client-error .status-code { background: var(--client-error-color); }
.status-server-error .status-code { background: var(--error-color); }
.duration { margin-left: auto; font-size: 0.9rem; color: var(--text-muted-color); }
.modal-body { overflow-y: auto; padding: 1.5rem; background: #0a0a0a; }
.image-preview-container { margin-bottom: 1.5rem; text-align: center; }
.image-preview { max-width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px; border: 1px solid var(--border-color); }
.modal-body pre, .modal-body code { font-size: 0.85rem; }
</style>
