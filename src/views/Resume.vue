<template>
  <div class="professional resume p-4 col-12">
    <h1 class="mb-4">Revisão do cadastro</h1>

    <div v-for="(item, i) in personal_show" :key="i">
      <label for="">{{ item.title }}</label>
      <p v-if="item.type !== 'state'">{{ professional_data[item.type] }}</p>
      <p v-else>
        {{
          professional_data[item.type] + " - " + professional_data[item.type_2]
        }}
      </p>
    </div>

    <div v-for="(item, i) in attendance_show" :key="i">
      <label for="">{{ item.title }}</label>
      <p v-if="item.type !== 'payment'">{{ attendance_data[item.type] }}</p>
      <p v-else>
        {{ attendance_data[item.type][0].type }}
        <span v-if="attendance_data[item.type][0].type == 'Cartão de crédito'"
          >Parcelamento em {{ attendance_data[item.type][0].options }}x sem
          juros</span
        >
      </p>
    </div>
    <Alert v-if="show_alert" />
    <button class="confirm col-12" @click="save" :disabled="validate_inputs">
      CADASTRAR PROFESSIONAL
    </button>

    <button class="edit" @click="edit">Editar cadastro</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Alert from "@/components/Alert.vue";

export default defineComponent({
  components: { Alert },
  setup() {
    const professional_data = ref({});
    const attendance_data = ref({ payment: [{ type: "", options: "" }] });
    const show_alert = ref(false);
    const router = useRouter();

    onMounted(() => {
      professional_data.value = JSON.parse(
        localStorage.getItem("personal_data") ?? "{}"
      );

      attendance_data.value = JSON.parse(
        localStorage.getItem("attendance_data") ?? "{}"
      );
    });

    const personal_show = [
      { title: "Nome Completo", type: "name" },
      { title: "CPF", type: "document" },
      { title: "Numero de celuar ou telefone", type: "phone" },
      { title: "Numero de celuar ou telefone", type: "phone" },
      { title: "Estado/Cidade", type: "state", type_2: "city" },
    ];
    const attendance_show = [
      { title: "Especialidade em geral", type: "speciality" },
      { title: "Preco da consulta", type: "value" },
      { title: "Formas de pagamento da consulta", type: "payment" },
    ];

    const edit = () => {
      router.push({ name: "professional" });
    };

    const save = () => {
      show_alert.value = true;
      setTimeout(() => {
        show_alert.value = false;
        localStorage.clear();
        edit();
      }, 1000);
    };

    return {
      personal_show,
      professional_data,
      attendance_data,
      attendance_show,
      edit,
      save,
      show_alert,
    };
  },
});
</script>
