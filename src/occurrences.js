export default {  
  name: 'occurrences',
  template: `
    <div class="occurrences">
      <div class="occurrences__container">
        <button class="increment-btn increment-btn--left" :class="{ 'increment-btn--disabled': !can_decrement }" @click="modify(-5)">-5</button>
        <button class="increment-btn" :class="{ 'increment-btn--disabled': !can_decrement }" @click="modify(-1)">-</button>
        <input class="occurrences__input" v-model.number="occurrences"/>
        <button class="increment-btn" @click="modify(1)">+</button>
        <button class="increment-btn increment-btn--right" @click="modify(5)">+5</button>
      </div>
      <div class="info">Minimum number of occurrences needed for unique pattern: {{ minOccurrences }}</div>
    </div>
  `,

  props: ['minOccurrences'],
  computed: {
    occurrences: {
      get () {
        return this.$store.state.occurrences;
      },
      set (value) {
        this.$store.commit('setOccurrences', value);
      }
    },
    can_decrement () {
      return this.occurrences > 1;
    }
  },
  methods: {
    modify (value) {
      if(this.occurrences + value < 1) {
        this.occurrences = 1;
      } else {
        this.occurrences += value;
      }
    }
  }
};