<button on:click={_ => changeScene('Config')}>Start</button>

<script>
  import store from '../store';
  import { creators as sceneActions } from '../actions/scene'

  function changeScene(scene) {
    store.dispatch(sceneActions.changeScene(scene));
  }
</script>