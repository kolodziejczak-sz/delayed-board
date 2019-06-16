<script>
  import Card from './Card.svelte';
  export let items;
</script>

<style>
  .buffer {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="buffer">
  {#each items as card (card.id)}
    <Card {card} disabled="true" />
  {/each}
</div>
