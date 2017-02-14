<template>
  <div class="comment-view-top">
    <comment-item v-for="(item,index) in comments" :ip="item.ip" :title="item.title" :content="item.content" :time="item.time" @onrep="repfun(index)">
        <comment-item v-for="rep in item.rep" :ip="rep.ip" :content="rep.content" :time="rep.time" title="" id=""></comment-item>
    </comment-item>
    <comment-editer :conttip="conttip" :placetext="editinfo" :istitle="istitle" :url="suburl" :infodata="infodata" @onok="subok" @onsubmit="submit" @onback="editback" v-if="isediting"></comment-editer>
    <div style="text-align: right">
      <button class="enjoy-button cv-btn" v-if="!isediting" @click="click">评论</button>
      <button class="enjoy-button cv-btn" v-if="!isediting" @click="update">刷新</button>
    </div>
    
  </div>
</template>
<script>
//工具函数
let getDatestr=(tm)=>{
  //得到日期
  return tm.getFullYear()+"-"+tm.getMonth()+"-"+tm.getDay();
}
let getTimestr=(tm)=>{
  //得到时间
    let h=temp.getHours();
  let m=temp.getMinutes();
  let s=temp.getSeconds();
  return h+":"+m+":"+s;
}
  import CommentItem from "./CommentItem.vue"
  import CommentEditer from "./CommentEditer.vue"
  let CommentView;
  export default CommentView = {
    data() {
      return {
        isediting:false,
        editinfo:"",
        istitle:true,
        suburl:"",
        infodata:{},
        conttip:""
      };
    },
    props: ['comments','id'],
    components: {
      CommentItem,
      CommentEditer
    },
    methods: {
      repfun(mid){
        this.$data.istitle=false;
        this.$data.suburl="http://localhost:1000/comment/rep";
        this.$data.infodata={
          id:this.id,
          mid:mid
        };
        this.$data.conttip="回复";
        this.$data.editinfo="回复评论  "+"用户IP:"+this.comments[mid].ip+"  标题:"+this.comments[mid].title;
        this.$data.isediting=true;
      },
      click(){
        this.$data.istitle=true;
        this.$data.suburl="http://localhost:1000/comment/submit";
        this.$data.infodata={
          id:this.id,
        }
        this.$data.conttip="内容";
        this.$data.isediting=true;
        this.$data.editinfo="请输入评论内容……";
      },
      subok(isok){
        alert(isok?'提交成功！':"提交失败……");
      },
      submit(obj){
        this.$emit("onsubmit",obj);//触发onsubmit事件 要求外部刷新comments
      },
      editback(){
        this.$data.isediting=false;
      },
      update(){
        this.$emit("onsubmit",null);//发送一个空的提交事件 用于更新comments
      }
    }
  }

</script>
<style scoped>

.comment-view-top{
    background-color: white;
    
}
.cv-btn{
  margin-top:30px;
  font-size: 1.2em;
  width: 4cm;
  height: 2cm;
  display: inline-block;
}
</style>
