<template>
  <FormProvider
    :form="form"
    :errors="errors"
    title="Dynamic Object Binding"
    @submit="handleSubmit()"
  >
    <div class="container">
      <div>
        <label :for="form.static1.$uid" class="label">Static Field</label>
        <BaseInput
          v-model="form.static1.$value"
          :has-error="form.static1.$hasError"
          :id="form.static1.$uid"
        />
        <ValidationErrors :errors="form.static1.$errors" />
      </div>
      <div v-for="field in dynamicFields" :key="field.key">
        <template v-if="form[field.key] === undefined">
          <PlusCircleIcon class="plus-icon" @click="addField(field)" />
        </template>
        <template v-else>
          <div>
            <div class="label label-container">
              <label :for="form[field.key].$uid">
                {{ field.label }}
              </label>
              <MinusCircleIcon class="minus-icon" @click="removeField(field)" />
            </div>

            <BaseInput
              v-model="form[field.key].$value"
              :has-error="form[field.key].$hasError"
              :id="form[field.key].$uid"
            />
            <ValidationErrors :errors="form[field.key].$errors" />
          </div>
        </template>
      </div>
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
import FormProvider from "../components/FormProvider.vue";
import BaseInput from "../components/BaseInput.vue";
import SubmitButtons from "../components/SubmitButtons.vue";
import ValidationErrors from "../components/ValidationErrors";
import MinusCircleIcon from "../components/icons/MinusCircleIcon.vue";
import PlusCircleIcon from "../components/icons/PlusCircleIcon.vue";

import { ref } from "vue";
import { useValidation, ValidationError } from "vue3-form-validation";
import { required } from "../utils";

export default {
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors,
    PlusCircleIcon,
    MinusCircleIcon
  },
  setup() {
    const {
      form,
      errors,
      submitting,
      validateFields,
      resetFields,
      add,
      remove
    } = useValidation({
      static1: {
        $value: "",
        $rules: [required("Static Field is required")]
      }
    });

    const addField = ({ key, label }) => {
      add([key], {
        $value: "",
        $rules: [required(`${label} is required`)]
      });
    };

    const removeField = ({ key }) => {
      remove([key]);
    };

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
      submitting,
      addField,
      removeField,
      handleSubmit,
      resetFields,
      dynamicFields: ref([
        { key: "dynamic1", label: "Dynamic Field 1" },
        { key: "dynamic2", label: "Dynamic Field 2" }
      ])
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../colors.scss";

.container {
  display: grid;
  row-gap: 1.5rem;
}

.label-container {
  display: flex;
  align-items: center;

  & .minus-icon {
    margin-left: 1.5rem;
  }
}

.buttons {
  margin-top: 1.5rem;
}
</style>