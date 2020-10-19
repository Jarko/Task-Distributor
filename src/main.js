import store from './store.js';
import btn from './btn.js';
import tasks from './tasks.js';
import people from './people.js';
import plan from './plan.js';

new Vue({
  store,
  components: {
    btn: btn,
    tasks: tasks,
    people: people,
    plan: plan
  },
  template: `
    <div class="main">
      <h1>Task Distributor</h1>
      <people></people>
      <tasks></tasks>
      <h2>Number of occurrences</h2>
      <input  v-model="occurrences"/>
      <div class="calculate-btn">
        <btn v-on:click="createPlan()" label="Calculate"></btn>
      </div>
      <plan :plan="plan"></plan>
    </div>
  `,
  data: {
    occurrences: 0,
    plan: [],
    weighted_people: [],
    skipped_occurence_weight: 100,
    skipped_task_weight: 10
  },
  computed: {
    people() {
      return store.state.people;
    },
    filled_people() {
      return this.people.filter(person => {
        return person.name;
      });
    },
    tasks() {
      return store.state.tasks;
    },
    filled_tasks() {
      return this.tasks.filter(task => {
        return task.name;
      });
    },
    is_planned() {
      return this.plan ? true : false;
    }
  },

  methods: {
    createPlan() {
      let temp_plan = [];

      this.weighted_people = this.filled_people.map(person => {
        let temp_person = person;
        temp_person['tasks'] = [];
        this.filled_tasks.forEach(task => 
          temp_person['tasks'].push({id: task.id, weight: this.skipped_occurence_weight})
        );

        return temp_person;
      });

      for(let i = 0; i < this.occurrences; i++) {
        temp_plan.push(this.assignPeople());
      }

      this.plan = temp_plan;
    },

    assignPeople() {
      let occurence = [];
      let picked_people = [];

      this.filled_tasks.forEach((task, index) => {
        let picked_person = this.pickPerson(this.weighted_people, index, picked_people);
        picked_people.push(picked_person.id);

        occurence.push({name: task.name, person: picked_person.name});

        this.updateWeights(picked_person.id, index);

      });

      this.updateWeightsAll(picked_people);

      console.log(this.weighted_people);

      return occurence;
    },

    pickPerson(people, task_index, picked_ids = []) {
      let filtered_people = people.filter(person => {
        let picked = false;

        picked_ids.forEach(picked_id => {
          if (picked_id === person.id) {
            picked = true;
          }
        });

        return !picked;
      });
      console.log();
      let person = filtered_people.reduce((p, c) => {
        return p.tasks[task_index].weight > c.tasks[task_index].weight ? p : c;
      });

      return person;
    },

    //TODO The weights don't update correctly
    updateWeights(picked_id, task_index) {
      this.weighted_people.forEach((person, index) => {
        if(person.id == picked_id) {
          this.weighted_people[index].tasks[task_index].weight = 0;
        } else {
         this.weighted_people[index].tasks[task_index].weight += this.skipped_task_weight;
        }
      });
    },
    updateWeightsAll(picked_ids) {
      this.weighted_people.forEach((person, person_index) => {
        let has_task = picked_ids.find(id => id === person.id);
        if(!has_task) {
          this.filled_tasks.forEach((task, task_index) => {
            this.weighted_people[person_index].tasks[task_index].weight += this.skipped_occurence_weight;
          })
          
        }
      });
    }
  }
}).$mount('.container');