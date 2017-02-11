<template>
    <div class="blockitem-top">
        <div class="title" v-text="title"></div>
        <hr>
        <div class="contc">
            <img :src="imgsrc">
            <div class="content" v-text="content"></div>
        </div>
        <hr>
            <div class="time">{{time}}</div>
    </div>
</template>
<script>
    let BlockItem;
    export default BlockItem={
        props:['imgsrc','content','title','time']
    };
</script>
<style scoped>
.blockitem-top{
    height: 100%;
    width: 100%;
    border:1px rgba(100,100,100,0.5) solid;
    box-sizing: border-box;
}
img{
    float: left;
    height: 64px;
    width: 64px;
    box-shadow: rgba(100, 100, 100, 0.2) 0 0 2px 1px;
    border:1px rgba(100,100,100,0.3) solid;
    margin:0px 20px 5px 5px;
}
.title,.content{
    font-family: "微软雅黑";
    
}
.title{
    font-size: 1rem;
}
.content{
    font-size: 0.8rem;
    color:lightblue;
    word-wrap: break-word;
    word-break: break-all;
    text-overflow: ellipsis;
}
.content:hover{
    color:white;
}
.time{
    position: inline-block;
    text-align: right;
    font-size: 0.8rem;
    line-height: 0.8;
}
.contc{
    min-height: 75px;
}
*{
    cursor: pointer;
}
</style>