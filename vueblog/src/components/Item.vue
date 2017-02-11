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
            isblock:false
        };
    },
    props:['id','title','content','time','imgsrc'],
    methods:{
        hoverin(){
            this.$data.isblock=true;
        },
        hoverout(){
            this.$data.isblock=false;
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
    border-top: 1px black solid;
    border-bottom: 1px black solid;
    margin:5px;

}
.item-top:hover{
    box-shadow: rgba(0,0,0,0.5) 0 0 3px 2px ;
}
.line{
    font-family: "微软雅黑";
    height: 32px;
    line-height: 32px;
    cursor: pointer;
}
.line>div{
    float:right;
}
</style>