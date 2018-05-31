var animate;
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitcancelAnimationFrame || window.webkitcancelAnimationFrame || window.mscancelAnimationFrame || window.ocancelAnimationFrame;
var Snow = {
  init: function(){
    //设置canvas的宽高
    this.setCanvasSize();
    //初始化背景色
    this.initBackground();
    //初始化雪花
    this.initSnow();
  },
  initBackground: function(){
    this.ctx.fillStyle = '#2fa6ad';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  },
  initSnow: function(){
    this.arrX = [];
    this.arrY = [];
    this.arrR = [];
    for(var i = 0; i < 100; i ++){
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.r = Math.random() * 10;
      var grd = this.ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r);
      grd.addColorStop(0,'rgba(255,255,255,0.9)');
      grd.addColorStop(0.5,'rgba(255,255,255,0.5)');
      grd.addColorStop(1,'rgba(255,255,255,0)');
      this.ctx.fillStyle = grd;
      this.ctx.fillRect(this.x - this.r,this.y - this.r,this.r*2,this.r*2);
      this.arrX.push(this.x);
      this.arrY.push(this.y);
      this.arrR.push(this.r);
    }
  },
  draw: function(){
    //清空画布
    this.clearCanvas();
    //重绘背景
    this.drawBackground();
    //重绘雪花位置
    this.drawSnow();
  },
  clearCanvas: function(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  },
  drawBackground: function(){
    this.ctx.fillStyle = '#2fa6ad';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  },
  drawSnow: function(){
    var _this = this;
    this.arrX.forEach(function(val,i){
      var random_x = 27 + Math.random() * 100;
      var random_y = 0.4 + Math.random() * 1.4;
      _this.arrY[i] += random_y;
      _this.arrX[i] += 0.5 * Math.sin(_this.arrY[i]/random_x);
      if(_this.arrY[i] >= _this.canvas.height){
        _this.arrY[i] = 0;
      }
      if(_this.arrX[i] >= _this.canvas.width){
        _this.arrX[i] = 0;
      }
      var grd = _this.ctx.createRadialGradient(_this.arrX[i],_this.arrY[i],0,_this.arrX[i],_this.arrY[i],_this.arrR[i]);
      grd.addColorStop(0,'rgba(255,255,255,0.9)');
      grd.addColorStop(0.5,'rgba(255,255,255,0.5)');
      grd.addColorStop(1,'rgba(255,255,255,0)');
      _this.ctx.fillStyle = grd;
      _this.ctx.fillRect(_this.arrX[i] - _this.arrR[i],_this.arrY[i] - _this.arrR[i],_this.arrR[i]*2,_this.arrR[i]*2);
    });
  },
  run: function(){
    Snow.draw();
    animate = requestAnimationFrame(Snow.run);
  },
  setCanvasSize: function(){
    this.canvas = document.querySelector('.snow');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
  }
}
Snow.init();
// Snow.run();
var Button = {
  init: function(){
    //按钮切换
    this.buttonSwitch();
  },
  buttonSwitch: function(){
    var btn = document.querySelector('.btn');
    btn.addEventListener('click',function(event){
      event.stopPropagation();
      var type = this.getAttribute('data-type');
      if(type === '1'){
        Snow.run();
        this.setAttribute('data-type','2');
      }else if(type === '2'){
        cancelAnimationFrame(animate);
        this.setAttribute('data-type','1');
      }
    },false);
  }
}
Button.init();

