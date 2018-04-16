<template>
  <div>
    <Field v-on:input="onGasInput" type="number" label="Gas Price" :model="gas"/>
    <p>
      This will cost about {{cost}} ETH
    </p>
  </div>
</template>

<script>
  import Field from './Field';
  import contract from '../data/contract';

  export default {
    name: 'GasPrice',
    components: {
      Field
    },
    props: ['initialGas'],
    data() {
      return {
        gas: this.initialGas
      }
    },
    computed: {
      cost: function () {
        return this.gas * contract.gasLimit / 1000000000
      }
    },
    methods: {
      onGasInput: function (val) {
        this.$emit('input', val)
        this.gas = val;
      }
    }
  }
</script>
