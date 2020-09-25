import btn from './btn.js';

export default {
  name: 'person',
  components: {
    btn: btn
  },
  template: `
    <div class="person">
      <div v-show="!is_editing">{{ person.name }}</div>
      <div v-show="is_editing" class="person__edit">
        <input v-model="name" type="text" placeholder="Name"></input>
        <btn v-on:click="renamePerson()" label="Accept"></btn>
      </div>
    </div>
  `,

  props: ['person'],
  data () {
    return {
      is_editing: true,
      name: '',
    };
  },
  mounted () {
    this.name = this.person.name;
  },
  methods: {
    renamePerson () {
      this.$store.commit('renamePerson', {id: this.person.id, name: this.name});
      this.is_editing = false;
    }
  }
};