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
    img: "/static/image/wenzhang/test1.jpg"
  },
  {
    title: "测试文章23232",
    text: "测试内容1111",
    time: new Date().toString(),
    img: ""
  }
];
//读取文件阶段
let fs=require("fs");
let xjson=require("xml2js");
let files=fs.readdirSync('./wenzhang');
list=[];
for(let v of files)
{
  let str=fs.readFileSync("wenzhang/"+v);
  let obj=xjson.parseString(str,{ explicitArray : false, ignoreAttrs : true },(err,result)=>{
    if(result.root.img=="") result.root.img="image/null.jpg";
    result.root.img="http://localhost:1000/"+result.root.img;//转换域名到后台
    list.push(result.root);
  });
}
//读取信息
const path="./info.xml";
let str=fs.readFileSync(path);
let info={};
xjson.parseString(str,{ explicitArray : false, ignoreAttrs : true },(err,result)=>{
  info=result.root;
});
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
    res.send(JSON.stringify(list));
    log(req.ip+"获取博客列表");
});
app.get('/cont',function(req,res){
    var id=req.query.id;
    res.send(JSON.stringify(list[id]));
    log(req.ip+"获取文章 id="+id+" 标题："+list[id].title);
});
app.get('/info',function(req,res){
  res.send(JSON.stringify(info));
  log(req.ip+"访问");
})

var sum=0;
app.listen(1000,function(){
  console.log("connect "+sum++);
});