import React, {useReducer} from 'react';
import './App.css';
import Grid from './Grid';

function initState(){
  const board = new Array(7*6).fill('white');
  return {color: 'red', board, winner: null, tie: false}
}

function reducer(state, action){
  switch (action.type){
    case 'dropDisc':
      if(state.winner){
        return state;
      }
      let _board = [...state.board];
      if(_board[action.index] !== 'white'){
        return state;
      } 
      const index = column(action.index, _board);
      _board[index] = state.color;
      return {
        ...state,
        board: _board,
        color: state.color === 'red' ? 'blue' : 'red',
        winner: checkForWinner(_board, state.color),
        tie: tie(_board)
      };
    case 'clearBoard':
      return initState()
    default:
      return state;
  }
}

function column (i, _board){
  const column = i % 7;
  let index = 5 * 7 + column;
  while(index >= 0) {
    if(_board[index] === 'white'){
      break;
    }
    index -= 7;
  }
  return index;
}

function checkForWinner(_board, color){
  if(checkHorizontalWinner(_board, color)||checkVerticalWinner(_board, color)||checkForDiagonalWinnerUpperRight(_board,color)||checkForDiagonalWinnerUpperLeft(_board, color)){
    return color;
  }
  return null;
}

function checkVerticalWinner(_board, color){
  for(let i = 0 ; i <= 20; i++){
    if(_board[i] === color && _board[i + 7] === color && _board[i + 14] === color && _board[i + 21] === color){
      console.log('WinnerVertical')
      return color;
    }
  }
  return null;
}

function checkHorizontalWinner(_board, color){
  for(let j = 0; j < _board.length; j+=7){
    for(let i = j; i <= j + 3; i++){
      if(_board[i] === color && _board[i + 1] === color && _board[i + 2] === color && _board[i + 3] === color){
        return color;
      }
    }
  }
  return null;
}

function checkForDiagonalWinnerUpperLeft(_board,color){
  for (let j = 0; j <= 14; j+=7){
    for(let i = j; i <= j + 3; i++){
      if(_board[i] === color && _board[i + 8] === color && _board[i + 16] === color && _board[i + 24] === color ){
        return color;
      }
    }
  }
  return null;
}

function checkForDiagonalWinnerUpperRight(_board, color){
  for(let j = 3; j <= 21; j +=7){
    for(let i = j; i <= j + 3; i++){
      if(_board[i] === color && _board[i + 6] === color && _board[i + 12] === color && _board[i + 18] === color){
        return color;
      }
    }
  }
  return null;
}

function tie (_board){
  return !_board.includes("white");
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, initState)

  
  return (
    <div className="App">
      <h1>Connect 4</h1>
      <Grid board = {state.board} onClickCell={ i=> dispatch ({type: 'dropDisc', index: i})} />
      
      <button 
        onClick={() => dispatch({type: 'clearBoard'})}
        style={{
          margin: '20px',
          backgroundColor: '#FECAE0',
          border: 'none',
          outline: 'none',
        }}
        >Reset</button>
      <div className='winnerTie' >
        {state.winner? `The winner is ${state.winner}` : null}
        {state.tie ? `It´s a draw` : null}
      </div>
    </div>
  );
}
