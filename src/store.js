export default new Vuex.Store({
  state: {
    people: [],
    tasks: [],
  },
  mutations: {
    addPerson(state) {
      let person = {
        id: state.people.length + 1, 
        name: ''
      }
      state.people.push(person);
    },
    renamePerson(state, person) {
      state.people[person.id - 1].name = person.name;
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
  }
});