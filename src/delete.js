export default {  
  name: 'delete',
  template: `
    <div class="delete" @click="click()">
      <img class="delete__img" src="./resources/x-mark-32.png" />
    </div>
  `,

  methods: {
    click () {
      if(!this.is_disabled) {
        this.$emit('click');
      }
    }
  }
};