<template>
  <div class="comment-item-top" @click="onclick">
    <div style="display: flex">
      <div class="c-i-left">
        <div class="c-i-ip">
            用户ip:{{ip}}
        </div>
        <div class="c-i-time">发表时间:{{time}}</div>
      </div>
      <!--<hr>-->
      <div class="c-i-right">
        <div class="sayblock"></div>
        <div class="c-i-title" v-if="title!=''">{{title}}</div>
        <hr v-if="title!=''">
        <div class="c-i-content">{{content}}</div>
      </div>
    </div>
    <div style="padding-left: 3em;">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  let CommentItem;
  export default CommentItem = {
    data() {
      return {};
    },
    props: ['ip', 'title', 'content', 'time'],
    components: {

    },
    methods: {
      onclick(){
        if(this.title!="")
        {
          //这代表这个是顶层评论控件
          this.$emit("onrep","");//产生onrep事件
        }
      }
    }
  }

</script>
<style scoped>
  .c-i-left,
  .c-i-right {
 border-radius: 5px;
  }
  
  .c-i-left {
    height: 80px;
    width: 15em;
    background-color: azure;
    border: 2px grey solid;
    box-shadow: grey 0 0 10px 2px;
    margin-right: 20px;
    box-sizing: border-box;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 0.8em;
    text-align: center;
    line-height: 32px;
  }
  
  .c-i-right {
      flex-grow: 1;
      box-shadow: grey 0 0 10px 1px;
      padding: 10px;
  }
  /*.comment-item-top>hr{
    width: 1px;
    height: 20px;;
    display: inline-block;
}*/
  
  .comment-item-top {
    margin-top: 10px;
    border: 1px lightgrey solid;
    padding: 20px;
    border-bottom: 0;
    border-right: 0;
    background-color:whitesmoke;
    font-family: "微软雅黑";
    box-shadow: 0 0 10px 2px lightgray;
    border-radius: 5px;
  }

</style>
