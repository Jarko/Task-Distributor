export default {  
  name: 'btn',
  template: `
    <div class="button" @click="click()" :data-disabled="is_disabled ? 0 : 1">{{ label }}</div>
  `,

  props: {
    label: {type: String},
    is_disabled: {type: Boolean, default: false}
  },

  methods: {
    click () {
      if(!this.is_disabled) {
        this.$emit('click');
      }
    }
  }
};