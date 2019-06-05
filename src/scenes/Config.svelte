<Users users={$store.users} on:update={updateUser}></Users>
<button on:click={_ => changeScene('Menu')}>Menu</button>
<button on:click={_ => changeScene('Game')}>Game</button>

<script>
  import store from '../store';
  import { creators as sceneActions } from '../actions/scene'
  import { creators as usersActions } from '../actions/users'
  import Users from '../components/Users.svelte';

  function changeScene(scene) {
    store.dispatch(sceneActions.changeScene(scene));
  }

  function updateUser(e) {
    const update = e.detail.update;
    store.dispatch(usersActions.updateUser(update));
  }
</script>