<template>
  <div>
    <p>You are about to deploy token <b>{{data.name}}</b></p>
    <p>You will own <b>{{data.totalSupply}}</b> of <b>{{data.symbol}}</b> tokens</p>
  </div>
</template>

<script>
  export default {
    name: 'TokenSummary',
    props: ['data'],
  }
</script>
