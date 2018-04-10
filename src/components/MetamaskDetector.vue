<template>
  <div>
    <div v-if="showMetamaskInstallSection">
      <p>
        Looks that you don't have metamask installed on your browser.
      </p>
      <p>
        Please install it from <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>
        and refresh this page.
      </p>
      <p>
        <a href="https://metamask.io/" target="_blank"><img class="medium-image" src="../assets/metamask.png"/></a>
      </p>
    </div>
  </div>
</template>

<script>
  import Web3 from 'web3';

  export default {
    data() {
      return {
        network: null,
        metamaskDetected: false
      }
    },
    computed: {
      showMetamaskInstallSection: function () {
        return !this.metamaskDetected;
      }
    },
    created: function () {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        this.metamaskDetected = true
      } else {
        this.metamaskDetected = false
      }
    }

  }
</script>
<style>
  .medium-image {
    width: 300px;
    /*text-align: center;*/
  }
</style>
