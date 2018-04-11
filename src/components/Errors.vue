<template>
  <div class="notification is-danger" v-show="hasErrors">
    <ul>
      <li v-for="error in errors">{{error}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Errors',
    props: ['errors'],
    computed: {
      hasErrors: function () {
        return Object.keys(this.errors).length > 0
      }
    }
  }
</script>
