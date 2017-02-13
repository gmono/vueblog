var express=require("express");
var app=express();
var cors=require('cors');
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use('/image',express.static('image'));
let list = [{
    title: "测试文章1",
    text: "测试内容1",
    time: new Date().toString(),
    img: "/static/image/wenzhang/test1.jpg",
    commet:[
      {
        ip:"127.0.0.1",
        title:"测试",
        time:"2111.0.0",
        content:"测试内容",
        rep:[
          {
            ip:"127.0.0.1",
            time:"2010.0.2",
            content:"测试回复"
          }
        ]
      }
    ]
  },
  {
    title: "测试文章23232",
    text: "测试内容1111",
    time: new Date().toString(),
    img: ""
  }
];
let commets=[];//评论列表
//读取文件阶段
let fs=require("fs");
let xjson=require("xml2js");
let files=fs.readdirSync('./wenzhang');
list=[];
for(let v of files)
{
  //因为下面用了list.length-1这里不如直接判断目录名
  if(v=="comments") continue;
  // if(fs.lstatSync("wenzhang/"+v).isDirectory()) continue;//跳过目录 其实可以 v=="comments" 但是这样不美观
  let str=fs.readFileSync("wenzhang/"+v);
  let obj=xjson.parseString(str,{ explicitArray : false, ignoreAttrs : true },(err,result)=>{
    if(result.root.img=="") result.root.img="image/null.jpg";
    result.root.img="http://localhost:1000/"+result.root.img;//转换域名到后台
    list.push(result.root);
  });
  //再读取相应的comment文件
  let compath="./wenzhang/comments/"+v;//评论文件地址
  if(!fs.existsSync(compath)){
    //添加空评论记录
    commets.push([]);
    continue;//跳过
  }
  let cstr=fs.readFileSync(compath);
  let cobj=xjson.parseString(cstr,{explicitArray:false,ignoreAttrs:false},(err,result)=>{
    //处理 确定 commentlist为数组 reps为数组
    if(result.root.comment==undefined){
      commets.push([]);
      return;
    }
    //没有评论的另一种情况
    if(!(result.root.comment instanceof Array)) result.root.comment=[result.root.comment];
    for(let v of result.root.comment)
    {
      if(!(v.rep instanceof Array)) v.rep=[v.rep];//转换为数组
    }
    commets.push(result.root.comment);//直接保存一个数组列表
  });
}
//读取信息
const path="./info.xml";
let str=fs.readFileSync(path);
let info={};
xjson.parseString(str,{ explicitArray : false, ignoreAttrs : true },(err,result)=>{
  info=result.root;
});

//目录处理
while(list.length<files.length-1) ;//等待文件读取完成
let mlist=[];
for(let o of list)
{
  //处理生成目录列表
  let obj={};
  obj.title=o.title;
  obj.time=o.time;
  obj.img=o.img;
  obj.text=o.text.length>50? o.text.slice(0,50)+"......":o.text;
  mlist.push(obj);
}
//
//前端客户记录……
let tm=new Date();
let fpath="./logs/"+tm.getFullYear()+"-"+tm.getMonth()+"-"+tm.getDay()+".log";
// if(!fs.exists(fpath)){
//   let temp=fs.openSync(fpath,"a+");
//   fs.close(temp);
// }
let logfile=fs.createWriteStream(fpath,{flags:"a+",autoClose:true});
//
//日志记录函数
let log=(str)=>{
  let temp=new Date();
  let h=temp.getHours();
  let m=temp.getMinutes();
  let s=temp.getSeconds();
  logfile.write("["+h+":"+m+":"+s+"]"+"\t"+str+"\n");
}
app.get('/list',function(req,res){
    res.send(JSON.stringify(mlist));
    //
    log(req.ip+"获取博客列表");
});
app.get('/cont',function(req,res){
    var id=req.query.id;
    res.send(JSON.stringify(list[id]));
    log(req.ip+"获取文章 id="+id+" 标题："+list[id].title);
});
app.get('/comment',(req,res)=>{
  var id=req.query.id;
  if(commets.length<=id) res.send(JSON.stringify(null));
  else res.send(JSON.stringify(commets[id]));
  log(req.ip+"获取评论 文章id:"+id);
});
app.get('/info',function(req,res){
  res.send(JSON.stringify(info));
  log(req.ip+"访问");
})
app.post('/comment/submit',(req,res)=>{
  //评论提交到这里
  let title="";
  console.log("");
  log(req.ip+"提交评论 标题："+title);
});
var sum=0;
app.listen(1000,function(){
  console.log("connect "+sum++);
});
//由于异步的原因 数组无法保证保存顺序 因此 以上存储结构不适用 
//应该使用Map 来存储使用唯一标识符作为文件名和id
//并使用排序算法进行按时间排序
//综上所述 最好使用数据库