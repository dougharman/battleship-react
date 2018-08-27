import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

export default web3;



/* @dev - while I was playing with Rinkeby

let web3;

const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else if (typeof window !== 'undefined' && typeof window.web3 === 'undefined') {
  const provider = new Web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(provider);
} else {
  // @dev - I changed the deploy script in Battleship.sol, so this does not currently work
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
  );
  web3 = new Web3(provider);
}

export default web3;

*/