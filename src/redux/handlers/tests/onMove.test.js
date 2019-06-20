import { describe } from 'riteway';
import { gameStartState } from '../../../models/state';
import { onMove } from '../onMove';
import { reject, where, equals, inc, omit, pipe, keys, head } from 'ramda';

describe('onMove()', async assert => {
  const initialState = gameStartState.game;
  const card = { id: 4, type: 3, dir: 0 };
  const action = { type: 'GAME_MOVE', payload: { card } };

  {
    const { buffer, cards } = onMove(initialState, action).entities[initialState.turn];

    assert({
      given: 'start game state and action card object',
      should: 'move given player card to player buffer',
      actual: { buffer, cards },
      expected: {
        buffer: [card],
        cards: reject(
          where({ id: equals(4) }),
          initialState.entities[initialState.turn].cards
        ),
      },
    });
  }

  {
    const { roundMoves } = onMove(initialState, action);

    assert({
      given: 'start game state and action card object',
      should: 'increment round moves',
      actual: roundMoves,
      expected: inc(initialState.roundMoves)
    });
  }

  {
    const { turn } = onMove(initialState, action);

    assert({
      given: 'start game state and action card object',
      should: 'set turn to next player id',
      actual: turn,
      expected: pipe(
        omit([initialState.turn]),
        keys,
        head,
        Number
      )(initialState.entities)
    });
  }

  {
    assert({
      given: 'round is over, action card object',
      should: 'set roundMoves to 0',
      actual: '',
      expected: ''
    });
  }

  {
    assert({
      given: 'round is over, action card object',
      should: 'increment roundCounter',
      actual: '',
      expected: ''
    });
  }

  {
    assert({
      given: 'round is over, action card object',
      should: 'increment roundCounter',
      actual: '',
      expected: ''
    });
  }

  {
    assert({
      given: 'round is over, action card object',
      should: 'update players position',
      actual: '',
      expected: ''
    });
  }

  {
    assert({
      given: 'round is over, action card object',
      should: 'set winner to winner-player id',
      actual: '',
      expected: ''
    });
  }


  {
    assert({
      given: 'winner is truthful, action card object',
      should: 'set isEnd to true',
      actual: '',
      expected: ''
    });
  }
});
