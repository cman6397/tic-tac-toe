import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      x_to_move: true,
    }
  }

  handle_click(i) {
    let history = this.state.history;
    let current_squares = history[history.length-1].squares;
    const squares = current_squares.slice();

    if (squares[i] != null || check_outcome(current_squares)){
      return;
    }
    if (this.state.x_to_move){
      squares[i] = 'X'
    }
    else {
      squares[i] = 'O'
    }
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      x_to_move: !this.state.x_to_move,
    });
  }

  back() {
    const history = this.state.history.slice();
    if (history.length == 1) {
      return;
    }
    history.pop();

    this.setState({
      history: history,
      x_to_move: !this.state.x_to_move
    });
  }

  render() {
  let boards = this.state.history;
  var current_squares = boards[boards.length-1].squares;
  var status = 'O to move';
  if (this.state.x_to_move) {
    status = 'X to move'
  }

  let outcome = check_outcome(current_squares);
  if (outcome) {
    status = outcome + " Won"
  }
    return (
    <div class = 'container'>
      <button 
      className = "back_button" 
      onClick={(i) => this.back()} > 
      Back </button>
      <Board 
      squares = {current_squares}
      status = {status}
      onClick={(i) => this.handle_click(i)}/>
    </div>
    );
  }
}

class Board extends React.Component {
  
  renderSquare(i) {
    return <Square 
    value = {this.props.squares[i]}
    onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    var status = this.props.status

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button 
        className = "square"
        onClick={() => this.props.onClick()}
      >
      {this.props.value}
      </button>
    );
  }
}

function Test(props) {
  return <h1> Hello, {props.name} </h1>
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function check_outcome(squares) {
  var winner = null;

  var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (var i = 0; i < lines.length; i++){
    let line = lines[i]
    let a = squares[line[0]]
    let b = squares[line[1]]
    let c = squares[line[2]]
    if ((a == b) && (b == c) && a != null){
      winner = a
    }
  }
  return winner
}
