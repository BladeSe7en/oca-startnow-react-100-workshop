import React from "react";
import ReactDOM from "react-dom";
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
    );
  }
  
  render() {
    return (
      <div>
      <h1>TIC TAC TOE</h1>
        
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

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }

      ],
      players: [
        { name: "X", score: 0},
        { name: "O", score: 0 },
      ],
      stepNumber: 0,
      xIsNext: true,

      isGameOver: false
      
    };
    this.calculateWinner = this.calculateWinner.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
  }

  onChangeScore(name) {
    console.log(name)
    // create a new list of player by looping over the existing list
    // and replacing the player we want to change the score for
    var oldPlayers = this.state.players;
    let message;
    var newPlayers = oldPlayers.map(function(player){
      if(player.name == name){
        message = player.name + " scored and has " + player.score + " points.";
        return {
          name: player.name,
          score: player.score + 1
        }
      }

        return player;
    });

    this.setState({
        totalScore: this.state.totalScore + 1,
        message,
        players: newPlayers,
        isGameOver: true
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    }, () => { 
      this.calculateWinner(squares);
      if (squares[i]) {
        return;
      }
    });
  }

  addCountToWinner(winner) {
    const win = this.state.score.findIndex({})
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  calculateWinner(squares) {
    console.log('this is calculate winner: ');
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log('tedt');
        this.onChangeScore(squares[a]);
        console.log('this is squares A', squares[a]);
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      );
    });

    let status;
   
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className = "winner">{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="score">
        <ScoreBoard players={this.state.players} />
        </div>
      </div>
    );
  }
}

class Player extends React.Component {
  constructor(){
      super();
  }

    renderPrize() {
      if(this.props.score >= 10) {
        return <img src="http://goo.gl/u1KKqp" />
      }
      return null;
    }

    render() {
      return (
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.score} {this.renderPrize()}</td>
        </tr>
      );
    }
}
class ScoreBoard extends React.Component {
  constructor() {
    super();

    this.state = {
      message: "There are no scores yet.",
    };
  }

  renderPlayer(player) {
    return <Player
      key={player.name}
      name={player.name}
      score={player.score}
      />;
  }

    render() {
        return (
          <div className= "score">
            <table>
              <thead>
                <tr>
                  <td><b>Name</b></td>
                  <td><b>Score</b></td>
                
                </tr>
              </thead>

               <tbody>
                  {this.props.players.map(this.renderPlayer.bind(this))}
               </tbody>

               <tfoot>
                 <tr>
                    <td colSpan="3">{this.state.message}</td>
                 </tr>
                 <tr>
                    <td colSpan="3">{this.state.totalScore}</td>
                 </tr>
               </tfoot>
           </table>
          </div>
         
        );
    }
}


// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );
