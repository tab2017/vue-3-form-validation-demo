<template>
  <FormProvider
    :form="form"
    :errors="errors"
    title="Dynamic Form"
    @submit="handleSubmit()"
  >
    <div class="field-a">
      <label :for="form.a.$uid" class="label">A</label>
      <div class="input-container">
        <BaseInput
          v-model="form.a.$value"
          :has-error="form.a.$hasError"
          :validating="form.a.$validating"
          @blur="form.a.$onBlur()"
          class="input"
          :id="form.a.$uid"
        />
        <PlusCircleIcon class="plus-icon" @click="addX" />
      </div>
      <ValidationErrors class="validation-errros" :errors="form.a.$errors" />
    </div>
    <template v-for="(x, i) in form.xs" :key="x.b.$uid">
      <div class="field-b">
        <label :for="x.b.$uid" class="label">B</label>
        <div class="input-container">
          <BaseInput
            v-model="x.b.$value"
            :has-error="x.b.$hasError"
            :validating="x.b.$validating"
            @blur="x.b.$onBlur()"
            class="input"
            :id="x.b.$uid"
          />
          <PlusCircleIcon class="plus-icon" @click="addY(i)" />
          <MinusCircleIcon class="minus-icon" @click="removeX(i)" />
        </div>
        <ValidationErrors class="validation-errros" :errors="x.b.$errors" />
      </div>
      <div v-for="(y, j) in x.ys" :key="y.c.$uid" class="field-c-d">
        <div class="field-c">
          <label :for="y.c.$uid" class="label">C</label>
          <BaseInput
            v-model="y.c.$value"
            :has-error="y.c.$hasError"
            :validating="y.c.$validating"
            @blur="y.c.$onBlur()"
            class="input"
            :id="y.c.$uid"
          />
          <ValidationErrors class="validation-errros" :errors="y.c.$errors" />
        </div>
        <div class="field-d">
          <label :for="y.d.$uid" class="label">D</label>
          <div class="input-container">
            <BaseInput
              v-model="y.d.$value"
              :has-error="y.d.$hasError"
              :validating="y.d.$validating"
              @blur="y.d.$onBlur()"
              class="input"
              :id="y.d.$uid"
            />
            <MinusCircleIcon class="minus-icon" @click="removeY(i, j)" />
          </div>
          <ValidationErrors class="validation-errros" :errors="y.d.$errors" />
        </div>
      </div>
    </template>

    <div class="names">
      <div class="label">Select Fields to Validiate</div>
      <div class="name-inputs">
        <div v-for="name in ['a', 'b', 'c', 'd']" :key="name">
          <label class="field-label">
            <input type="checkbox" v-model="selectedNames" :value="name" />
            {{ name }}
          </label>
        </div>
      </div>
    </div>

    <SubmitButtons
      class="buttons"
      gap="2rem"
      ratio="4:2"
      @reset="resetFields()"
      :submitting="submitting"
    />
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
import { required, randomPromise } from "../utils";
import { useValidation, ValidationError } from "vue3-form-validation";

export default {
  components: {
    BaseInput,
    SubmitButtons,
    FormProvider,
    MinusCircleIcon,
    PlusCircleIcon,
    ValidationErrors
  },
  setup() {
    const selectedNames = ref(["a", "b", "c", "d"]);
    const {
      form,
      submitting,
      errors,
      validateFields,
      resetFields,
      add,
      remove
    } = useValidation({
      a: {
        $value: "",
        $rules: [required("A is required"), randomPromise]
      },
      xs: []
    });

    const addX = () => {
      add(["xs"], {
        b: {
          $value: "",
          $rules: [required("B is required"), randomPromise]
        },
        ys: []
      });
    };

    const removeX = i => {
      remove(["xs", i]);
    };

    const addY = i => {
      add(["xs", i, "ys"], {
        c: {
          $value: "",
          $rules: [required("C is required"), randomPromise]
        },
        d: {
          $value: "",
          $rules: [required("D is required"), randomPromise]
        }
      });
    };

    const removeY = (i, j) => {
      remove(["xs", i, "ys", j]);
    };

    const handleSubmit = async () => {
      try {
        const formData = await validateFields(selectedNames.value);
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
      validateFields,
      resetFields,
      handleSubmit,
      addX,
      removeX,
      addY,
      removeY,
      selectedNames
    };
  }
};
</script>

<style lang="scss" scoped>
.validation-errros {
  margin-top: 0.25rem;
}

.input-container {
  display: grid;
  align-items: center;
  justify-items: end;
  grid-template-columns: 1fr 4rem 2rem;
  grid-template-areas: "input minus-icon plus-icon";
}

.input {
  width: 100%;
}

.plus-icon {
  grid-area: plus-icon;
}

.minus-icon {
  grid-area: minus-icon;
}

.field-b {
  margin-top: 3rem;
}

.field-c-d {
  display: grid;
  grid-auto-flow: column;
  gap: 0 2rem;
  margin-top: 1rem;
}

.names {
  margin: 2.5rem 0 1em 0;

  .name-inputs {
    display: flex;

    label {
      padding-right: 2rem;
      text-transform: uppercase;
    }
  }
}
</style>