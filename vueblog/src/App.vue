<template>
  <div class="app-top">
    <top-bar :name="name" :say="say" background="/static/image/back.jpg"></top-bar>
    <hr>
    <div class="app-cont">
      <div class="app-mask" v-if="isloading">加载中，请稍后…………</div>
      <list @listclick="click" :datalist="datalist" v-if="nowpage==null&&!isloading"></list>
      <div style="width: 100%;height: 100%" v-if="nowpage!=null&&!isloading">
        <page-view @back="back" :content="nowpage"></page-view>
      </div>
      <div style="position: relative;margin:1cm;">
        <!--这是评论容器-->
        <div v-if="comments==null" style="padding-top:250px;text-align: center;width: 100%;height: 100%;top:0;left:0;position:absolute">
          评论加载中……
        </div>
        <comment-view :comments="comments" v-if="comments!=null"></comment-view>
        
      </div>
    </div>
  </div>
</template>
<script>
  import TopBar from "./components/TopBar.vue"
  import List from "./components/List.vue"
  import PageView from "./components/PageView.vue"
  import DataProvider from "./js/DataProvider.js"
  import CommentView from "./components/CommentView.vue"
  let App;
  export default App = {
    data() {
      let obj = DataProvider.getinfo(); //获取信息
      var ret = {
        datalist: [],
        nowpage: null,
        name: obj.name,
        say: obj.say,
        isloading: true,
        comments: null
      };
      DataProvider.getlist((list) => {
        ret.datalist = list;
        ret.isloading = false;
      });
      return ret;
    },
    methods: {
      click(id) {
        this.$data.isloading = true;
        this.$data.comments = null; //加载中
        DataProvider.getcont(id, (page) => {
          this.$data.nowpage = page;
          this.$data.isloading = false;
        });
        DataProvider.getcomment(id, (clist) => {
          this.$data.comments = clist;
        })

      },
      back() {
        this.$data.nowpage = null;
        this.$data.comments=null;
      }
    },
    components: {
      TopBar,
      List,
      PageView,
      CommentView
    }
  }

</script>
<style scoped>
  .app-top {
    height: 300px;
    width: 90%;
    margin: 0 auto;
  }
  
  .app-cont {
    min-height: 500px;
    margin-bottom: 100px;
    width: 100%;
    background-color: white;
    ;
    border-radius: 10px 10px 0 0;
    box-shadow: lightgrey 0 0 5px 3px;
    padding-bottom: 10px;
  }
  
  .app-mask {
    text-align: center;
    height: 100%;
    width: 100%;
    padding-top: 250px;
    font-family: "微软雅黑";
    font-weight: bolder;
    font-size: 2em;
  }

</style>
