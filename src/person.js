import btn from './btn.js';

export default {
  name: 'person',
  components: {
    btn: btn
  },
  template: `
    <div class="person">
      <div class="person__edit">
        <input v-model="name" type="text" placeholder="Name"></input>
        <img class="delete" src="./resources/x-mark-32.png" v-on:click="removePerson()" />
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