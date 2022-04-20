<template>
  <FormProvider
    :form="form"
    :errors="errors"
    title="Array Binding"
    @submit="handleSubmit()"
  >
    <div class="label">What is your favorite color?</div>
    <div v-for="color in colors" :key="color" class="color">
      <label>
        <input type="checkbox" v-model="form.colors.$value" :value="color" />
        {{ color }}
      </label>
    </div>
    <ValidationErrors :errors="form.colors.$errors" />
    <SubmitButtons
      class="buttons"
      gap="2rem"
      @reset="resetFields()"
      :submitting="submitting"
    />
  </FormProvider>
</template>

<script>
import FormProvider from "../components/FormProvider.vue";
import SubmitButtons from "../components/SubmitButtons.vue";
import ValidationErrors from "../components/ValidationErrors";

import { min } from "../utils";
import { useValidation, ValidationError } from "vue3-form-validation";

export default {
  components: {
    FormProvider,
    SubmitButtons,
    ValidationErrors
  },
  setup() {
    const {
      form,
      errors,
      submitting,
      validateFields,
      resetFields
    } = useValidation({
      colors: {
        $value: [],
        $rules: [min(2)("Select at least 2 colors")]
      }
    });

    const handleSubmit = async () => {
      try {
        const formData = await validateFields();
        console.log(formData);
        alert(JSON.stringify(formData, null, 2));
      } catch (e) {
        if (e instanceof ValidationError) {
          console.log(e.message);
        }
      }
    };

    return {
      form,
      errors,
      validateFields,
      resetFields,
      submitting,
      handleSubmit
    };
  },
  data() {
    return {
      colors: ["Red", "Green", "Blue", "Yellow", "Black"]
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  margin: 30px 0 50px 0;
}

.color {
  margin: 1px 0;
}

.buttons {
  width: 40%;
  margin-top: 16px;
}
</style>