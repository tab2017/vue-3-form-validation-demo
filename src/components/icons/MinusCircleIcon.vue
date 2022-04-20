<template>
  <MinusCircleIcon class="_minus-icon" />
</template>

<script>
import { MinusCircleIcon } from "@heroicons/vue/outline";

export default {
  components: {
    MinusCircleIcon
  }
};
</script>

<style lang="scss" scoped>
@import "../../colors.scss";

._minus-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: $red-500;
  cursor: pointer;

  &:hover {
    color: $red-700;
  }
}
</style>