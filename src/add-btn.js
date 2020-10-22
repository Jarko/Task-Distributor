export default {  
  name: 'delete',
  template: `
    <button class="add-btn" @click="click()">{{ label }}</button>
  `,

  props: {
    label: {type: String},
  },
  methods: {
    click () {
      if(!this.is_disabled) {
        this.$emit('click');
      }
    }
  }
};