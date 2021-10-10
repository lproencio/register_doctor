<template>
  <div class="type_payment">
    <div class="top" @click="select_payment(value)">
      <input type="checkbox" :value="value" v-model="payment_selecteds" />
      <label for="">{{ title }}</label>
    </div>
    <div class="portion" v-if="options.length > 0 && show_options">
      <p>Parcelamento em</p>
      <div v-for="(item, i) in options" :key="i">
        <input type="radio" :value="item.value" v-model="selected" />
        <label for="">{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: { title: String, value: String, options: Array },
  setup() {
    const selected = ref<number | null>(null);
    const show_options = ref<boolean>(false);
    const payment_selecteds = ref<Array<string>>([]);

    const select_payment = (value: string) => {
      const index = payment_selecteds.value.indexOf(value);
      show_options.value = !show_options.value;

      if (index > -1) {
        payment_selecteds.value.splice(index, 1);
        return;
      }

      payment_selecteds.value.push(value);
    };

    return { selected, show_options, select_payment, payment_selecteds };
  },
});
</script>
