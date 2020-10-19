import btn from './btn.js';

export default {
  name: 'task',
  components: {
    btn: btn
  },
  template: `
    <div class="task">
      <div class="task__edit">
        <input v-model="name" type="text" placeholder="Name"></input>
        <img class="delete" src="./resources/x-mark-32.png" v-on:click="removeTask()" />
      </div>
    </div>
  `,

  props: ['task'],
  data () {
    return {
      name: '',
    };
  },
  mounted () {
    this.name = this.task.name;
  },
  methods: {
    removeTask () {
      this.$store.commit('removeTask', this.task.id);
    }
  }
};