var {execFile,exec} = require('child_process');

exec('git push',{cwd:'D:/test/text-node/'},function(a,b,c){
    console.log(a)
    console.log(b)
    console.log(c)
})