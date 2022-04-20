<template>
  <FormProvider
    :form="form"
    :errors="errors"
    title="Dynamic Rules"
    @submit="handleSubmit()"
  >
    <div class="container">
      <div>
        <label :for="form.name.$uid" class="label">Name</label>
        <BaseInput
          v-model="form.name.$value"
          :has-error="form.name.$hasError"
          @blur="form.name.$onBlur()"
          :id="form.name.$uid"
        />
        <ValidationErrors :errors="form.name.$errors" />
      </div>
      <div>
        <label :for="form.nickname.$uid" class="label">Nickname</label>
        <BaseInput
          v-model="form.nickname.$value"
          :has-error="form.nickname.$hasError"
          @blur="form.nickname.$onBlur()"
          :id="form.nickname.$uid"
        />
        <ValidationErrors :errors="form.nickname.$errors" />
      </div>
      <label>
        <input type="checkbox" v-model="nicknameRequired" />
        Nickname is required
      </label>
      <SubmitButtons
        class="buttons"
        gap="2rem"
        @reset="resetFields()"
        :submitting="submitting"
      />
    </div>
  </FormProvider>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import ValidationErrors from "../components/ValidationErrors.vue";
import FormProvider from "../components/FormProvider";
import SubmitButtons from "../components/SubmitButtons.vue";

import { ref } from "vue";
import { required } from "../utils";
import { useValidation, ValidationError } from "vue3-form-validation";

export default {
  components: {
    BaseInput,
    FormProvider,
    ValidationErrors,
    SubmitButtons
  },
  setup() {
    const nicknameRequired = ref(false);

    const {
      form,
      errors,
      submitting,
      validateFields,
      resetFields
    } = useValidation({
      name: {
        $value: "",
        $rules: [required("Name is required")]
      },
      nickname: {
        $value: "",
        $rules: [
          nickname =>
            nicknameRequired.value && required("Nickname is required")(nickname)
        ]
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
      nicknameRequired,
      handleSubmit,
      submitting,
      resetFields
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 30px 0 50px 0;
  display: grid;
  row-gap: 15px;
}

.buttons {
  margin-top: 1rem;
}
</style>