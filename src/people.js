import btn from './btn.js';
import person from './person.js';

export default {
  name: 'people',
  components: {
    btn: btn,
    person: person
  },
  template: `
    <div class="people">
      <h2>People</h2>
      <ul>
        <li v-for="person in people" :key="person.id">
          <person :person="person"></person>
        </li>
      </ul>
      <btn v-on:click="addPerson()" label="Add Person"></btn>
    </div>
  `,
  computed: {
    people () {
      return this.$store.state.people;
    },
  },
  methods: {
    addPerson () {
      this.$store.commit('addPerson');
    },
  }
};