<template>
  <PlusCircleIcon class="_plus-icon" />
</template>

<script>
import { PlusCircleIcon } from "@heroicons/vue/outline";

export default {
  components: {
    PlusCircleIcon
  }
};
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

._plus-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: $blue-500;
  cursor: pointer;

  &:hover {
    color: $blue-700;
  }
}
</style>