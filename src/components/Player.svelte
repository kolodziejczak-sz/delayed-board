<script>
  export let player;
</script>

<style>
  .player {
    display: inline-block;
  }
</style>

<div class="player">
  <div>{player.user.name} {player.user.icon}</div>
  <div>cards: {player.cards.length}</div>
  <div>buffer: {player.buffer.length}</div>
  <div>health: {player.health}</div>
  <div>isPlaying: {player.isPlaying}</div>
  <div>position: {JSON.stringify(player.position)}</div>
</div>
