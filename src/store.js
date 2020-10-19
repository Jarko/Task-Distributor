export default new Vuex.Store({
  state: {
    next_person_id: 1,
    next_task_id: 1,
    people: [],
    tasks: [],
  },
  mutations: {
    addPerson(state) {
      let person = {
        id: state.next_person_id,
        name: ''
      }

      state.people.push(person);
      state.next_person_id++;
    },
    renamePerson(state, person) {
      state.people[person.id].name = person.name;
    },
    removePerson(state, target_id) {
      state.people = state.people.filter(person => {
        return person.id !== target_id; 
      });

      console.log("removed person " + target_id);
    },
    addTask(state) {
      let task = {
        id: state.tasks.length + 1, 
        name: ''
      }
      state.tasks.push(task);
    },
    renameTask(state, task) {
      state.tasks[task.id - 1].name = task.name;
    },
    removeTask(state, target_id) {
      state.tasks = state.tasks.filter(task => {
        return task.id !== target_id; 
      });

      console.log("removed task " + target_id);
    },
  }
});