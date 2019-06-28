import { describe } from 'riteway';
import { createStoreInstance } from './store';
import { onMove } from '../game/onMove';
import * as R from 'ramda';

const createActionWithCard = card => ({ type: 'GAME_MOVE', payload: { card } });

describe('onMove()', async assert => {
  const initialState = createStoreInstance().gameStart().state.game;
  const card = { id: 4, type: 3, dir: 0 };
  const action = createActionWithCard(card);

  {
    const { buffer, cards } = onMove(initialState, action).entities[initialState.turn];

    assert({
      given: 'start game state and action card move top',
      should: 'move given player card to player buffer',
      actual: { buffer, cards },
      expected: {
        buffer: [card],
        cards: R.reject(
          R.where({ id: R.equals(4) }),
          initialState.entities[initialState.turn].cards
        ),
      },
    });
  }

  {
    const { roundMoves } = onMove(initialState, action);

    assert({
      given: 'start game state and action card move top',
      should: 'increment round moves',
      actual: roundMoves,
      expected: R.inc(initialState.roundMoves),
    });
  }

  {
    const { turn } = onMove(initialState, action);
    console.log(onMove(initialState, action));
    assert({
      given: 'start game state and action card move top',
      should: 'set turn to next player id',
      actual: turn,
      expected: R.pipe(
        R.omit([initialState.turn]),
        R.keys,
        R.head,
        Number
      )(initialState.entities),
    });
  }

  {
    const initialState = createStoreInstance()
      .gameStart()
      .withOnePlayerInactive(61).state.game;
    const action = createActionWithCard({ id: 34, type: 3, dir: 0 });
    const newState = onMove(initialState, action);
    const winningPlayer = R.pipe(
      R.values,
      R.filter(R.where({ isPlaying: R.equals(true) })),
      R.head
    );

    const winningPlayerBefore = winningPlayer(initialState.entities);
    const winningPlayerAfter = winningPlayer(newState.entities);

    assert({
      given: 'round is going to be over, action card move top',
      should: 'set roundMoves to 0',
      actual: newState.roundMoves,
      expected: 0,
    });

    assert({
      given: 'round is going to be over, action card move top',
      should: 'increment roundCounter',
      actual: newState.roundCounter,
      expected: R.inc(initialState.roundCounter),
    });

    assert({
      given: 'round is going to be over, action card move top',
      should: 'update players position',
      actual: winningPlayerAfter.position.y,
      expected:
        R.dec(winningPlayerBefore.position.y) >= 0
          ? R.dec(winningPlayerBefore.position.y)
          : 0,
    });

    assert({
      given: 'round is going to be over, action card move top',
      should: 'set winner to winner-player id',
      actual: newState.winner,
      expected: winningPlayerAfter.id,
    });

    assert({
      given: 'winner is truthful, action card move top',
      should: 'set isEnd to true',
      actual: newState.isEnd,
      expected: true,
    });
  }
});
