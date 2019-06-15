<script>
  import scenes from './scenes';
  import store from './store.js';

  $: scene = scenes[$store.scene.current];
</script>

<svelte:component this={scene} />
