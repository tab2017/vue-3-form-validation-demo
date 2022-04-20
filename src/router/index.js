import { createRouter, createWebHistory } from "vue-router";
import SignupForm from "../views/SignupForm.vue";
import DynamicForm from "../views/DynamicForm.vue";
import ArrayBinding from "../views/ArrayBinding.vue";
import DynamicRules from "../views/DynamicRules.vue";
import LoadFormData from "../views/LoadFormData.vue";
import DynamicObject from "../views/DynamicObject.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SignupForm
    },
    {
      path: "/dynamic-form",
      component: DynamicForm
    },
    {
      path: "/array-binding",
      component: ArrayBinding
    },
    {
      path: "/dynamic-rules",
      component: DynamicRules
    },
    {
      path: "/load-form-data",
      component: LoadFormData
    },
    {
      path: "/dynamic-object",
      component: DynamicObject
    }
  ]
});

export default router;
