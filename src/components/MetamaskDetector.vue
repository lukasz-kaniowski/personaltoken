<template>
  <div v-if="showMetamaskInstallSection">
    <p>
      Looks that you don't have metamask installed on your browser.
    </p>
    <p>
      Please install it from
      <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>
      and refresh this page.
    </p>
    <p>
      <a href="https://metamask.io/" target="_blank"><img class="medium-image"
                                                          src="../assets/metamask.png"/></a>
    </p>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        metamaskDetected: false
      }
    },
    computed: {
      showMetamaskInstallSection: function () {
        return !this.metamaskDetected;
      }
    },
    created: function () {
      this.metamaskDetected = typeof web3 !== 'undefined';
      this.$emit('detected', this.metamaskDetected)
    }

  }
</script>
<style scoped>
  .medium-image {
    width: 300px;
    /*text-align: center;*/
  }
</style>
