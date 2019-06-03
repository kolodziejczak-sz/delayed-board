<Players></Players>
<button on:click={_ => changeScene('Menu')}>Menu</button>
<button on:click={_ => changeScene('Game')}>Game</button>

<script>
  import store, { dispatch } from '../store';
  import { creators as sceneActions } from '../actions/scene'
  import Players from '../components/Players.svelte';

  function changeScene(scene) {
    dispatch(sceneActions.changeScene(scene));
  }
</script>