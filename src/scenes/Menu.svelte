<script>
  import store from '../store';
  import { creators as sceneActions } from '../redux/scene';

  function changeScene(scene) {
    store.dispatch(sceneActions.changeScene(scene));
  }
</script>

<button on:click={_ => changeScene('Config')}>Start</button>
