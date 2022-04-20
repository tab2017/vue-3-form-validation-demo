<template>
  <FormProvider
    :form="form"
    :errors="errors"
    title="Register Form"
    @submit="handleSubmit()"
  >
    <div class="container">
      <div class="name">
        <label :for="form.name.$uid" class="label">Name</label>
        <BaseInput
          v-model="form.name.$value"
          :has-error="form.name.$hasError"
          :validating="form.name.$validating"
          @blur="form.name.$onBlur()"
          placeholder="Alice, Bob, Oscar"
          :id="form.name.$uid"
        />
        <ValidationErrors
          class="validation-errros"
          :errors="form.name.$errors"
        />
      </div>
      <div class="email">
        <label :for="form.email.$uid" class="label">Email address</label>
        <BaseInput
          v-model="form.email.$value"
          :has-error="form.email.$hasError"
          @blur="form.email.$onBlur()"
          label="Email address"
          :id="form.email.$uid"
        />
        <ValidationErrors :errors="form.email.$errors" />
      </div>
      <div class="password">
        <label :for="form.password.$uid" class="label">Password</label>
        <BaseInput
          v-model="form.password.$value"
          :has-error="form.password.$hasError"
          @blur="form.password.$onBlur()"
          type="password"
          :id="form.password.$uid"
        />
        <ValidationErrors :errors="form.password.$errors" />
      </div>
      <div class="confirm-password">
        <label :for="form.confirmPassword.$uid" class="label">
          Confirm Password
        </label>
        <BaseInput
          v-model="form.confirmPassword.$value"
          :has-error="form.confirmPassword.$hasError"
          @blur="form.confirmPassword.$onBlur()"
          type="password"
          :id="form.confirmPassword.$uid"
        />
        <ValidationErrors :errors="form.confirmPassword.$errors" />
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
import FormProvider from "@/components/FormProvider.vue";
import BaseInput from "@/components/BaseInput.vue";
import SubmitButtons from "@/components/SubmitButtons.vue";
import ValidationErrors from "@/components/ValidationErrors";

import { useValidation, ValidationError } from "vue3-form-validation";
import { required, min, email, equal } from "../utils";

export default {
  components: {
    BaseInput,
    ValidationErrors,
    SubmitButtons,
    FormProvider
  },
  setup() {
    const {
      form,
      errors,
      submitting,
      validateFields,
      resetFields
    } = useValidation({
      name: {
        $value: "",
        $rules: [
          required("Name is required"),
          min(3)("Name has to be longer than 2 characters"),
          name =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (["alice", "bob", "oscar"].includes(name.toLowerCase())) {
                  resolve();
                } else {
                  // Resolve or reject with a string
                  reject("This name is already taken");
                }
              }, 2000);
            })
        ]
      },
      email: {
        $value: "",
        $rules: [email("Please enter a valid email address")]
      },
      password: {
        $value: "",
        $rules: [
          min(8)("Password has to be longer than 7 characters"),
          {
            key: "pw",
            rule: equal("Passwords do not match")
          }
        ]
      },
      confirmPassword: {
        $value: "",
        $rules: [
          min(8)("Password has to be longer than 7 characters"),
          {
            key: "pw",
            rule: equal("Passwords do not match")
          }
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
      submitting,
      resetFields,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.container {
  display: grid;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "name email"
    "password password"
    "confirm-password confirm-password"
    "buttons buttons";
}

.buttons {
  margin-top: 1.25rem;
  grid-area: buttons;
}

.name {
  grid-area: name;
}

.email {
  grid-area: email;
}

.password {
  grid-area: password;
}

.confirm-password {
  grid-area: confirm-password;
}
</style>