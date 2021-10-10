<template>
  <div class="select mt-4">
    <label for="">{{ title }}</label>
    <input
      type="input"
      class="col-12 mt-2"
      placeholder="Selecione"
      :value="selected"
      @click="is_open = !is_open"
    />
    <div class="options" v-show="is_open">
      <p
        v-for="(item, i) in list"
        :key="i"
        @click="select(item), (is_open = !is_open)"
      >
        {{ item }}
      </p>
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
    const is_open = ref<boolean>(false);
    const selected = ref<string>(props.selected_option);

    const select = (item: string) => {
      emit("selected", item);
      selected.value = item;
    };

    watch(props, () => {
      selected.value = props.selected_option;
    });

    return { select, selected, is_open };
  },
});
</script>
