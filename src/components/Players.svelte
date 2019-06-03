<style>
  .players {
    flex-direction: column;
  }
  .player,
  .players { display: flex; }
</style>

<div class="players">
  {#each players as p}
    <div class="players__item player">
      <input class="player__name"
             value={p.name}
             on:change={e => updatePlayer({ id: p.id, name: e.currentTarget.value })}/>
      <div class="player__icon">
        <SelectIcon selected={p.icon}
                    on:select={e => updatePlayer({ id: p.id, icon: e.detail.icon })}></SelectIcon>
      </div>
    </div>
  {/each}
</div>

<script>
  import store from '../store';
  import { creators as playersActions } from '../actions/players'
  import SelectIcon from '../components/SelectIcon.svelte';

  $: players = $store.players;

  function updatePlayer(p) {
    store.dispatch(playersActions.updatePlayer(p));
  }
</script>