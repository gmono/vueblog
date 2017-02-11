<template>
  <div class="app-top">
    <top-bar :name="name" :say="say" background="/static/image/back.jpg"></top-bar>
    <hr>
    <div class="app-cont">
      <div class="app-mask" v-if="isloading">加载中，请稍后…………</div>
      <list @listclick="click" :datalist="datalist" v-if="nowpage==null&&!isloading"></list>
      <page-view @back="back" :content="nowpage" v-if="nowpage!=null&&!isloading"></page-view>
    </div>
  </div>
</template>
<script>
  import TopBar from "./components/TopBar.vue"
  import List from "./components/List.vue"
  import PageView from "./components/PageView.vue"
  import DataProvider from "./js/DataProvider.js"

  let App;
  export default App = {
    data() {
      let obj=DataProvider.getinfo();//获取信息
      var ret= {
        datalist: [],
        nowpage: null,
        name: obj.name,
        say: obj.say,
        isloading:true
      };
      DataProvider.getlist((list)=>{
        ret.datalist=list;
        ret.isloading=false;
      });
      return ret;
    },
    methods: {
      click(id) {
         DataProvider.getcont(id,(page)=>{
          this.$data.nowpage=page;
          this.$data.isloading=false;
        });
        this.$data.isloading=true;
      },
      back() {
        this.$data.nowpage = null;
      }
    },
    components: {
      TopBar,
      List,
      PageView
    }
  }

</script>
<style scoped>
  .app-top {
    height: 300px;
    width: 90%;
    margin: 0 auto;

  }
  .app-cont{
    min-height: 500px;
    margin-bottom: 100px;
    width: 100%;
    background-color: white;;
        border-radius: 10px 10px 0 0 ;
    box-shadow: lightgrey 0 0 5px 3px; 


  }
  .app-mask{
    text-align: center;
    height: 100%;
    width: 100%;
    padding-top:250px; 
    font-family: "微软雅黑";
    font-weight: bolder;
    font-size: 2em;
  }
</style>
