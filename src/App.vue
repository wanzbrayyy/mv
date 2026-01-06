<template>
  <div id="layout">
    <nav class="main-nav">
      <div class="nav-content">
        <router-link to="/" class="nav-brand">
          <i class="fa-solid fa-bolt-lightning"></i>
          <span>maverick api</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/"><i class="fa-solid fa-house"></i> home</router-link>
          <router-link to="/endpoints"><i class="fa-solid fa-code"></i> endpoints</router-link>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
<style>
:root {
  --background-color: #000000;
  --nav-background: rgba(10, 10, 10, 0.8);
  --border-color: #2A2A2A;
  --text-color: #EAEAEA;
  --text-muted-color: #888888;
  --font-family: 'Inter', sans-serif;
  --success-color: #28a745;
  --error-color: #dc3545;
  --client-error-color: #fd7e14;
}
* { box-sizing: border-box; }
body { background-color: var(--background-color); color: var(--text-color); font-family: var(--font-family); margin: 0; overflow-x: hidden; }
h1, h2, h3, p, a, span, button { text-transform: lowercase; }
.main-nav { background-color: var(--nav-background); border-bottom: 1px solid var(--border-color); padding: 1rem 2rem; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.nav-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.nav-brand { font-weight: 700; font-size: 1.2rem; color: var(--text-color); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
.nav-brand i { color: #fff; }
.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-links a { color: var(--text-muted-color); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; transition: color 0.2s ease; }
.nav-links a:hover { color: var(--text-color); }
.nav-links a.router-link-exact-active { color: var(--text-color); font-weight: 500; }
</style>
