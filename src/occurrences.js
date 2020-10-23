export default {  
  name: 'occurrences',
  template: `
    <div class="occurrences">
      <button class="increment-btn increment-btn--left" @click="modify(-5)">-5</button>
      <button class="increment-btn" @click="modify(-1)">-</button>
      <input class="occurrences__input" v-model="occurrences"/>
      <button class="increment-btn" @click="modify(1)">+</button>
      <button class="increment-btn increment-btn--right" @click="modify(5)">+5</button>
    </div>
  `,

  computed: {
    occurrences: {
      get () {
        return this.$store.state.occurrences;
      },
      set (value) {
        this.$store.commit('setOccurrences', value);
      }
    }
  },
  methods: {
    modify (value) {
      if(this.occurrences + value < 0) {
        this.occurrences = 0;
      } else {
        this.occurrences += value;
      }
    }
  }
};