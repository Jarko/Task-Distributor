import delete_btn from './delete.js';

export default {
  name: 'person',
  components: {
    "delete-btn": delete_btn
  },
  template: `
    <div class="person">
      <div class="person__edit">
        <input v-model="name" type="text" placeholder="Name"></input>
        <delete-btn @click="removePerson()"></delete-btn>
      </div>
    </div>
  `,

  props: ['person'],
  data () {
    return {
      name: '',
    };
  },
  mounted () {
    this.name = this.person.name;
  },
  methods: {
    removePerson () {
      this.$store.commit('removePerson', this.person.id);
    }
  }
};