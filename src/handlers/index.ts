import handler = require("./baseHandler");

class Index extends handler.BaseHandler{
  response:any;
  public get(){
    this.writeToJSON("hello,world")
  }
}
export function getInstance()
{
  return new Index();
}
