var express=require("express");
var app=express();
var cors=require('cors');
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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
    list.push(result.root);
  });
}
//
app.get('/list',function(req,res){
    res.send(JSON.stringify(list));
});
app.get('/cont',function(req,res){
    var id=req.query.id;
    res.send(JSON.stringify(list[id]));
});

var sum=0;
app.listen(1000,function(){
  console.log("connect "+sum++);
});