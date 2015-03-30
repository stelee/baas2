declare function require(path:String);
type TRouterTable={[id:string]:string};

module Main{

  var http=require("http"),
    logger=require("./utils/log").Logger.getInstance(),
    router=require("./router/router").Router.getInstance();

  export class Config{
    port:Number;
    listener:String;
    routerTable:TRouterTable;
    constructor(listener:String="0.0.0.0",port:Number=9000,routerTable:TRouterTable={}){
      this.listener=listener;
      this.port =port;
      this.routerTable=routerTable;
    }
    public configRouterTable(routerTable:TRouterTable){
      this.routerTable=routerTable;
    }
  }
  export class Main{
    public run(config:Config){
      logger.info("start the service at "+config.listener+" : "+config.port);
      router.config(config.routerTable);
      http.createServer((req,res)=>{
        //TODO:
        //you can add middlewhere here
        //should use promise to process the req, res
        //because middleware may be running asynchronized
        router.process(req,res);
      }).listen(config.port,config.listener);
    }
  }
}

var main=new Main.Main();
//config start
var config=new Main.Config();
config.configRouterTable({
  "/": "index",
  "/hello/(\\w*)" : "bonjour"
})
//config end
main.run(config);
