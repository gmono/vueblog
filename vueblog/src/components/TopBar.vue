<template>
  <div class="top">
    <img class="back" :src="background">
    <div class="cont">
      <div class="space"></div>
      <div class="name">{{name}}</div>
      <div class="say">{{say}}</div>
    </div>
  </div>
</template>
<script>
  let TopBar;
  export default TopBar = {
    data() {
      return {};
    },
    props: ["name", "say", "background"],
    methods:{
    }
  };

</script>
<style scoped>
  .back,
  .top {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: rgba(100, 100, 100, 0.3) 0 0 5px 2px;
  }
  
  .top {
    position: relative;
  }
  
  .back {
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(2px);
  }
  
  .space {
    height: 52%;
  }
  
  .name,
  .say {
    font-family: "微软雅黑";
    margin-left: 30px;
  }
  
  .name {
    font-size: 2.5rem;
    font-weight:600;
  }
  
  .say {
    margin-top: 10px;
    font-style: italic;
    color: slategrey;
    transition: all 0.5s ease-in;
    display: inline-block;
    padding: 3px 70px 3px 10px;
  }
  .say:hover{
    background-color: rgba(240,255,255,0.5);
    color:black;
  }
  .cont{
      position: absolute;
      width: 100%;
      height :100%;
      top:0;
      left:0;
  }

</style>
