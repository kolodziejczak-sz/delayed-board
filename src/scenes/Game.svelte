<script>
  import { onMount } from 'svelte';
  import store from '../store';
  import flip from '../utils/flip.js';
  import dirs from '../constants/dirs.js';
  import cards from '../constants/cards.js';
  import { creators as sceneActions } from '../actions/scene';
  import { creators as gameActions } from '../actions/game';
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

  function move(card) {
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

<style>
  .player {
    display: inline-block;
  }
  .move {
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 3.5em;
  }
  .move > * {
    position: absolute;
  }
  .move__top {
    top: 0;
  }
  .move__bottom {
    bottom: 0;
  }
  .move__top,
  .move__bottom {
    transform: translateX(-50%);
    left: 50%;
  }
  .move__left {
    left: 0;
  }
  .move__right {
    right: 0;
  }
  .move__left,
  .move__right {
    top: 50%;
    transform: translateY(-50%);
  }
</style>

<div>RoundMoves: {$store.game.roundMoves} </div>
{#each players as p}
  <div class="player">
    <div>{p.user.name} {p.user.icon}</div>
    <div>cards: {p.cards.length}</div>
    <div>buffer: {p.buffer.length}</div>
    <div>health: {p.health}</div>
    <div>isPlaying: {p.isPlaying}</div>
    <div>position: {JSON.stringify(p.position)}</div>
  </div>
{/each}
{#if gameEnd}
  <h1>GAME OVER</h1>
  <h1>The winner is {winner.user.name}</h1>
{/if}

{#if currentPlayer}
  <h1>Player turn: {currentPlayer.user.name}</h1>
  <div class="cards">
    {#each currentPlayer.cards as c (c.id)}
      <button on:click={_ => move(c)}>
        <span>{flip(cards)[c.type]}</span>
        {#if c.type == cards.Move}
          <div class="move">
            {#each Object.entries(dirs) as [label, value]}
              <input
                {value}
                class={'move__' + label.toLowerCase()}
                type="radio"
                bind:group={c.dir}
                on:click|stopPropagation />
            {/each}
          </div>
        {/if}
      </button>
    {/each}
  </div>
{/if}

<button on:click={_ => changeScene('Menu')}>Menu</button>
<button on:click={startGame}>Reset</button>
<button on:click={surrender}>Surrender</button>
