<template>
  <div>
    <p>You are about to deploy token <b>{{data.name}}</b></p>
    <p>After creation you will own <b>{{data.totalSupply}}</b> of <b>{{data.symbol}}</b></p>
  </div>
</template>

<script>
  export default {
    name: 'TokenSummary',
    props: ['data'],
  }
</script>
