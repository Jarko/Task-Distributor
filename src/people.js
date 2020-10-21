import input_name from './input-name.js';

export default {
  name: 'people',
  components: {
    'input-name': input_name
  },
  template: `
    <div class="people">
      <h2>People</h2>
      <transition-group name="name-list" class="name-list" tag="ul">
        <li v-for="person in people" :key="person.id" class="name-list__item">
          <input-name :item="person" add-label="Add Person" type="Person" @added="addPerson"></input-name>
        </li>
      </transition-group>
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