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
      <transition name="fade">
        <div v-if="is_added" class="input-name__edit">
          <div class="input-name__name">
            <input v-model="name" placeholder="Name" :ref="input_ref"></input>
          </div>
          <transition name="weight-toggle">
            <div v-if="show_weights" class="input-name__weight">
              <input v-model.number="weight" placeholder="Weight"></input>
            </div>
          </transition>
          <delete-btn @click="remove()"></delete-btn>
        </div>
      </transition>
      <transition name="fade-add">
        <div v-if="!is_added" class="input-name__add">
          <add-btn @click="added" :label="addLabel"></add-btn>
        </div>
      </transition>
    </div>
  `,

  props: ['item','addLabel', 'type', 'useWeights'],
  data () {
    return {
      is_added: false,
      input_ref: 'input-name-' + this.item.id, 
    };
  },
  computed: {
    name: {
      get () {
        return this.item.name;
      },
      set (value) {
        this.$store.commit('update' + this.type, {id: this.item.id, name: value, weight: this.weight});
      }
    },
    weight: {
      get () {
        return this.item.weight;
      },
      set (value) {
        this.$store.commit('update' + this.type, {id: this.item.id, name: this.name, weight: value});
      }
    },
    show_weights () {
      return this.useWeights && this.$store.state.is_weighted;
    }
  },
  methods: {
    remove () {
      this.$store.commit('remove' + this.type, this.item.id);
    },
    added () {
      this.is_added = true;
      this.$emit('added');

      this.$nextTick(() => {
        this.$refs[this.input_ref].focus();
      });
    } 
  }
};