<script>
  import { generalSettings } from '../constants/settings.js';
  import { isPostionEqual } from '../models/position.js';
  import { css } from 'emotion';

  export let size = generalSettings.boardSize;
  export let entities = [];
  const blockSize = '2em';
  const blockStyles = css`
    display: inline-block;
    box-sizing: border-box;
    width: ${blockSize};
    height: ${blockSize};
  `;
  const entityStyles = css`
    display: inline-block;
    position: absolute;
    width: calc(${blockSize} / 2);
    height: calc(${blockSize} / 2);
    transform: translate(50%, 50%);
    border-radius: 50%;
    transition: 200ms ease-in-out;
  `;
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
  .row:nth-child(odd) .block:nth-child(odd) {
    background: rgba(0, 0, 0, 0.2);
  }
  .row:nth-child(even) .block:nth-child(even) {
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
      style={`top: calc(${e.position.y} * ${blockSize});
              left: calc(${e.position.x} * ${blockSize})`} />
  {/each}
  {#each [...Array(size)] as x}
    <div class="row">
      {#each [...Array(size)] as y}
        <div class="block {blockStyles}" />
      {/each}
    </div>
  {/each}
</div>
