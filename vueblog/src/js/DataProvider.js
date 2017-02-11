//数据提供者
let DataProvider;
let list = [];
let getlistfun = (cbk) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:1000/list', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        list = JSON.parse(xhr.responseText);
        cbk(); //通知加载完成
      }
    }
  };
  xhr.send();
}
export default DataProvider = {
  getlist(cbk) {
    let trans=() => {
      //获取列表
      let ret = [];
      for (let t = 0; t < list.length; ++t) {
        let obj = list[t];
        obj.id = t;
        ret.push(obj);
      }
      cbk(ret);
    };
    if(list.length!=0) trans();//直接返回
    getlistfun(trans);

  },
  getcont(id, cbk) {
    //获取文章
    let ret = null;
    let xhr=new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:1000/cont?id=' + id, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          ret = JSON.parse(xhr.responseText);
          cbk(ret);
        }
      }
    };
    xhr.send();
  }
};
