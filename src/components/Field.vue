<template>
  <div class="field">
    <label class="label">{{label}}</label>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input class="input" :type="type" placeholder="" :id="name"
                 v-model="localModel"
                 :class="{'input': true, 'is-danger': errors.includes(name) }">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Field',
    props: ['name', 'model', 'errors', 'type', 'label'],
    data() {
      return { localModel: this.model }
    },
    watch: {
      localModel(val) {
        this.$emit('input', val);
      }
    }
  }
</script>
