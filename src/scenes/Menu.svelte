<button on:click={_ => changeScene('Config')}>Start</button>

<script>
  import { dispatch } from '../store';
  import { creators as sceneActions } from '../actions/scene'

  function changeScene(scene) {
    dispatch(sceneActions.changeScene(scene));
  }
</script>