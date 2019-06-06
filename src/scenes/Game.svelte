

<button on:click={_ => changeScene('Menu')}>Menu</button>

<script>
  import { onMount } from 'svelte';
  import store from '../store';
  import { creators as sceneActions } from '../actions/scene'
  import { creators as gameActions } from '../actions/game'

  onMount(() => {
    const users = $store.users;
    store.dispatch(gameActions.start({ users }))
  })

  function changeScene(scene) {
    store.dispatch(sceneActions.changeScene(scene));
  }
</script>