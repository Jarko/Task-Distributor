import btn from './btn.js';
import task from './task.js';

export default {
  name: 'tasks',
  components: {
    btn: btn,
    task: task
  },
  template: `
    <div class="tasks">
      <h2>Tasks</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <task :task="task"></task>
        </li>
      </ul>
      <btn v-on:click="addTask()" label="Add Task"></btn>
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