<template>
  <div class="notification" v-show="show">
    <ul>
      <li v-for="item in list">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Notifications',
    props: ['list'],
    computed: {
      show: function () {
        return this.list.length > 0
      }
    }
  }
</script>
