<h1>Hello menu</h1>
<button on:click={foo}>Start game</button>

<script>
  import store from '../store';
  import { creators as sceneActions } from '../actions/scene'
  
  function foo() {
    store.dispatch(sceneActions.changeScene('Game'));
  }
</script>