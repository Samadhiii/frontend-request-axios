# frontend-request-axios
a frontend request with axios

##### commonRequest函数有三个参数，分别为：

name|默认值|是否必填|备注|示例
--|:--:|:--:|:--:|--:
data|无|是|请求提交的数据|{test:test}
api|无|是|请求的url，url为键值对，其中包含url与method，分别表情请求的路径与方法|{url:'/test', method:'post'}
solve|无|否|若没有slove参数，请求函数自动拦截请求错误，并执行报错，若有slove参数，则代表前端需要在请求的具体地方来处理错误| 'slove'
  - data (required)
    请求提交的数据
  - api (required)
    请求的url，url为键值对，其中包含url与method，分别表情请求的路径与方法
  - solve
    solve为可选参数
    若没有slove参数，请求函数自动拦截请求错误，并执行报错
    若有slove参数，则代表前端需要在请求的具体地方来处理错误


##### 使用示例


    commonRequest({test: 'test'},{url: '/test', method: 'post'})
        .then((response) => {
        console.log(response);
    });

    commonRequest(
        {test: 'test'},
        {url: '/test', method: 'post'}, 
        'slove')
        .then((response) => {
            if(response.code === 200){
              request success  balabala....
            } else {
              request failed    balabala...
            }
    })


- axios中文文档
[axios](https://www.kancloud.cn/yunye/axios/234845)

  
