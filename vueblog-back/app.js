var express = require("express");
var app = express();
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use('/image', express.static('image'));
let list = [{
    title: "测试文章1",
    text: "测试内容1",
    time: new Date().toString(),
    img: "/static/image/wenzhang/test1.jpg",
    commet: [{
      ip: "127.0.0.1",
      title: "测试",
      time: "2111.0.0",
      content: "测试内容",
      rep: [{
        ip: "127.0.0.1",
        time: "2010.0.2",
        content: "测试回复"
      }]
    }]
  },
  {
    title: "测试文章23232",
    text: "测试内容1111",
    time: new Date().toString(),
    img: ""
  }
];
let commets = []; //评论列表
//读取文件阶段
let fs = require("fs");
let xjson = require("xml2js");
let files = fs.readdirSync('./wenzhang');
files = files.slice(1, files.length); //去掉comments目录
list = [];
for (let v of files) {
  let str = fs.readFileSync("wenzhang/" + v);
  let obj = xjson.parseString(str, {
    explicitArray: false,
    ignoreAttrs: true
  }, (err, result) => {
    if (result.root.img == "") result.root.img = "image/null.jpg";
    result.root.img = "http://localhost:1000/" + result.root.img; //转换域名到后台
    list.push(result.root);
  });
  //再读取相应的comment文件
  let compath = "./wenzhang/comments/" + v; //评论文件地址
  if (!fs.existsSync(compath)) {
    //添加空评论记录
    commets.push([]);
    continue; //跳过
  }
  let cstr = fs.readFileSync(compath);
  let cobj = xjson.parseString(cstr, {
    explicitArray: false,
    ignoreAttrs: false
  }, (err, result) => {
    //没有评论 没有内容
    //处理 确定 commentlist为数组 reps为数组
    try {
      if (result.root.comment == undefined) {
        commets.push([]);
        return;
      }
    } catch (e) {
      commets.push([]);
      return;
    }
    //以上确保存在result root comment
    //就一个评论的情况
    if (!(result.root.comment instanceof Array)) result.root.comment = [result.root.comment];
    for (let v of result.root.comment) {
      if (v.rep == undefined) v.rep = []; //没有回复的情况
      if (!(v.rep instanceof Array)) v.rep = [v.rep]; //就一个回复的情况 转换为数组
    }
    commets.push(result.root.comment); //直接保存一个数组列表
  });
}
//读取信息
const path = "./info.xml";
let str = fs.readFileSync(path);
let info = {};
xjson.parseString(str, {
  explicitArray: false,
  ignoreAttrs: true
}, (err, result) => {
  info = result.root;
});

//目录处理
while (list.length < files.length - 1); //等待文件读取完成
let mlist = [];
for (let o of list) {
  //处理生成目录列表
  let obj = {};
  obj.title = o.title;
  obj.time = o.time;
  obj.img = o.img;
  obj.text = o.text.length > 50 ? o.text.slice(0, 50) + "......" : o.text;
  mlist.push(obj);
}
//工具函数
let getDatestr = (tm) => {
  //得到日期
  return tm.getFullYear() + "-" + tm.getMonth() + "-" + tm.getDay();
}
let getTimestr = (temp) => {
  //得到时间
  let h = temp.getHours();
  let m = temp.getMinutes();
  let s = temp.getSeconds();
  return h + ":" + m + ":" + s;
}
//
//前端客户记录……
let tm = new Date();
let fpath = "./logs/" + getDatestr(tm) + ".log";
// if(!fs.exists(fpath)){
//   let temp=fs.openSync(fpath,"a+");
//   fs.close(temp);
// }
let logfile = fs.createWriteStream(fpath, {
  flags: "a+",
  autoClose: true
});
//
//日志记录函数
let log = (str) => {
  let temp = new Date();
  let h = temp.getHours();
  let m = temp.getMinutes();
  let s = temp.getSeconds();
  logfile.write("[" + getTimestr(temp) + "]" + "\t" + str + "\n");
}
app.get('/list', function (req, res) {
  res.send(JSON.stringify(mlist));
  //
  log(req.ip + "获取博客列表");
});
app.get('/cont', function (req, res) {
  var id = req.query.id;
  res.send(JSON.stringify(list[id]));
  log(req.ip + "获取文章 id=" + id + " 标题：" + list[id].title);
});
app.get('/comment', (req, res) => {
  var id = req.query.id;
  if (commets.length <= id) res.send(JSON.stringify(null));
  else res.send(JSON.stringify(commets[id]));
  log(req.ip + "获取评论 文章id:" + id);
});
app.get('/info', function (req, res) {
  res.send(JSON.stringify(info));
  log(req.ip + "访问");
});
//解析json数据
let bparse = require("body-parser");
// app.use(bparse.json({type:'text/json'}));
// app.use(bparse.urlencoded({       
//   extended: true
// }));
app.use(bparse.text());
let builder = new xjson.Builder({
  explicitArray: false,
  ignoreAttrs: true
});
app.post('/comment/submit', (req, res) => {
  try {
    let jsobj = JSON.parse(req.body);
    let title = jsobj.data.title;
    let text = jsobj.data.text;
    let id = jsobj.infodata.id;
    if (id >= list.length) {
      res.send("");
      log(req.ip + "添加回复：文章号:" + id + "评论号:" + mid + "失败! 原因：文章号越界");
      return;
    }
    let name = files[id]; //获得对应xml文件名
    let path = "wenzhang/comments/" + name; //得到xml文件路径
    let obj = commets[id]; //得到文章对应的评论列表

    //构造评论对象
    let tm = new Date();
    let mobj = {
      title: title,
      time: getDatestr(tm) + " " + getTimestr(tm),
      content: text,
      ip: req.ip,
      rep: []
    };
    obj.push(mobj);
    //写入xml
    let xmlstr = builder.buildObject({
      root: {
        comment: obj
      }
    });
    fs.writeFile(path, xmlstr);//这里不知为何 用async版本会导致文件变空 但是后来实验还好

    //完成
    res.send("OK");
    //评论提交到这里
    log(req.ip + "提交评论 标题：" + title);
  } catch (e) {
    res.send("");
    log(req.ip + "提交评论 错误！");
  }
});
app.post("/comment/rep", (req, res) => {
  //参数 文章id 评论id
  try {
    let jsobj = JSON.parse(req.body);
    let id = jsobj.infodata.id;
    let mid = jsobj.infodata.mid;
    //数据 
    let text = jsobj.data.text;
    if (id >= list.length) {
      res.send("");
      log(req.ip + "添加回复：文章号:" + id + "评论号:" + mid + "失败! 原因：文章号越界");
      return;
    }

    //取得文件和对象
    let name = files[id]; //获得对应xml文件名
    let path = "wenzhang/comments/" + name; //得到xml文件路径
    let obj = commets[id]; //得到文章对应的评论列表
    //检测
    if (mid >= obj.length) {
      res.send("");
      log(req.ip + "添加回复：文章号:" + id + "评论号:" + mid + "失败! 原因：评论号越界");
      return;
    }
    //评论号符合要求 继续
    let reps = obj[mid].rep; //取得评论对应的回复列表
    let tm = new Date();
    //构造回复对象
    let robj = {
      time: getDatestr(tm) + "  " + getTimestr(tm),
      content: text,
      ip: req.ip
    };

    //插回复到回复列表中
    reps.push(robj);
    //写入xml
    let xmlstr = builder.buildObject({
      root: {
        comment: obj
      }
    });
    fs.writeFile(path, xmlstr);
    res.send("OK");
    log(req.ip + "添加回复：文章号:" + id + "评论号:" + mid + '评论标题:' + obj[mid].title);
  } catch (e) {
    res.send("");
    log(req.ip + "添加回复 错误！");
  }


});

var sum = 0;
app.listen(1000, function () {
  console.log("connect " + sum++);
});
//由于异步的原因 数组无法保证保存顺序 因此 以上存储结构不适用 
//应该使用Map 来存储使用唯一标识符作为文件名和id
//并使用排序算法进行按时间排序
//综上所述 最好使用数据库
//每隔一段时间重新