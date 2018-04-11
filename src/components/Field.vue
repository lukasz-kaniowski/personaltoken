<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">{{label}}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input class="input" :type="type" placeholder="" :id="name"
                 v-model="localModel"
                 :class="{'input': true, 'is-danger': error }">
        </div>
        <p v-if="error" class="help is-danger">
          {{error}}
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Field',
    props: ['name', 'model', 'error', 'type', 'label'],
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
