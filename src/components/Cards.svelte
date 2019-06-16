<script>
  import { createEventDispatcher } from 'svelte';
  import flip from '../utils/flip.js';
  import dirs from '../constants/dirs.js';
  import cards from '../constants/cards.js';

  export let items;
  const emit = createEventDispatcher();

  function emitClick(card) {
    emit('click', { card });
  }
</script>

<style>
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

<div class="cards">
  {#each items as c (c.id)}
    <button on:click={_ => emitClick(c)}>
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
