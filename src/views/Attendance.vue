<template>
  <div class="professional attendance p-4 col-12">
    <h1>Sobre o atendimento</h1>
    <h2>Detalhes do atendimento</h2>
    <Select
      title="Especialidade principal*"
      :list="speciality"
      @selected="select"
      :selected_option="select_speciality"
      class="col-12"
    />
    <InputValue
      class="mt-4"
      title="Informe o preço da sonsulta*"
      v-model:value="consult_value"
      @update_value="update_value"
    />
    <div class="mt-4" v-for="(payment, i) in payment_type" :key="i">
      <TypePayment
        :title="payment"
        :value="payment"
        :options="payment_options[payment]"
        :is_selected="is_selected"
        @add_payment="add_payment"
        @remove_payment="remove_payment"
        @add_parcel="add_parcel"
      />
    </div>
    <Progress :current="2" :total="2" />
    <button class="col-12" @click="save" :disabled="valid_button">
      PRÓXIMO
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import Select from "@/components/Select.vue";
import Progress from "@/components/Progress.vue";
import InputValue from "@/components/InputValue.vue";
import TypePayment from "@/components/TypePayment.vue";

export default defineComponent({
  components: {
    Select,
    Progress,
    InputValue,
    TypePayment,
  },
  setup() {
    interface payment {
      type: string;
      options: number | null;
    }

    const router = useRouter();

    const speciality = ref([
      "Cardiologia",
      "Dermatologia",
      "Neurologia",
      "Oftalmologia",
      "Psiquiatria",
      "Urologia",
    ]);

    const payment_type = ref<Array<string>>([]);
    const payment_options = ref({
      "Em dinheiro": [],
      Pix: [],
      "Cartão de crédito": [
        { value: 1, label: "1x sem juros" },
        { value: 2, label: "2x sem juros" },
        { value: 3, label: "3x sem juros" },
      ],
    });

    const select_speciality = ref<string>("");
    const consult_value = ref<string>("");
    const selected_payments = ref<Array<payment>>([]);

    const select = (speciality: string) => {
      select_speciality.value = speciality;
    };

    const update_value = (value: string) => {
      consult_value.value = value;
    };

    const add_payment = (payment: payment) => {
      selected_payments.value.push(payment);
    };

    const remove_payment = (type: string) => {
      const filter_payment = selected_payments.value.filter((payment) => {
        return payment.type !== type;
      });

      selected_payments.value = filter_payment;
    };

    const add_parcel = (type: number) => {
      const add = selected_payments.value.map((payment) => {
        if (payment.type === "Cartão de crédito") {
          payment.options = type;
        }
        return payment;
      });

      selected_payments.value = add;
    };

    const valid_button = computed(() => {
      return !(
        select_speciality.value.length > 0 &&
        consult_value.value.length > 0 &&
        selected_payments.value.length > 0
      );
    });

    const save = () => {
      const attendance_data = {
        speciality: select_speciality.value,
        value: consult_value.value,
        payment: selected_payments.value,
      };

      localStorage.setItem("attendance_data", JSON.stringify(attendance_data));

      router.push({ name: "resume" });
    };

    const is_selected = computed(() => {
      const attendance_data = JSON.parse(
        localStorage.getItem("attendance_data") ?? "{}"
      );

      if (!attendance_data.speciality) {
        return [];
      }

      const payment = attendance_data.payment.map((pay: payment) => {
        return pay.type;
      });

      return payment;
    });

    onMounted(() => {
      const attendance_data = JSON.parse(
        localStorage.getItem("attendance_data") ?? "{}"
      );

      if (attendance_data.speciality) {
        select_speciality.value = attendance_data.speciality;
        consult_value.value = attendance_data.value;
        selected_payments.value = attendance_data.payment;
      }
      payment_type.value = ["Em dinheiro", "Pix", "Cartão de crédito"];
    });

    return {
      speciality,
      select_speciality,
      select,
      consult_value,
      update_value,
      payment_type,
      payment_options,
      add_payment,
      remove_payment,
      add_parcel,
      save,
      valid_button,
      is_selected,
    };
  },
});
</script>
