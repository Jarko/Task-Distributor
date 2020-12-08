export default {  
  name: 'btn',
  template: `
    <div class="btn" :class="{ 'btn--disabled': isDisabled }" @click="click()">{{ label }}</div>
  `,

  props: {
    label: {type: String},
    isDisabled: {type: Boolean, default: false}
  },

  methods: {
    click () {
      if(!this.isDisabled) {
        this.$emit('click');
      }
    }
  }
};