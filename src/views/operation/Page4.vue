<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ this.$store.state.count }} times
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    increment() {
      // this.$store.state.count++
      // this.$store.commit("changecount",this.$store.state.count);
      this.$store.dispatch("addnum")
   },
    decrement() {
      // this.$store.state.count--
      // this.$store.commit("changecount",this.$store.state.count);
      this.$store.dispatch("rednum")
    }
  },
  mounted() {
    console.log(this.$store.state.count);
  },
  updated(){
    console.log(this.$store.state.count);
  }
};
</script>