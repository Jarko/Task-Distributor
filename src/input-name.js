import add_btn from './add-btn.js';
import delete_btn from './delete.js';

export default {
  name: 'input-name',
  components: {
    "delete-btn": delete_btn,
    "add-btn": add_btn
  },
  template: `
    <div class="input-name">
      <div v-show="is_added" class="input-name__edit">
        <input v-model="name" type="text" placeholder="Name"></input>
        <delete-btn @click="removePerson()"></delete-btn>
      </div>
      <div v-show="!is_added" class="input-name__add">
        <add-btn @click="added" :label="addLabel"></add-btn>
      </div>
    </div>
  `,

  props: ['item','addLabel', 'type'],
  data: () => {
    return {
      is_added: false
    };
  },
  computed: {
    name: {
      get () {
        return this.item.name;
      },
      set (name) {
        this.$store.commit('rename' + this.type, {id: this.item.id, name: name});
      }
    }
  },
  methods: {
    removePerson () {
      this.$store.commit('remove' + this.type, this.item.id);
    },
    added () {
      this.is_added = true;
      this.$emit('added');
    } 
  }
};