<style>
  .users {
    flex-direction: column;
  }
  .user,
  .users { display: flex; }
</style>

<div class="users">
  {#each users as p}
    <div class="users__item user">
      <input class="user__name"
             value={p.name}
             on:change={e => emitUpdate({ id: p.id, name: e.currentTarget.value })}/>
      <div class="user__icon">
        <SelectIcon selected={p.icon}
                    on:select={e => emitUpdate({ id: p.id, icon: e.detail.icon })}></SelectIcon>
      </div>
    </div>
  {/each}
</div>

<script>
  import { createEventDispatcher } from 'svelte';
  import { creators as usersActions } from '../actions/users'
  import SelectIcon from '../components/SelectIcon.svelte';

  export let users = [];
  const emit = createEventDispatcher();

  function emitUpdate(update) {
    emit('update', { update });
  }
</script>