<template>
  <div>
    Network detector
    <dl>
      <dt>Network</dt>
      <dd>{{network}}</dd>
      <dt>Account</dt>
      <dd>{{account}}</dd>
      <dt>balance</dt>
      <dd>{{balance}} ETH</dd>
    </dl>
  </div>
</template>

<script>
  import Web3 from 'web3';

  export default {

    data() {
      return {
        network: null,
        account: null,
        balance: null
      }
    },
    methods: {
      fetchAccount() {
        web3.eth.net.getNetworkType().then(network => this.network = network)
        web3.eth.getAccounts()
          .then(accounts => {
            this.account = accounts[0];
            return web3.eth.getBalance(this.account);
          })
          .then(balance => this.balance = web3.utils.fromWei(balance))
          .then(() => this.$emit('accountRefreshed', this.$data))
      },
    },
    computed: {
      showMetamaskInstallSection: function () {
        return !this.metamaskDetected;
      }
    },
    mounted: function () {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        this.fetchAccount()
        setInterval(this.fetchAccount, 500)
      }
    }

  }
</script>
<style scoped>
  .medium-image {
    width: 300px;
    /*text-align: center;*/
  }
</style>
