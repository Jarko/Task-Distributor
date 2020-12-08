import store from './store.js';
import btn from './btn.js';
import toggle from './toggle.js';
import tasks from './tasks.js';
import people from './people.js';
import occurrences from './occurrences.js';
import plan from './plan.js';

new Vue({
  store,
  components: {
    btn: btn,
    toggle: toggle,
    tasks: tasks,
    people: people,
    occurrences: occurrences,
    plan: plan
  },
  template: `
    <div class="container">
      <h1>Task Distributor</h1>
      <toggle label="Use Weighted Tasks" :info="weight_info" @on="setWeigthed(true)" @off="setWeigthed(false)"></toggle>
      <div class="list-container">
        <people></people>
        <tasks></tasks>
      </div>
      <h2>Number of occurrences</h2>
      <occurrences :minOccurrences="min_occurrences"></occurrences>
      <plan :plan="plan">
        <div class="calculate-btn">
          <btn v-on:click="createPlan()" label="Calculate" :isDisabled="!can_submit"></btn>
        </div>
      </plan>
    </div>
  `,
  data: {
    plan: [],
    weighted_people: [],
    skipped_occurence_weight: 100,
    skipped_task_weight: 10,
    weight_info: "Use this option when tasks are not of the same complexcity, price etc. This ensures a fair balance."
  },
  computed: {
    is_weighted () {
      return this.$store.state.is_weighted;
    },
    people () {
      return store.state.people;
    },
    filled_people () {
      return this.people.filter(person => {
        return person.name;
      });
    },
    tasks () {
      return store.state.tasks;
    },
    filled_tasks () {
      return this.tasks.filter(task => {
        return task.name;
      });
    },
    occurrences () {
      return store.state.occurrences;
    },
    min_occurrences () {
      return this.filled_people.length;
    },
    can_submit () {
      return this.filled_people.length > 0 && this.filled_tasks.length > 0;
    },
    is_planned () {
      return this.plan ? true : false;
    }
  },

  methods: {
    setWeigthed (isOn) {
      this.$store.commit('setWeighted', isOn);
    },
    createPlan () {
      let temp_plan = [];

      if(!this.is_weighted) {
        temp_plan = this.createUnweightedPlan();
      } else {
        temp_plan = this.createWeightedPlan();
      }

      this.plan = temp_plan;
    },
    createUnweightedPlan () {
      let plan = [];
      let cur_person = 0;

      for(let i = 0; i < this.occurrences; i++) {
        let occurrence = [];

        this.filled_tasks.forEach(task => {
          occurrence.push({task: task.name, person: this.filled_people[cur_person].name})

          if(cur_person < this.filled_people.length - 1) {
            cur_person++;
          } else{
            cur_person = 0;
          }
        });

        plan.push(occurrence);
      }

      return plan;
    },
    createWeightedPlan () {
      let plan = [];
      let summed_weights = 0;

      // Sum the total value of all weights
      this.filled_tasks.forEach(task => 
        summed_weights += task.weight
      );

      // Create a list of people with tasks
      this.createWeightedPeople(summed_weights);

      let reset_timer = 0;

      // Assign people to tasks for each occurence
      for(let i = 1; i <= this.occurrences; i++) {
        // Once the unique pattern has been done, reset the list of people
        if (reset_timer === this.min_occurrences) {
          this.createWeightedPeople(summed_weights);

          reset_timer = 0
        }
        reset_timer++;

        plan.push(this.assignPeople());
      }

      return plan;
    },
    createWeightedPeople (summed_weights) {
      this.weighted_people = [];

      this.filled_people.forEach(person => {
        let temp_person = person;
        temp_person['weight_left'] = summed_weights;
        temp_person['tasks'] = [];

        // Populate with tasks, and set all tasks to uncompleted
        this.filled_tasks.forEach(task => 
          temp_person.tasks[task.id] = false
        );

        this.weighted_people[temp_person.id] = temp_person;
      });
    },
    assignPeople () {
      let occurence = [];

      // The algorithm requires the tasks to be sorted by weight for the calculations. 
      let tasks = this.filled_tasks.sort((a, b) => a.weight - b.weight).reverse();  
      tasks.forEach((task) => {
        let picked_person = this.weighted_people.reduce((a, b) => {
          // If a has already done this task, return b.
          if (a.tasks[task.id]) {
            return b;
          }

          // Pick the person who has done the least tasks in weight.
          return a.weight_left > b.weight_left ? a : b;
        });

        occurence.push({task_id: task.id, task: task.name, person: picked_person.name});

        // Set the task as completed for the picked person, and reduce weight left.
        this.weighted_people[picked_person.id].tasks[task.id] = true;
        this.weighted_people[picked_person.id].weight_left -= task.weight;

      });

      // Unsort the tasks beforer returning them
      return occurence.sort((a, b) => a.task_id - b.task_id);
    },
  }
}).$mount('.container');