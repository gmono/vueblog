<template>
    <div style="width: 100%;text-align: center" class="ce-frame">
    <div class="ce-top">
        <div class="ce-one" v-if="istitle">
            <span>标题:</span>
            <input v-model="title" class="ce-title" style="flex-grow: 10" type="text">
        </div>
        <div class="ce-two">
            <span>{{conttip}}:</span>
            <textarea v-model="text" class="ce-text" style="flex-grow: 10" :placeholder="placetext"></textarea>
        </div>
        <div class="ce-thr">
            <div style="flex-grow: 2"></div>
            <input class="enjoy-button" style="flex-grow: 1" type="button" value="提交" @click="submit">
            <div style="flex-grow: 2"></div>
            <input class="enjoy-button" style="flex-grow: 1" type="button" value="清空" @click="clear">
            <div style="flex-grow: 2"></div>
            <input class="enjoy-button" style="flex-grow: 1" type="button" value="取消" @click="back">
            <div style="flex-grow: 2"></div>
        </div>
    </div>
    </div>
</template>
<script>
let CommentEditer;
//带提交功能的编辑器 提交的同时产生一个提交事件 onsubmit 事件提供一个参数 参数包含infodata和text
//提交成功触发 onok事件
//如果取消 则触发onback事件
export default CommentEditer={
    data(){
        return {
            title:"",
            text:""
        };
    },
    props:['placetext','url','infodata','istitle','conttip'],
    methods:{
        back(){
            this.$emit("onback");//触发onback事件
        },
        submit(){
            let title=this.$data.title;
            let text=this.$data.text;
            let obj={
                infodata:this.infodata,
                data:{text:this.$data.text}
            };
            if(this.istitle)
            {
                obj.data.title=this.$data.title;
            }
            this.$emit("onsubmit",obj);
            //obj中infodata为传入的infodata data为数据 有无title 决定于istitle 一般
            //编辑回复时没有title 评论时有title
            //提交
            let xhr=new XMLHttpRequest();
            xhr.open('POST',this.url,true);
            xhr.onreadystatechange=()=>{
                if(xhr.readyState==200)
                {
                    if(xhr.status==4)
                    {
                        let text=xhr.responseText;
                        if(text=="OK") this.$emit("onok",true);
                        else this.$emit("onok",false)
                    }
                }
            }
            xhr.send(JSON.stringify(obj));//发送json字符串
            this.back();
        },
        clear(){
            this.$data.text="";
        }
    }
}
</script>
<style scoped>
.ce-frame
{
    border:1px lightgrey double;
    padding-bottom: 30px;
}
.ce-top{
    width: 80%;
    font-family: "微软雅黑";
    display: inline-block;
    margin-top:20px;
}
.ce-top>*{
    display: flex;
    margin-top:10px;
}
span{
    flex-grow: 1;
}
.ce-title,.ce-text
{
    box-shadow: 1px 1px 5px 1px lightgrey;
    border-radius: 5px;
}
.ce-title:focus,.ce-text:focus
{
    outline: 1px orangered solid;
}
.ce-one{
    height: 2em;
}
.ce-two
{
    height: 10em;
}
.ce-thr
{
    height: 3em;
    
}
.ce-thr>input{
    font-size: 1em;
    height: 4em;
    width: 2em;
}
</style>