<template>
  <div>
    <label for="">{{ title }}</label>
    <div class="input_value mt-2">
      <div class="col-2">R$</div>
      <Money
        class="col-10"
        v-model="value_money"
        v-bind="config"
        @input="input_value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Money3Component } from "v-money3";

export default defineComponent({
  components: { Money: Money3Component },
  props: { title: String, value: String },
  setup(props, { emit }) {
    const value_money = ref(props.value);
    const config = {
      thousands: ".",
      decimal: ",",
      precision: 2,
    };

    const input_value = (e: { target: HTMLInputElement }) => {
      emit("update_value", e.target.value);
    };

    watch(props, () => {
      value_money.value = props.value;
    });

    return { config, value_money, input_value };
  },
});
</script>
