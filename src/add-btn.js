export default {  
  name: 'delete',
  template: `
    <div class="add-btn" @click="click()">{{ label }}</div>
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