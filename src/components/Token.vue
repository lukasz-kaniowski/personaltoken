<template>
  <div>
    <section class="section">
      <div class="container">
        <form-wizard finishButtonText="Create Token" class="box" @on-complete="deploy">
          <tab-content title="Metamask and Network" :before-change="validateNetwork">
            <Errors :errors="errors.network"/>
            <MetamaskDetector v-on:detected="(isDetected) => this.metamaskDetected = isDetected"/>
            <NetworkAndAccount v-if="showNetworkInfo"
                               v-on:accountRefreshed="account => this.eth = account"/>
          </tab-content>
          <tab-content title="Token info" :before-change="validate">
            <Field name="name" :model="name" :error="errors.token.name" type="text" label="Name"
                   v-on:input="(val) => this.name = val"/>

            <Field name="symbol" :model="symbol" :error="errors.token.symbol" type="text"
                   label="Symbol"
                   v-on:input="(val) => this.symbol = val"/>

            <Field name="totalSupply" :model="totalSupply" :error="errors.token.totalSupply"
                   type="number"
                   label="Total Supply"
                   v-on:input="(val) => this.totalSupply = val"/>

          </tab-content>
          <tab-content title="Create token">
            Info about
            <ul>
              <li>Token to be created</li>
              <li>gas price</li>
            </ul>
          </tab-content>
        </form-wizard>

        <p v-if="hasResult">
          {{result}}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import contractPrototype from '../data/contract';
  import Field from './Field';
  import MetamaskDetector from './MetamaskDetector';
  import NetworkAndAccount from './NetworkAndAccount';
  import Errors from './Errors';

  export default {
    name: 'Token',
    components: {
      Field, MetamaskDetector, NetworkAndAccount, Errors
    },
    data() {
      return {
        hasResult: false,
        result: null,
        name: null,
        symbol: null,
        totalSupply: null,
        errors: {
          network: {},
          token: {}
        },
        eth: [],
        metamaskDetected: false
      }
    },
    computed: {
      showNetworkInfo: function () {
        return this.metamaskDetected;
      }
    },
    methods: {
      validate: function () {
        this.errors.token = _validate(this);
        return Object.keys(this.errors.token).length === 0
      },
      validateNetwork: function () {
        this.errors.network = {};
        if (this.eth.balance <= 0.01) this.errors.network.balance = 'Balance need to be higher then 0.01 ETH'
        if (!this.eth.network) this.errors.network.network = 'No ethereum network detected. Check your Metamask'
        return Object.keys(this.errors.network).length === 0
      },

      deploy: function () {
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
    const errors = {};
    if (!name) errors.name = 'Name is required'
    if (!symbol) errors.symbol = 'Symbol is required'
    if (!totalSupply) errors.totalSupply = 'Total supply is required'
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
</style>
