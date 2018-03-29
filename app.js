//导入class Koa
const Koa=require('koa');

// const router=require('koa-router')();//返回函数
// const bodyParser=require('koa-bodyparser');
// const templating=require('./templating');
// const controller=require('./controller');//注册route的函数放进来


const app=new Koa();//实例化一个对象代表webapp本身
//app创建请求处理服务器函数
const isProduction=process.env.NODE_ENV==='production';

// 第一个middleware是记录url以及页面执行时间
app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start=new Date().getTime(),
        execTime;
    await next();
    execTime=new Date().getTime()-start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
});

// 第二个middleware处理静态文件
if(!isProduction){
    // console.log('process static...') 
    let staticFiles=require('./static-files');
    app.use(staticFiles('/static/',__dirname+'/static'));
}

//第三个解析POST
// app.use(bodyParser());//在router之前注册，吧POST的内容直接转化为body

// // 第四个给ctx加上render()方法
// app.use(templating('views',{
//     noCache:!isProduction,
//     watch:!isProduction
// }))



// // 最后处理url路由
// // app.use(router.routes());
// app.use(controller('controllers'));




//监听
app.listen(3000);
console.log('app started at port 3000');
