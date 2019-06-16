<script>
  import { createEventDispatcher } from 'svelte';
  import flip from '../utils/flip.js';
  import dirs from '../constants/dirs.js';
  import cards from '../constants/cards.js';

  export let card;
  export let disabled = false;
  const emit = createEventDispatcher();

  function emitSelectedCard() {
    if (!disabled) {
      emit('cardSelect', { card });
    }
  }
</script>

<style>
  .card--disabled {
    opacity: 0.6;
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

<button class="card {disabled && 'card--disabled'}" on:click={emitSelectedCard}>
  <div>{flip(cards)[card.type]}</div>
  {#if card.type == cards.Move}
    <div class="move">
      {#each Object.entries(dirs) as [label, value]}
        <input
          {value}
          {disabled}
          class={'move__' + label.toLowerCase()}
          type="radio"
          bind:group={card.dir}
          on:click|stopPropagation />
      {/each}
    </div>
  {/if}
</button>
