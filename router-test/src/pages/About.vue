<template>
  <div class="card card-body">
    <h2>About</h2>
    <p>
      요청경로 {{$route.fullPath}}
    </p>
  </div>

</template>

<script>
export default {
  name: 'About',
  created() {
    console.log(this.$route)
  }
}
</script>