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
    tasks() {
      return store.state.tasks;
    },
    is_planned() {
      return this.plan ? true : false;
    }
  },

  methods: {
    createPlan() {
      let temp_plan = [];

      this.weighted_people = this.people.map(person => {
        let temp_person = person;
        temp_person['tasks'] = [];
        this.tasks.forEach(task => 
          temp_person['tasks'].push({id: task.id, weight: this.skipped_occurence_weight})
        );

        console.log(temp_person);
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

      this.tasks.forEach(task => {
        let picked_person = this.pickPerson(this.weighted_people, task.id, picked_people);
        picked_people.push(picked_person.id);

        occurence.push({name: task.name, person: picked_person.name});

        this.updateWeights(picked_person.id, task.id);

      });

      this.updateWeightsAll(picked_people);

      console.log(this.weighted_people);

      return occurence;
    },

    pickPerson(people, task_id, picked_ids = []) {
      let filtered_people = people.filter(person => {
        let picked = false;

        picked_ids.forEach(picked_id => {
          if (picked_id === person.id) {
            picked = true;
          }
        });

        return !picked;
      });
      console.log('Filtered');
      console.log(filtered_people);
      let person = filtered_people.reduce((p, c) => p.tasks[task_id - 1].weight > c.tasks[task_id - 1].weight ? p : c);
      console.log('Chose: ' + person.name);

      return person;
    },

    //TODO The weights don't update correctly
    updateWeights(picked_id, task_id) {
      this.weighted_people.forEach(person => {
        if(person.id == picked_id) {
          this.weighted_people[person.id - 1].tasks[task_id - 1].weight = 0;
        } else {
         this.weighted_people[person.id - 1].tasks[task_id - 1].weight += this.skipped_task_weight;
        }
      });
    },
    updateWeightsAll(picked_ids) {
      this.weighted_people.forEach(person => {
        let has_task = picked_ids.find(id => id === person.id);
        console.log(person.name + ' has task? ' + has_task);
        if(!has_task) {
          this.tasks.forEach(task => {
            this.weighted_people[person.id - 1].tasks[task.id - 1].weight += this.skipped_occurence_weight;
          })
          
        }
      });
    }
  }
}).$mount('.container');