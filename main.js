$(window).ready(function () {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  web3.eth.getAccounts().then((accounts) => $('#owner').val(accounts[0]))

});

function deploy() {
  const name = $('#name').val();
  const symbol = $('#symbol').val();
  const owner = $('#owner').val();
  const totalSupply = $('#totalSupply').val();
  let decimalPlaces = 18;
  _deploy('1000000000', symbol, name, totalSupply * Math.pow(10, decimalPlaces), owner)
    .then(function (contract) {
      $('#result').html(contract.options.address)
    })
}

function _deploy(gasPrice, symbol, name, totalSupply, owner) {
  const tokenContract = new web3.eth.Contract(contractPrototype.abi);
  return tokenContract
    .deploy({
      data: '0x' + contractPrototype.bytecode,
      arguments: [symbol, name, owner, totalSupply]
    })
    .send({
        from: owner,
        gas: 4612388,
        gasPrice
      }
    )
    .then(function (deployedContract) {
      return deployedContract;
    })
    .catch(console.log)
}


const contractPrototype = {
  abi: [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }],
    "name": "approve",
    "outputs": [{ "name": "success", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{ "name": "from", "type": "address" }, {
      "name": "to",
      "type": "address"
    }, { "name": "tokens", "type": "uint256" }],
    "name": "transferFrom",
    "outputs": [{ "name": "success", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{ "name": "", "type": "address" }],
    "name": "balances",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "_totalSupply",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{ "name": "tokenOwner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{ "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }],
    "name": "safeSub",
    "outputs": [{ "name": "c", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{ "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }],
    "name": "transfer",
    "outputs": [{ "name": "success", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }],
    "name": "safeDiv",
    "outputs": [{ "name": "c", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{ "name": "spender", "type": "address" }, {
      "name": "tokens",
      "type": "uint256"
    }, { "name": "data", "type": "bytes" }],
    "name": "approveAndCall",
    "outputs": [{ "name": "success", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }],
    "name": "safeMul",
    "outputs": [{ "name": "c", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [{ "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{ "name": "tokenAddress", "type": "address" }, {
      "name": "tokens",
      "type": "uint256"
    }],
    "name": "transferAnyERC20Token",
    "outputs": [{ "name": "success", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{ "name": "tokenOwner", "type": "address" }, {
      "name": "spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{ "name": "remaining", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }],
    "name": "safeAdd",
    "outputs": [{ "name": "c", "type": "uint256" }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{ "name": "_newOwner", "type": "address" }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{ "name": "_symbol", "type": "string" }, {
      "name": "_name",
      "type": "string"
    }, { "name": "_tokenOwner", "type": "address" }, { "name": "_supply", "type": "uint256" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, {
    "anonymous": false,
    "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, {
      "indexed": true,
      "name": "_to",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{ "indexed": true, "name": "from", "type": "address" }, {
      "indexed": true,
      "name": "to",
      "type": "address"
    }, { "indexed": false, "name": "tokens", "type": "uint256" }],
    "name": "Transfer",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{ "indexed": true, "name": "tokenOwner", "type": "address" }, {
      "indexed": true,
      "name": "spender",
      "type": "address"
    }, { "indexed": false, "name": "tokens", "type": "uint256" }],
    "name": "Approval",
    "type": "event"
  }],
  bytecode: '606060405234156200001057600080fd5b604051620018933803806200189383398101604052808051820191906020018051820191906020018051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360029080519060200190620000a492919062000199565b508260039080519060200190620000bd92919062000199565b506012600460006101000a81548160ff021916908360ff16021790555080600581905550600554600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6005546040518082815260200191505060405180910390a35050505062000248565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001dc57805160ff19168380011785556200020d565b828001600101855582156200020d579182015b828111156200020c578251825591602001919060010190620001ef565b5b5090506200021c919062000220565b5090565b6200024591905b808211156200024157600081600090555060010162000227565b5090565b90565b61163b80620002586000396000f30060606040526004361061011d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde0314610122578063095ea7b3146101b057806318160ddd1461020a57806323b872dd1461023357806327e235e3146102ac578063313ce567146102f95780633eaaf86b1461032857806370a082311461035157806379ba50971461039e5780638da5cb5b146103b357806395d89b4114610408578063a293d1e814610496578063a9059cbb146104d6578063b5931f7c14610530578063cae9ca5114610570578063d05c78da1461060d578063d4ee1d901461064d578063dc39d06d146106a2578063dd62ed3e146106fc578063e6cb901314610768578063f2fde38b146107a8575b600080fd5b341561012d57600080fd5b6101356107e1565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561017557808201518184015260208101905061015a565b50505050905090810190601f1680156101a25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101bb57600080fd5b6101f0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061087f565b604051808215151515815260200191505060405180910390f35b341561021557600080fd5b61021d610971565b6040518082815260200191505060405180910390f35b341561023e57600080fd5b610292600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506109bc565b604051808215151515815260200191505060405180910390f35b34156102b757600080fd5b6102e3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c4c565b6040518082815260200191505060405180910390f35b341561030457600080fd5b61030c610c64565b604051808260ff1660ff16815260200191505060405180910390f35b341561033357600080fd5b61033b610c77565b6040518082815260200191505060405180910390f35b341561035c57600080fd5b610388600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c7d565b6040518082815260200191505060405180910390f35b34156103a957600080fd5b6103b1610cc6565b005b34156103be57600080fd5b6103c6610e65565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561041357600080fd5b61041b610e8a565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561045b578082015181840152602081019050610440565b50505050905090810190601f1680156104885780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156104a157600080fd5b6104c06004808035906020019091908035906020019091905050610f28565b6040518082815260200191505060405180910390f35b34156104e157600080fd5b610516600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610f44565b604051808215151515815260200191505060405180910390f35b341561053b57600080fd5b61055a60048080359060200190919080359060200190919050506110cd565b6040518082815260200191505060405180910390f35b341561057b57600080fd5b6105f3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506110f1565b604051808215151515815260200191505060405180910390f35b341561061857600080fd5b6106376004808035906020019091908035906020019091905050611337565b6040518082815260200191505060405180910390f35b341561065857600080fd5b610660611368565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156106ad57600080fd5b6106e2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061138e565b604051808215151515815260200191505060405180910390f35b341561070757600080fd5b610752600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506114cd565b6040518082815260200191505060405180910390f35b341561077357600080fd5b6107926004808035906020019091908035906020019091905050611554565b6040518082815260200191505060405180910390f35b34156107b357600080fd5b6107df600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611570565b005b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108775780601f1061084c57610100808354040283529160200191610877565b820191906000526020600020905b81548152906001019060200180831161085a57829003601f168201915b505050505081565b600081600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600660008073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205460055403905090565b6000610a07600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483610f28565b600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610ad0600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483610f28565b600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610b99600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483611554565b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60066020528060005260406000206000915090505481565b600460009054906101000a900460ff1681565b60055481565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d2257600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f205780601f10610ef557610100808354040283529160200191610f20565b820191906000526020600020905b815481529060010190602001808311610f0357829003601f168201915b505050505081565b6000828211151515610f3957600080fd5b818303905092915050565b6000610f8f600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483610f28565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061101b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483611554565b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080821115156110dd57600080fd5b81838115156110e857fe5b04905092915050565b600082600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a38373ffffffffffffffffffffffffffffffffffffffff16638f4ffcb1338530866040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156112ce5780820151818401526020810190506112b3565b50505050905090810190601f1680156112fb5780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b151561131c57600080fd5b5af1151561132957600080fd5b505050600190509392505050565b600081830290506000831480611357575081838281151561135457fe5b04145b151561136257600080fd5b92915050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156113eb57600080fd5b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15156114ae57600080fd5b5af115156114bb57600080fd5b50505060405180519050905092915050565b6000600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000818301905082811015151561156a57600080fd5b92915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115cb57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a7230582062dcfa68106dfd0b74f2c76bce21bb01e3a86f5f2b9af4630b86d69d2a87efc10029'
};

