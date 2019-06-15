import App from './App.svelte';

const app = new App({
  target: document.getElementById('root'),
});

window.app = app;

export default app;
