<template>
  <div class="type_payment">
    <div class="top" @click="select_payment(value)">
      <input type="checkbox" :value="value" v-model="payment_selecteds" />
      <label for="">{{ title }}</label>
    </div>
    <div class="portion" v-if="options.length > 0">
      <p>Parcelamento em</p>
      <div v-for="(item, i) in options" :key="i">
        <input type="radio" :value="item.value" v-model="selected" />
        <label for="">{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    title: String,
    value: { type: String, default: "" },
    options: Array,
    is_selected: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    interface payment {
      type: string;
      options: number | null;
    }

    const selected = ref<number | null>(null);
    const show_options = ref<boolean>(false);
    const payment_selecteds = ref<Array<string> | Array<unknown>>(
      props.is_selected
    );

    watch(selected, () => {
      emit("add_parcel", selected.value);
    });

    const select_payment = (value: string) => {
      const index = payment_selecteds.value.indexOf(value);
      show_options.value = !show_options.value;

      if (index > -1) {
        payment_selecteds.value.splice(index, 1);
        emit("remove_payment", value);

        return;
      }

      const add_payment: payment = { type: value, options: selected.value };

      payment_selecteds.value.push(value);

      emit("add_payment", add_payment);
    };

    return { selected, show_options, select_payment, payment_selecteds };
  },
});
</script>
