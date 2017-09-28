var minimist=require('minimist');

module.exports=function(){
	var argv = minimist(process.argv.slice(2));
	var origin = JSON.parse(process.env.npm_config_argv).original;
	var npmArgv = minimist(origin.slice(origin.length-1))
	argv=Object.assign(argv,npmArgv);
	return argv
}