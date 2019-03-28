<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
}
body,html{
  overflow-x: hidden;
}
a{
  color:#9f9f9f;
  cursor: pointer;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 40px;
}
/* .bot-nav{
  width: 100%;
  height: 50px;
  line-height: 50px;
  display:flex;
  justify-content: space-around;
  position: fixed;
  z-index: 2;
  bottom: 0;
  list-style: none;
  text-decoration: none;
  background: #fff;
}
.bot-nav a{
  color: #7a7a7a;
} */
</style>
