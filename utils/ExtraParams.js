var minimist=require('minimist');

module.exports=function(){
	var argv = minimist(process.argv.slice(2));
	var npmArgv = {};
	if(process.env.npm_config_argv){
		var origin = JSON.parse(process.env.npm_config_argv).original;
		npmArgv = minimist(origin.slice(origin.length-1));
	}
	argv=Object.assign(argv,npmArgv);
	return argv
}