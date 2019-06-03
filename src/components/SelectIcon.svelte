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
    font-size: .6em;
  }
  .icon-select__current {
    margin: 0 .25em;
  }
</style>

<div class="icon-select">
  <span class="icon-select__control"
        on:click={prev}>◄</span>
  <span class="icon-select__current">{selected}</span>
  <span class="icon-select__control"
        on:click={next}>►</span>
</div>

<script>
	import { createEventDispatcher } from 'svelte';
  import icons from '../constans/icons.js';

  export let selected = icons[0];
  $: selectedIdx = icons.indexOf(selected);

  const dispatch = createEventDispatcher();

  function next() {
    onSelect((selectedIdx + 1) % icons.length);
  }
  function prev() {
    onSelect((selectedIdx - 1 + icons.length) % icons.length);
  }

  function onSelect(idx) {
    selected = icons[idx];
    dispatch('select', { icon: icons[idx] });
  }
</script>