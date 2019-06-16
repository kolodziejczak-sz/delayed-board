<script>
  import { createEventDispatcher } from 'svelte';
  import { css } from 'emotion';
  import { generalSettings } from '../constants/settings.js';
  import { isPostionEqual } from '../models/position.js';
  import flip from '../utils/flip.js';
  import dirs from '../constants/dirs.js';

  export let size = generalSettings.boardSize;
  export let entities = [];
  export let disabled = false;
  const boxSize = '2em';
  const boxStyles = css`
    display: inline-block;
    box-sizing: border-box;
    width: ${boxSize};
    height: ${boxSize};
  `;
  const entityStyles = css`
    display: inline-block;
    position: absolute;
    width: calc(${boxSize} / 2);
    height: calc(${boxSize} / 2);
    transform: translate(50%, 50%);
    border-radius: 50%;
    transition: 200ms ease-in-out;
  `;
  const emit = createEventDispatcher();
  function emitSelectedPosition(position) {
    if (!disabled) {
      emit('positionSelect', { position });
    }
  }
</script>

<style>
  .board {
    position: relative;
    display: inline-block;
    margin: 1em;
  }
  .row {
    display: flex;
  }
  .row:nth-child(odd) .box:nth-child(odd) {
    background: rgba(0, 0, 0, 0.2);
  }
  .row:nth-child(even) .box:nth-child(even) {
    background: rgba(0, 0, 0, 0.2);
  }

  .entity:nth-of-type(1n) {
    background: red;
  }
  .entity:nth-of-type(2n) {
    background: blue;
  }
</style>

<div class="board">
  {#each entities as e (e.id)}
    <div
      class="entity {entityStyles}"
      style={`top: calc(${e.position.y} * ${boxSize});
              left: calc(${e.position.x} * ${boxSize})`}>
       {flip(dirs)[e.position.dir]}
    </div>
  {/each}
  {#each [...Array(size)] as x}
    <div class="row">
      {#each [...Array(size)] as y}
        <div class="box {boxStyles}" on:click={emitSelectedPosition} />
      {/each}
    </div>
  {/each}
</div>
