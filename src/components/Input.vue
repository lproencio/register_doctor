<template>
  <div class="input">
    <label for="" class="mt-3 pb-1">{{ label }}</label>
    <input
      class="col-12"
      :type="type"
      :value="value"
      @input="onInput"
      :placeholder="placeholder"
      :class="[{ 'border-danger': error }, { 'border-danger': !is_valid }]"
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
    const is_valid = ref<boolean>(true);
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
        emit("is_valid", true);
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

      is_valid.value = validator_cpf(remove_symbol);
      emit("is_valid", !is_valid.value);
    };

    const validate_phone = (value: string | undefined) => {
      if (!value) {
        return;
      }
      const is_valid = value.length >= 16;

      emit("is_valid", is_valid);
    };

    const validate = (type: string | undefined, value: string | undefined) => {
      if (type === "name") {
        validate_name(value);
      }
      if (type === "cpf") {
        validate_cpf(value);
      }

      if (type === "phone") {
        validate_phone(value);
      }
    };

    const onInput = (e: { target: HTMLInputElement }) => {
      emit("update:value", e.target.value);

      validate(props.validation, e.target.value);
    };

    return { error, onInput, type_mask, is_valid };
  },
});
</script>
