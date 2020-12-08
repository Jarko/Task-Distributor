export default {
  name: 'plan',
  template: `
    <div class="plan">
      <h2 class="plan__title"> Plan</h2>
      <slot></slot>
      <div class="plan__occurences">
        <div v-for="(occurence, index) in plan" class="occurence">
          <div class="occurence__title">{{ index + 1}}</div>
          <div class="occurence__tasks">
            <div v-for="task in occurence" class="occurence__task">
              <div class="task">
                <div class="task__name">{{ task.task}}: </div>
                <div class="task__people">{{ task.person }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ['plan']
};