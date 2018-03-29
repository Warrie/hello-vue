//传入一个url，dir来读取静态文件

const path=require('path');
const mime=require('mime');
const fs=require('mz/fs');

function staticFiles(url,dir){
    return async (ctx,next)=>{
        let rpath=ctx.request.path;
        // console.log(`process ${rpath} ...`)
        if(rpath.startsWith(url)){
            let fp=path.join(dir,rpath.substring(url.length));//组成文件路径
            if(await fs.exists(fp)){
                ctx.response.type=mime.lookup(fp);//查找文件的mime
                ctx.response.body=await fs.readFile(fp);
            }else{
                ctx.response.status=404;
            }
        }else{
            await next();//不是指定的url
        }
    }
}

module.exports=staticFiles;