export default {
  name: 'plan',
  template: `
    <div class="plan">
      <h2 class="plan__title"> Plan</h2>
      <div class="plan__occurences">
        <div v-for="(occurence, index) in plan" class="occurence">
          <div class="occurence__title">{{index + 1}}:</div>
          <div v-for="task in occurence" class="occurence-task">
            <div class="task">{{task.name + ': ' + task.person }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ['plan']
};