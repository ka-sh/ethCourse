const fs = require('fs');
const path = require('path');
const solc = require('solc');
module.exports =(function(){
  return{
    parse:function(contractName){
      let ascii = fs.readFileSync(path.resolve(__dirname,'contracts',contractName+'.sol'),'utf8');
      let compiledObj = solc.compile(ascii);
      return compiledObj.contracts[`:${contractName}`];
    }
  }
})();
