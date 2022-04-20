<template>
  <FormProvider
    :form="form"
    :errors="errors"
    title="Event Form (with async initial values)"
    @submit="handleSubmit()"
  >
    <div>
      <label :for="form.title.$uid" class="label">Event Title</label>
      <BaseInput
        v-model="form.title.$value"
        :placeholder="loading ? 'Loading . . .' : null"
        :disabled="loading"
        :validating="loading"
        :has-error="form.title.$hasError"
        :id="form.title.$uid"
      />
      <ValidationErrors :errors="form.title.$errors" />
    </div>

    <section class="section-1">
      <h3 class="section-heading">Is this a Private or Public Event?</h3>
      <div class="event-type-container">
        <label class="private">
          <div class="label">Private</div>
          <input
            type="radio"
            name="event-type"
            value="private"
            v-model="form.eventType.$value"
            :disabled="loading"
          />
        </label>
        <label>
          <div class="label">Public</div>
          <input
            type="radio"
            name="event-type"
            value="public"
            v-model="form.eventType.$value"
            :disabled="loading"
          />
        </label>
      </div>
      <ValidationErrors :errors="form.eventType.$errors" />
    </section>
    <section class="section-2">
      <h3 class="section-heading">When will this Event be?</h3>
      <div class="start-end-date-container">
        <div class="start-date">
          <label :for="form.startDate.$uid" class="label">Starts</label>
          <BaseInput
            v-model="form.startDate.$value"
            :validating="loading"
            :has-error="form.startDate.$hasError"
            :disabled="loading"
            type="date"
            @blur="form.startDate.$onBlur()"
            :id="form.startDate.$uid"
          />
          <ValidationErrors :errors="form.startDate.$errors" />
        </div>
        <div>
          <label :for="form.endDate.$uid" class="label">Ends by</label>
          <BaseInput
            v-model="form.endDate.$value"
            :validating="loading"
            :has-error="form.endDate.$hasError"
            :disabled="loading"
            type="date"
            @blur="form.endDate.$onBlur()"
            :id="form.endDate.$uid"
          />
          <ValidationErrors :errors="form.endDate.$errors" />
        </div>
      </div>
      <div class="label">Time</div>
      <div class="start-end-time-container">
        <div>
          <BaseInput
            v-model="form.startTime.$value"
            :validating="loading"
            :has-error="form.startTime.$hasError"
            :disabled="loading"
            type="time"
          />
          <ValidationErrors :errors="form.startTime.$errors" />
        </div>
        <span>-</span>
        <div>
          <BaseInput
            v-model="form.endTime.$value"
            :validating="loading"
            :has-error="form.endTime.$hasError"
            :disabled="loading"
            type="time"
          />
          <ValidationErrors :errors="form.endTime.$errors" />
        </div>
      </div>
    </section>
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
import BaseInput from "../components/BaseInput.vue";
import SubmitButtons from "../components/SubmitButtons.vue";
import ValidationErrors from "../components/ValidationErrors";

import { ref } from "vue";
import { sleep, required } from "../utils";
import { useValidation, ValidationError } from "vue3-form-validation";

export default {
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors
  },
  setup() {
    const loading = ref(false);

    const {
      form,
      errors,
      submitting,
      validateFields,
      resetFields
    } = useValidation({
      title: {
        $value: "",
        $rules: [required("Please select an event title")]
      },
      eventType: {
        $value: "",
        $rules: [required("Please select a value")]
      },
      startDate: {
        $value: "",
        $rules: [
          required("Please select a starting date"),
          {
            key: "date",
            rule: (startDate, endDate) => {
              const start = new Date(startDate);
              const end = new Date(endDate);

              if (start > end) {
                return "Please select a valid starting date";
              }
            }
          }
        ]
      },
      endDate: {
        $value: "",
        $rules: [required("Please select an ending date"), { key: "date" }]
      },
      startTime: {
        $value: "",
        $rules: [required("Please select a time")]
      },
      endTime: {
        $value: "",
        $rules: [required("Please select a time")]
      }
    });

    (async function () {
      loading.value = true;

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      await sleep(1500);

      resetFields({
        title: "Awesome Event",
        eventType: "private",
        startDate: today.toLocaleDateString("en-CA"),
        endDate: tomorrow.toLocaleDateString("en-CA"),
        startTime: "12:00",
        endTime: "15:00"
      });

      loading.value = false;
    })();

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
      loading,
      handleSubmit,
      resetFields
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../colors.scss";

.section-heading {
  margin: 25px 0 15px 0;
}

.section-1 {
  .event-type-container {
    display: flex;

    .private {
      margin-right: 20px;
    }
  }

  .type-error {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: $red-400;
  }
}

.section-2 {
  .start-end-date-container {
    display: flex;
    margin: 1rem 0;

    .start-date {
      margin-right: 20px;
    }
  }

  .start-end-time-container {
    display: flex;
    align-items: baseline;

    span {
      margin: 0 10px;
    }
  }
}

.buttons {
  margin-top: 3rem;
}
</style>