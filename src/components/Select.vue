<template>
  <div>
    <label for="">{{ title }}</label>
    <input placeholder="Selecione" :value="selected" />
    <div v-for="(item, i) in list" :key="i" @click="select(item)">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    title: String,
    list: Array,
    selected_option: { type: String, default: "" },
  },
  setup(props, { emit }) {
    const selected = ref<string>(props.selected_option);
    const select = (item: string) => {
      emit("selected", item);
      selected.value = item;
    };

    watch(props, () => {
      selected.value = props.selected_option;
    });

    return { select, selected };
  },
});
</script>
