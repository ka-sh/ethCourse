const Web3 = require('web3');
const Compiler = require('./Compiler');
const HDwalletProvider = require('truffle-hdwallet-provider');
const {interface,bytecode} = Compiler.parse('Inbox');
const walletProvider = new HDwalletProvider('noise walnut view civil surface peace range rural simple blade mesh grain',
                                            'https://rinkeby.infura.io/dTg8FL1dWMZKF4rtmDMe');
const web3 = new Web3(walletProvider);

async function deploy(){
  let accounts = await web3.eth.getAccounts();
  console.log('Deploying from Contract : ',accounts[0]);
  let details = await new web3.eth.Contract(JSON.parse(interface)).
                          deploy({data:'0x'+bytecode,arguments:['Msg for rinkeby']}).
                          send({from:accounts[0],gas:'2000000'});
console.log(details.options.address);
}
deploy();
