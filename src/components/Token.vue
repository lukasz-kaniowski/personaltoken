<template>
  <div>
    <section class="section">
      <div class="field">
        <label class="label">Name</label>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="" id="name" v-model="name"
                     :class="{'input': true, 'is-danger': errors.includes('name') }">
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Symbol</label>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="" id="symbol" v-model="symbol"
                     :class="{'input': true, 'is-danger': errors.includes('symbol') }">
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Total Supply</label>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="number" placeholder="" id="totalSupply"
                     v-model="totalSupply"
                     :class="{'input': true, 'is-danger': errors.includes('totalSupply') }">
            </div>
          </div>
        </div>
      </div>

      <button class="button is-primary" v-on:click="deploy">Deploy</button>

    </section>
    <section class="section" v-if="hasResult">
      <p>
        {{result}}
      </p>
    </section>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import contractPrototype from '../data/contract';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        hasResult: false,
        result: null,
        name: null,
        symbol: null,
        totalSupply: null,
        errors: []
      }
    },
    methods: {
      deploy: function () {
        this.errors = _validate(this);
        if (this.errors.length > 0) return;

        const self = this;
        web3.eth.getAccounts().then((accounts) =>
          _deploy('1000000000', this.symbol, this.name, `${this.totalSupply}000000000000000000`, accounts[0])
        ).then(function (contract) {
          self.result = `Deployed to ${contract.options.address}`;
          self.hasResult = true;
        })

      }
    },
    created: function () {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    }
  }

  function _validate({ name, symbol, totalSupply }) {
    const errors = [];
    if (!name) errors.push('name');
    if (!symbol) errors.push('symbol');
    if (!totalSupply) errors.push('totalSupply');
    return errors;
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
