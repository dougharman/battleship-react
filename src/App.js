import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import battleship from './battleship';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: '',
      player1: '',
      player2: '',
      p1NumberOfGuesses: '',
      p2NumberOfGuesses: '',
      p1NumberOfHits: '',
      p2NumberOfHits: '',
      p1DiscoveredPositions: '',
      p2DiscoveredPositions: '',
      balance: '',
      value: '',
      message: '',
      errorMessage: '',
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const owner = await battleship.methods.owner().call();
    const player1 = await battleship.methods.getPlayer1().call();
    const player2 = await battleship.methods.getPlayer2().call();
    const balance = await web3.eth.getBalance(battleship.options.address);
    const p1NumberOfGuesses = await battleship.methods.getLengthP1().call();
    const p2NumberOfGuesses = await battleship.methods.getLengthP2().call();
    const p1NumberOfHits = await battleship.methods.getLengthHitsP1().call();
    const p2NumberOfHits = await battleship.methods.getLengthHitsP2().call();
    const p1PositionsDiscovered = await battleship.methods.getP1Hits().call();
    const p2PositionsDiscovered = await battleship.methods.getP2Hits().call();
    const battleshipAddress = await battleship.options.address
    this.setState({ owner, player1, player2, balance, p1NumberOfGuesses, p2NumberOfGuesses,
      p1NumberOfHits, p2NumberOfHits, p1PositionsDiscovered, p2PositionsDiscovered });

  }

  // ================================================================================
  // ACTION: START GAME (Player 1)
  // ================================================================================

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const player1 = accounts[0];
    console.log(player1);
    // if (!player1) {
    //   alert('MetaMask is not enabled!');
    // }

    this.setState({ message: 'Waiting on transaction success...' });

    await battleship.methods.startGame().send({
      value: web3.utils.toWei(this.state.value, 'ether'),
      from: web3.eth.accounts[1],
      to: web3.eth.accounts[0],    // owner holds the funds
      gas: '1000000'
    });

    this.setState({ message: 'You have been entered!' });
  };

  // ================================================================================
  // ACTION: ACCEPT CHALLENGE (Player 2)
  // ================================================================================

  onChange = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const player2 = accounts[1];
    console.log(player2);
    // if (!player2) {
    //   alert('MetaMask is not enabled!');
    // }

    this.setState({ message: 'Waiting on transaction success...' });

    await battleship.methods.acceptChallenge().send({
      guess: 'this.state.value',
      value: web3.utils.toWei(this.state.value, 'ether'),
      from: web3.eth.accounts[2],
      to: web3.eth.accounts[0],     // owner holds the funds
      gas: '1000000'
    });

    this.setState({ message: 'You have been entered!' });
  };

  render() {
    return (
      <React.Fragment>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Battleship Game</h1>
        </header>
      </div>
      <div>
        <form onSubmit={this.onSubmit} >
          <h2>START GAME</h2>
          <h4>To start a game, please submit your board and 5 ETH</h4>
          <div>
          <label>Entrance fee:</label>
            <input
              name="startGame"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            /><br />
          </div>
          <button>Enter</button>
        </form>
      </div>
      <div>
        <ul>
          <li>Owner:    {this.state.owner}</li>
          <li>Player1:  {this.state.player1}</li>
          <li>Balance:  {this.state.balance}</li>
        </ul>
      </div>
      <div>
        <form onSubmit={this.onSubmit} >
          <h2>ACCEPT CHALLENGE</h2>
          <h4>To accept the challenge, please submit your board and 5 ETH</h4>
          <div>
          <label>Entrance fee:</label>
            <input
              name="acceptChallenge"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            /><br />
          </div>
          <div>
          <label>Guess:</label>
            <input
              name="acceptChallenge"
              guess={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            /><br />
          </div>
          <button>Enter</button>
        </form>
      </div>
      <div>
        <ul>
          <li>Owner:    {this.state.owner}</li>
          <li>Player1:  {this.state.player1}</li>
          <li>Player2:  {this.state.player2}</li>
          <li>Balance:  {this.state.balance}</li>
          <li>Guess:    {this.state.guess}</li>
        </ul>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
