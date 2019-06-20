<script>
  import Immutable from 'seamless-immutable';
  import Card from './Card.svelte';
  export let items;
</script>

<div class="cards">
  {#each items as card (card.id)}
    <Card card="{Immutable.asMutable(card)}" on:cardSelect />
  {/each}
</div>
