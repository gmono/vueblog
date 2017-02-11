<template>
    <div class="list-top">
        <ul>
            <li v-for="item in datalist">
                <item @onclick="click" :title="item.title" :id="item.id" :content="item.text" :time="item.time" :imgsrc="item.img">

                </item>
            </li>
        </ul>
    </div>
</template>
<script>
import Item from "./Item.vue"
let List;
//datalist是一个对象数组 每个元素是一个对象 每个对象有 title text time img 是个属性  都是字符串
export default List={
    data(){
        return {
        };
    },
    methods:{
        click(id){
            this.$emit("listclick",id);
        }
    },
    props:['datalist'],
    components:{
        Item
    }
}
</script>
<style scoped>
ul{
    list-style:none;
    padding: 0;
    margin:0;
    text-indent: 5px;
}
.list-top{
    
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
    color:cadetblue;
}
</style>