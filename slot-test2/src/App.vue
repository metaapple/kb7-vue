<template>
  <div>
    <NoSlotTest />
    <br />
    <br />

    <SlotTest />
    <br />
    <br />
  </div>
</template>

<script>
import NoSlotTest from './components/NoSlotTest.vue';
import SlotTest from './components/SlotTest.vue';
export default {
  name: 'App',
  components: { NoSlotTest, SlotTest },
};
</script>

<style></style>
