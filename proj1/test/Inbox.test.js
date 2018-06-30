const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const ganacheProvider = ganache.provider();
const web3 = new Web3(ganacheProvider);
const Compiler = require('../Compiler');
const{interface,bytecode} = Compiler.parse('Inbox');

const accounts = [];
let inbox;

beforeEach(async()=>{
  {while(accounts.length>0)accounts.pop();}
  let tmpAccounts = await web3.eth.getAccounts();
  accounts.push(...tmpAccounts);
  inbox = await new web3.eth.Contract(JSON.parse(interface)).
          deploy({data:bytecode,arguments:['Hello from test']}).
          send({from:accounts[0],gas:1000000});
  // inbox.setProvider(ganacheProvider);
});

describe('Inbox Contract',()=>{
  it('Should deploy successfully',()=>{
    assert.ok(inbox.options.address);
  });
  it('Should set Message successfully',async ()=>{
    let msg = "This is my new Message:)";
    let tx = await inbox.methods.setMessage(msg).send({from:accounts[0]});
    console.log('Transaction:',tx);
    let newMsg =await inbox.methods.message().call();
    assert.equal(newMsg,msg);
  })
})
