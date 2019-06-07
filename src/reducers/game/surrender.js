export const onSurrender = (state) => ({
  ...state,
  isEnd: true,
  winner: state.nextTurn
});