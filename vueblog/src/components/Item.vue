<template>
    <div class="item-top" @mouseenter="hoverin" @mouseleave="hoverout" @click="click">
        <div class="line" v-if="!isblock">{{title}}<div v-text="time"></div></div>
        <div class="block" v-if="isblock">
            <block-item :title="title" :content="content" :time="time" :imgsrc="imgsrc"></block-item>
        </div>
    </div>
</template>
<script>
import BlockItem from "./BlockItem.vue"
let Item;
export default Item={
    data(){
        return{
            isblock:true
        };
    },
    props:['id','title','content','time','imgsrc'],
    methods:{
        hoverin(){
            // this.$data.isblock=true;
        },
        hoverout(){
            // this.$data.isblock=false;
        },
        click(){
            this.$emit("onclick",this.id);
        }
    },
    components:{
        BlockItem
    }
}
</script>
<style scoped>
.item-top{

    margin:5px;
    margin-bottom: 20px;
    box-shadow: lightgrey 0 0 10px 2px ;
    transition: all 0.2s ease-in;
}
.item-top:hover{
    box-shadow: lightgrey 0 0 10px 5px ;
}
.line{
    font-family: "微软雅黑";
    height: 32px;
    line-height: 32px;
    cursor: pointer;
        border-top: 1px black solid;
    border-bottom: 1px black solid;
}
.line>div{
    float:right;
}
</style>