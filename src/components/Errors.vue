<template>
  <ul>
    <li v-for="error in errors">{{error}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'Errors',
    props: ['errors'],

  }
</script>
