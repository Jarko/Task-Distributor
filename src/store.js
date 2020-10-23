export default new Vuex.Store({
  state: {
    next_person_id: 1,
    next_task_id: 1,
    people: [{id: 0, name: ''}],
    tasks: [{id: 0, name: ''}],
    occurrences: 1,
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
    renamePerson(state, target_person) {
      let target_index = state.people.findIndex(person => {
        return target_person.id === person.id; 
      });

      state.people[target_index].name = target_person.name;
    },
    removePerson(state, target_id) {
      state.people = state.people.filter(person => {
        return person.id !== target_id; 
      });

      console.log("removed person " + target_id);
    },
    addTask(state) {
      let task = {
        id: state.next_task_id, 
        name: ''
      }
      state.tasks.push(task);
      state.next_task_id++;
    },
    renameTask(state, target_task) {
      let target_index = state.tasks.findIndex(task => {
        return target_task.id === task.id; 
      });

      state.tasks[target_index].name = target_task.name;
    },
    removeTask(state, target_id) {
      state.tasks = state.tasks.filter(task => {
        return task.id !== target_id; 
      });

      console.log("removed task " + target_id);
    },
    setOccurrences(state, value) {
      state.occurrences = value;
    },
  }
});