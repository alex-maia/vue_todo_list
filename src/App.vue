<template>
<div>
  <todoList/>
</div>
</template>

<script>
import todoList from './components/todoList.vue'

export default {
  name: 'App',
  components: {
    todoList,
  }
}
</script>

<style>
*{
    background-color: rgb(37, 37, 37)!important;
    color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
