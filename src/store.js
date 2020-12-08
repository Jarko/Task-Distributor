export default new Vuex.Store({
  state: {
    next_person_id: 2,
    next_task_id: 2,
    people: [{id: 1, name: '', weight: 10}],
    tasks: [{id: 1, name: '', weight: 10}],
    occurrences: 1,
    is_weighted: false
  },
  mutations: {
    setWeighted (state, value) {
      state.is_weighted = value;
    },
    addPerson (state) {
      let person = {
        id: state.next_person_id,
        name: '',
        weight: 10
      }

      state.people.push(person);
      state.next_person_id++;
    },
    updatePerson (state, target_person) {
      let target_index = state.people.findIndex(person => {
        return target_person.id === person.id; 
      });

      state.people[target_index].name = target_person.name;
      state.people[target_index].weight = target_person.weight;
    },
    removePerson (state, target_id) {
      state.people = state.people.filter(person => {
        return person.id !== target_id; 
      });

      console.log("removed person " + target_id);
    },
    addTask (state) {
      let task = {
        id: state.next_task_id, 
        name: '',
        weight: 10
      }
      state.tasks.push(task);
      state.next_task_id++;
    },
    updateTask (state, target_task) {
      let target_index = state.tasks.findIndex(task => {
        return target_task.id === task.id; 
      });

      state.tasks[target_index].name = target_task.name;
      state.tasks[target_index].weight = target_task.weight;
    },
    removeTask (state, target_id) {
      state.tasks = state.tasks.filter(task => {
        return task.id !== target_id; 
      });

      console.log("removed task " + target_id);
    },
    setOccurrences (state, value) {
      state.occurrences = value;
    },
  }
});