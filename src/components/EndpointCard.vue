<template>
<div class="card">
<div class="card-header">
<div class="card-icon"><i :class="icon"></i></div>
<div class="card-title-group">
<h3 class="card-title">{{ title }}</h3>
<span class="card-endpoint-string">{{ endpoint.split('?')[0] }}</span>
</div>
</div>
<p class="card-description">{{ description }}</p>
<div class="card-form">
<div v-for="param in params" :key="param" class="param-group">
<label :for="param">{{ param }}</label>
<input type="text" :id="param" v-model="formValues[param]" :placeholder="`masukkan ${param}...`" @keyup.enter="execute">
</div>
</div>
<button class="run-button" @click="execute">
<i class="fa-solid fa-play"></i> run
</button>
</div>
</template>
<script>
export default {
name: 'EndpointCard',
props: ['title', 'description', 'endpoint', 'icon'],
data() {
return {
formValues: {}
};
},
computed: {
method() { return this.endpoint.split(' ')[0]; },
path() { return this.endpoint.split(' ')[1].split('?')[0]; },
params() {
const parts = this.endpoint.split('?')[1];
return parts ? parts.split('&').map(p => p.replace('=', '')) : [];
}
},
methods: {
execute() {
const payload = {
method: this.method,
path: this.path,
[this.method.toLowerCase() === 'get' ? 'params' : 'body']: this.formValues
};
this.$emit('execute', payload);
}
},
created() {
this.params.forEach(param => {
this.formValues[param] = '';
});
}
};
</script>
<style scoped>
.card { background: #0a0a0a; border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; }
.card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.card-icon { font-size: 1.5rem; color: var(--text-color); width: 32px; text-align: center; }
.card-title-group { display: flex; flex-direction: column; }
.card-title { font-size: 1.1rem; font-weight: 700; margin: 0; color: var(--text-color); }
.card-endpoint-string { font-family: monospace; font-size: 0.8rem; color: var(--text-muted-color); }
.card-description { color: var(--text-muted-color); line-height: 1.5; margin: 0 0 1.5rem 0; font-size: 0.9rem; flex-grow: 1; }
.card-form { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
.param-group { display: flex; flex-direction: column; gap: 0.25rem; }
.param-group label { font-size: 0.8rem; color: var(--text-muted-color); font-weight: 500; }
.param-group input { background: #1a1a1a; border: 1px solid #333; border-radius: 6px; padding: 0.6rem; color: var(--text-color); font-size: 0.9rem; width: 100%; }
.run-button { background-color: #fff; color: #000; border: none; border-radius: 8px; padding: 0.7rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background-color 0.2s ease; }
.run-button:hover { background-color: #d1d1d1; }
</style>
