<script>
  import { onMount } from 'svelte';
  import store from '../store';
  import { creators as sceneActions } from '../actions/scene';
  import { creators as gameActions } from '../actions/game';
  import Player from '../components/Player.svelte';
  import Cards from '../components/Cards.svelte';
  import {
    getPlayers,
    getCurrentPlayer,
    getWinnerPlayer,
    isGameEnd,
  } from '../selectors/game';

  function startGame() {
    const users = $store.users;
    store.dispatch(gameActions.start({ users }));
  }

  function move(e) {
    const card = e.detail.card;
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

<div>RoundMoves: {$store.game.roundMoves} </div>
{#each players as player}
  <Player {player} />
{/each}
{#if gameEnd}
  <h1>GAME OVER</h1>
  <h1>The winner is {winner.user.name}</h1>
{/if}

{#if currentPlayer}
  <h1>Player turn: {currentPlayer.user.name}</h1>
  <Cards items={currentPlayer.cards} on:click={move} />
{/if}

<button on:click={_ => changeScene('Menu')}>Menu</button>
<button on:click={startGame}>Reset</button>
<button on:click={surrender}>Surrender</button>
