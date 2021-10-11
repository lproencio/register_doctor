<template>
  <div class="professional col-lg-10 p-4">
    <div class="col-lg-5">
      <h1>Sobre o profissional</h1>
      <h2>Detalhes do Professional</h2>
      <div v-for="(item, i) in inputs_type" :key="i">
        <Input
          :type="item.type"
          :label="item.label"
          v-model:value="item.value"
          :placeholder="item.placeholder"
          :validation="item.validation"
          @is_valid="is_valid_input(i, $event)"
        />
      </div>
      <div class="region d-flex">
        <Select
          title="Estado*"
          :list="states"
          @selected="select_state"
          :selected_option="selected_state"
          class="col-6 pe-2"
        />
        <Select
          class="col-6 ps-2"
          title="Cidade*"
          :list="cities[selected_state]"
          @selected="select_city"
          :selected_option="selected_city"
        />
      </div>
      <Progress :current="1" :total="2" />
      <button class="col-12" @click="save" :disabled="validate_inputs">
        PRÓXIMO
      </button>
    </div>

    <div
      class="d-none col-7 d-lg-flex justify-content-center align-items-center"
    >
      <img :src="require('@/assets/desktop-pagina-1.png')" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import Progress from "@/components/Progress.vue";

export default defineComponent({
  name: "Professional",
  components: { Input, Select, Progress },
  setup() {
    interface personal {
      name: string;
      document: string;
      phone: string;
      state: string;
      city: string;
    }
    const router = useRouter();

    const inputs_type = ref([
      {
        type: "text",
        label: "Nome Completo*",
        value: "",
        validation: "name",
        placeholder: "Digite o nome completo",
        is_valid: false,
      },
      {
        type: "text",
        label: "CPF*",
        value: "",
        validation: "cpf",
        placeholder: "Digite um CPF",
        is_valid: false,
      },
      {
        type: "text",
        label: "Número de Celular*",
        value: "",
        validation: "phone",
        placeholder: "(00) 0 0000-0000",
        is_valid: false,
      },
    ]);

    const states = ref(["Paraná", "Rio Grande do Sul", "Santa Cataria"]);

    const cities = ref({
      Paraná: ["Londrina", "Maringá"],
      "Rio Grande do Sul": ["Pelotas", "Porto Alegre"],
      "Santa Cataria": ["Florianópolis", "Joinville"],
    });

    const selected_state = ref("");
    const selected_city = ref("");

    const select_state = (state: string) => {
      selected_state.value = state;
      selected_city.value = "";
    };

    const select_city = (city: string) => {
      selected_city.value = city;
    };

    const is_valid_input = (index: number, is_valid: boolean) => {
      inputs_type.value[index].is_valid = is_valid;
    };

    const validate_inputs = computed(() => {
      const valid = inputs_type.value.map((input) => {
        return input.is_valid;
      });

      return !(
        valid.includes(false) &&
        selected_state.value.length > 0 &&
        selected_city.value.length > 0
      );
    });

    const save = () => {
      const data = {
        name: inputs_type.value[0].value,
        document: inputs_type.value[1].value,
        phone: inputs_type.value[2].value,
        state: selected_state.value,
        city: selected_city.value,
      };

      localStorage.setItem("personal_data", JSON.stringify(data));

      router.push({ name: "attendance" });
    };

    const set_values = (personal_data: personal) => {
      inputs_type.value[0].value = personal_data.name;
      inputs_type.value[1].value = personal_data.document;
      inputs_type.value[2].value = personal_data.phone;
      selected_state.value = personal_data.state;
      selected_city.value = personal_data.city;
    };

    const personal_data = JSON.parse(
      localStorage.getItem("personal_data") || "{}"
    );

    onMounted(() => {
      if (personal_data.name) {
        set_values(personal_data);
      }
    });

    return {
      inputs_type,
      states,
      cities,
      selected_state,
      selected_city,
      select_state,
      select_city,
      is_valid_input,
      validate_inputs,
      save,
    };
  },
});
</script>
