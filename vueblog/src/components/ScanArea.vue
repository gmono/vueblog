<template>
    <div class="top" ref="top">
        <div ref="cont" class="content">
            <slot name="contain">没有内容</slot>
        </div>
    </div>
</template>
<script>
    let ScanArea;
    export default ScanArea={
        data(){
            let contheight=this.$refs.cont.offsetHeight;
            let topheigth=this.$refs.top.offsetHeight;
            let scanh=contheight-topheigth;
            let isd=false;
            if(scanh<=0) isd=false;
            else isd=true;
            //返回 运动范围 是否运动
            return {
                scanh:scanh,
                isd:isd
            };
        }
    };
</script>
<style scoped>
    .top{
        width:100%;
        height:100%;
        overflow: hidden;
    }
    .content{
        transition:all 1.5s linear;
    }
</style>