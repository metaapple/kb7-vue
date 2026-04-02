<template>
  <div>
    <h2>VueCsspin Test</h2><hr />
    Loading Message : <input type="text" v-model="message" /><br />
    Spinner Style : 
    <select v-model="spinStyle">
        <option>cp-round</option>
        <option>cp-pinwheel</option>
        <option>cp-balls</option>
        <option>cp-bubble</option>
        <option>cp-flip</option>
        <option>cp-hue</option>
        <option>cp-skeleton</option>
        <option>cp-eclipse</option>
        <option>cp-boxes</option>
        <option>cp-morph</option>
        <option>cp-heart</option>
        <option>cp-meter</option>
    </select><br />
    opacity(0 &lt; x &lt; 1) : <input type="text" v-model.number="opacity" /><br />
    background-color : 
    <select v-model="color">
        <option>black</option>
        <option>white</option>
        <option>red</option>
        <option>yellow</option>
        <option>blue</option>
        <option>aqua</option>
        <option>green</option>
        <option>orange</option>
        <option>brown</option>
        <option>salmon</option>
        <option>chocolate</option>
        <option>bisque</option>
    </select><br />
    <button @click="viewVueCsspin">Test Spinner</button>
    <vue-csspin v-if="visible" :message="message" :spin-style="spinStyle" :color="color" :opacity="opacity" />
  </div>
</template>

<script>
import VueCsspin from './components/VueCsspin.vue'

export default {
  name: 'App',
  components: {
    VueCsspin
  },
  data() {
    return { 
      visible: false,
      message: "Loading",
      spinStyle : "cp-round",
      opacity : 0.7,
      color : "white",
    };
  },
  methods : {
    viewVueCsspin() {
      this.visible = true;
      setTimeout(()=>{
        this.visible = false;
      }, 5000)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
