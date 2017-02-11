<template>
    <div class="view-top">
        <div class="view-title">
            <div @click="back">返回</div>
            <div class="view-title">{{content.title}}</div>
        </div>
        <hr>
        <div class="view-time">{{content.time}}</div>
        <hr>
        <div class="view-content">

            {{content.text}}
        </div>
    </div>
</template>
<script>
    let PageView;
    //content为一个对象 有 title time text三个属性
    export default PageView={
        data(){
            return {};
        },
        props:['content'],
        methods:{
            back(){
                this.$emit('back');
            }
        }
    }
</script>
<style scoped>
.view-top{
    width:100%;
    background-color: rgba(10, 10,10, 0.5);
    border-radius: 5px;
    padding: 5px;
    height: 100%;
    color:aliceblue;
    box-sizing: border-box;
    
}
    img{
        float: left;
    }
    .view-title{
        width:100%;
        position: relative;
        text-align: center;
    }
    .view-title>*{
        font-family: "微软雅黑";
    }
    .view-title>div:last-child{
        text-align: center;
        margin-left:3rem;
        display: inline;
    }
    .view-title>div:first-child{
        position: absolute;
        background-color: salmon;
        cursor:pointer;
        left:0;
        top:0;
        border-radius: 2px;
        font-size:0.9rem;
        width: 2.5rem;
        height: 1.5rem;
        line-height: 1.5;
        text-align: center;
    }
    .view-title>div:first-child:hover{
            background-color:bisque;
    }
    .view-time{
        text-align: right;
        margin-right: 20px;
        font-family: "微软雅黑";
        font-weight:600;
        font-size: 0.8rem;
        font-style: italic;
        color:darkgrey;
    }
    .view-content{
        padding: 20px;
        padding-bottom: 50px;
    }
</style>