import btn from './btn.js';

export default {
  name: 'task',
  components: {
    btn: btn
  },
  template: `
    <div class="task">
      <div v-show="!is_editing">{{ task.name }}</div>
      <div v-show="is_editing" class="task__edit">
        <input v-model="name" type="text" placeholder="Name"></input>
        <btn class="buttton__input" v-on:click="renameTask()" label="Accept"></btn>
      </div>
    </div>
  `,

  props: ['task'],
  data () {
    return {
      is_editing: true,
      name: '',
    };
  },
  mounted () {
    this.name = this.task.name;
  },
  methods: {
    renameTask () {
      this.$store.commit('renameTask', {id: this.task.id, name: this.name});
      this.is_editing = false;
    }
  }
};