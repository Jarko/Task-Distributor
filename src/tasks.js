import input_name from './input-name.js';

export default {
  name: 'tasks',
  components: {
    'input-name': input_name,
  },
  template: `
    <div class="tasks">
      <h2>Tasks</h2>
      <transition-group name="name-list" class="name-list">
        <div v-for="task in tasks" :key="task.id" class="name-list__item">
          <input-name :item="task" add-label="Add Task" :useWeights="true" type="Task" @added="addTask"></input-name>
        </div>
      </transition-group>
    </div>
  `,

  computed: {
    tasks () {
      return this.$store.state.tasks;
    }
  },
  methods: {
    addTask () {
      this.$store.commit('addTask');
    }
  }
};