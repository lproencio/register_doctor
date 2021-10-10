<template>
  <div>
    <label for="">{{ title }}</label>
    <div class="input_value mt-2">
      <div class="col-2">R$</div>
      <Money class="col-10" v-model="value_money" v-bind="config" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Money3Component } from "v-money3";

export default defineComponent({
  components: { Money: Money3Component },
  props: { title: String, value: String },
  setup(props) {
    const value_money = ref(props.value);
    const config = {
      thousands: ".",
      decimal: ",",
      precision: 2,
    };

    return { config, value_money };
  },
});
</script>
