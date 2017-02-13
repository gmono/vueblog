<template>
  <div class="comment-view-top">
    <comment-item v-for="item in comments" :ip="item.ip" :title="item.title" :content="item.content" :time="item.time">
        <comment-item v-for="rep in item.rep" :ip="rep.ip" :content="rep.content" :time="rep.time" title=""></comment-item>
    </comment-item>
  </div>
</template>
<script>
  import CommentItem from "./CommentItem.vue"
  let CommentView;
  export default CommentView = {
    data() {
      return {};
    },
    props: ['comments'],
    components: {
      CommentItem
    },
    methods: {}
  }

</script>
<style scoped>

.comment-view-top{
    background-color: white;
    
}

</style>
