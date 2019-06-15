<p>
  {JSON.stringify($store.game)}
</p>
{#each players as p}
  {p.user.name} {p.user.icon} : {JSON.stringify(p.position)}
{/each}
{#if currentPlayer}
  <h1>Player turn: {currentPlayer.user.name}</h1>
{/if}
{#if gameEnd}
  <h1>GAME OVER</h1>
  <h1>The winner is {winner.user.name}</h1>
{/if}

<button on:click={_ => changeScene('Menu')}>Menu</button>
<button on:click={startGame}>Reset</button>
<button on:click={surrender}>Surrender</button>
<button on:click={move}>Move</button>

<script>
  import { onMount } from 'svelte';
  import store from '../store';
  import { creators as sceneActions } from '../actions/scene'
  import { creators as gameActions } from '../actions/game'
  import { getPlayers, getCurrentPlayer, getWinnerPlayer, isGameEnd } from '../selectors/game'

  function startGame() {
    const users = $store.users;
    store.dispatch(gameActions.start({ users }))
  }

  function move() {
    const card = { type: 3, dir: 1 }
    store.dispatch(gameActions.move({ card }));
  }

  function changeScene(scene) {
    store.dispatch(sceneActions.changeScene(scene));
  }

  function surrender() {
    store.dispatch(gameActions.surrender());
  }

  $: currentPlayer = getCurrentPlayer($store);
  $: players = getPlayers($store);
  $: winner = getWinnerPlayer($store);
  $: gameEnd = isGameEnd($store);

  onMount(startGame);
</script>