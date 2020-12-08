export default {  
  name: 'toggle',
  template: `
    <div class="toggle">
      <div class="toggle__container">
        <div class="switch" @click="click()">
          <input type="checkbox" v-model="isOn"></input>
          <span class="slider" :class="{ 'slider--on':isOn }"></span>
        </div>
        <div class="toggle__label">{{ label }}</div>
      </div>
      <div class="info">{{ info }}</div>
    </div>
  `,

  props: ['label', 'info'],
  data: function () {
    return {
      isOn: false
    }
  },

  methods: {
    click () {
      this.isOn = !this.isOn;

      if(this.isOn) {
        this.$emit('on');
      } else {
        this.$emit('off');
      }
    }
  }
};