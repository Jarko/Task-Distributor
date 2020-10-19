import delete_btn from './delete.js';

export default {
  name: 'task',
  components: {
    "delete-btn": delete_btn
  },
  template: `
    <div class="task">
      <div class="task__edit">
        <input v-model="name" type="text" placeholder="Name"></input>
        <delete-btn @click="removeTask()"></delete-btn>
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