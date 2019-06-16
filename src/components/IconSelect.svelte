<script>
  import { createEventDispatcher } from 'svelte';
  import icons from '../constants/icons.js';

  export let selected = icons[0];
  const emit = createEventDispatcher();

  $: selectedIdx = icons.indexOf(selected);

  function next() {
    emitSelectedIcon((selectedIdx + 1) % icons.length);
  }
  function prev() {
    emitSelectedIcon((selectedIdx - 1 + icons.length) % icons.length);
  }

  function emitSelectedIcon(idx) {
    emit('iconSelect', { icon: icons[idx] });
  }
</script>

<style>
  .icon-select {
    align-items: center;
    display: flex;
    font-size: 24px;
  }
  .icon-select > * {
    user-select: none;
  }
  .icon-select__control {
    cursor: pointer;
    font-size: 0.6em;
  }
  .icon-select__current {
    margin: 0 0.25em;
  }
</style>

<div class="icon-select">
  <span class="icon-select__control" on:click={prev}>◄</span>
  <span class="icon-select__current">{selected}</span>
  <span class="icon-select__control" on:click={next}>►</span>
</div>
