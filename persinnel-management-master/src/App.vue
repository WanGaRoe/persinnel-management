<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

body, html {
  height: 100%;
  margin: 0;
  padding: 0
}
ol, ul {
list-style-image:none;
list-style-position:outside;
list-style-type:none;
}

body, dl, dt, dd, ul, ol, li, pre, form, fieldset, input, p, blockquote, th, td {
font-weight:400;
margin:0;
padding:0;
}
h1, h2, h3, h4, h4, h5 {
margin:0;
padding:0;
}

</style>
