<template>
  <div class="input">
    <label for="">{{ label }}</label>
    <input
      :type="type"
      :value="value"
      @input="onInput"
      :placeholder="placeholder"
      :class="{ 'border-danger': error }"
      v-maska="type_mask[validation]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import validator_cpf from "../helpers/validator_cpf";

export default defineComponent({
  name: "Input",
  props: {
    type: String,
    label: String,
    value: { type: String, default: "" },
    validation: String,
    placeholder: String,
  },

  setup(props, { emit }) {
    interface mask {
      cpf: string;
      phone: string;
    }

    const error = ref<boolean>(false);
    const type_mask = ref<mask>({
      cpf: "###.###.###-##",
      phone: "(##) # ####-####",
    });

    const validate_name = (value: string | undefined) => {
      if (!value) {
        return;
      }

      if (value.length > 3 && value.length <= 48) {
        error.value = false;
      } else {
        error.value = true;
      }
    };

    const validate_cpf = (value: string | undefined) => {
      if (!value) {
        return;
      }
      const remove_symbol = value
        .replace(".", "")
        .replace("-", "")
        .replace(".", "");

      const is_valid = validator_cpf(remove_symbol);
      console.log(is_valid);
    };

    const validate = (type: string | undefined, value: string | undefined) => {
      if (type === "name") {
        validate_name(value);
      }
      if (type === "cpf") {
        validate_cpf(value);
      }
    };

    const onInput = (e: { target: HTMLInputElement }) => {
      emit("update:value", e.target.value);

      validate(props.validation, e.target.value);
    };

    return { error, onInput, type_mask };
  },
});
</script>
