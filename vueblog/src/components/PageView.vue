<template>
    <div class="view-top">
        <div class="view-title">
            <div @click="back" class="enjoy-button">返回</div>
            <div class="view-title">{{content.title}}</div>
        </div>
        <hr>
        <div class="view-time">{{content.time}}</div>
        <hr>
        <div class="view-content paper">

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
    border-radius: 10px;
    padding: 5px;
    height: 100%;
    color:black;
    box-sizing: border-box;
    
}
    img{
        float: left;
    }
    .view-title{
        width:100%;
        position: relative;
        text-align: center;
        padding: 5px 0 5px 0;
    }
    .view-title>*{
        font-family: "微软雅黑";
    }
    .view-title>div:last-child{
        text-align: center;
        margin-left:5.5rem;
        display: inline;
    }
    .view-title>div:first-child{
        position: absolute;
        cursor:pointer;
        left:5px;
        top:5px;
        font-size:0.9rem;
        width: 5rem;
        height: 1.5rem;
        line-height: 1.5;
        text-align: center;
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
        /*padding-left: 50px;*/
        text-indent: 2em;
        padding-bottom: 50px;
        width: 100%;
        box-sizing: border-box;
        color:black;
    }
</style>