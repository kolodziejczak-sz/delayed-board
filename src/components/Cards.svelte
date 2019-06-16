<script>
  import Card from './Card.svelte';
  export let items;
</script>

<div class="cards">
  {#each items as card (card.id)}
    <Card {card} on:cardSelect />
  {/each}
</div>
