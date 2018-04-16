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
          <tab-content title="Token info" :before-change="validateToken">
            <Errors :errors="errors.token"/>
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
            <Errors :errors="errors.deployment"/>
            <TokenSummary :data="{name, symbol, totalSupply}"/>
            Gas price

            <Notifications :list="notifications"/>

          </tab-content>
        </form-wizard>

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
  import Notifications from './Notifications';
  import TokenSummary from './TokenSummary';

  export default {
    name: 'Token',
    components: {
      Field, MetamaskDetector, NetworkAndAccount, Errors, Notifications, TokenSummary
    },
    data() {
      return {
        name: null,
        symbol: null,
        totalSupply: null,
        errors: emptyErrors(),
        eth: [],
        metamaskDetected: false,
        notifications: []
      }
    },
    computed: {
      showNetworkInfo: function () {
        return this.metamaskDetected;
      }
    },
    methods: {
      validateToken: function () {
        this.errors = emptyErrors()
        this.errors.token = _validate(this);
        return Object.keys(this.errors.token).length === 0
      },
      validateNetwork: function () {
        this.errors = emptyErrors()
        if (this.eth.balance <= 0.01) this.errors.network.balance = 'Balance need to be higher then 0.01 ETH'
        if (!this.eth.network) this.errors.network.network = 'No ethereum network detected.'
        return Object.keys(this.errors.network).length === 0
      },

      deploy: function () {
        const self = this;
        self.notifications = [];
        self.result = null;
        self.hasResult = false;
        self.errors.deployment = {};
        web3.eth.getAccounts().then((accounts) =>
          new web3.eth.Contract(contractPrototype.abi)
            .deploy({
              data: '0x' + contractPrototype.bytecode,
              arguments: [self.symbol, self.name, accounts[0], `${self.totalSupply}000000000000000000`]
            })
            .send({
                from: accounts[0],
                gas: 4612388,
                gasPrice: '1000000000'
              }
            )
            .on('error', function (error) {
              console.log(error.message)
              self.errors.deployment = {
                error: `${error.message.slice(0, error.message.indexOf('at e.'))}`
              }
            })
            .on('transactionHash', function (transactionHash) {
              self.notifications.push(`Transaction ${transactionHash} sent to network`)
            })
            .on('receipt', function (receipt) {
              self.notifications.push(`Receipt received ${receipt.contractAddress}`)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
              self.notifications.push(`Confirmation received ${confirmationNumber} ${receipt.contractAddress}`)
            })
            .then(function (contract) {
              self.notifications.push(`Deployed to ${contract.options.address}`)
            })
        )
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

  function emptyErrors() {
    return {
      network: {},
      token: {},
      deployment: {}
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
