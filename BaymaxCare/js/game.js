  var canvas, ctx, brushPos, pimplePos;
  var bg;
  var hammer, hamX, hamY;
  var mouseState, mouseFrmLen = 10, mousePress = false;
  var sprites = [];
  var score = 0;
  
  var Sprite = function(w, h, x, y, state, image){
      var self = this;
      this.w = w;
      this.h = h;
      this.x = x;
      this.y = y;
      this.image = image;
      this.state = state;
     
      this.draw = function(){
          if(this.state == 'show'){
              ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
              setTimeout(function(){
                  self.state = 'hide';
              },3000);
          }
      }
  }
 
  function HammerSprite(w, h, x, y, image){
      HammerSprite.prototype.w = w;
      HammerSprite.prototype.h = h;
      HammerSprite.prototype.x = x;
      HammerSprite.prototype.y = y;
     
      HammerSprite.prototype.draw = function(isPress){
          if(isPress){
              ctx.save();
             
              ctx.translate(this.x-10, this.y+34);
              ctx.rotate(Math.PI/180*330);
              ctx.drawImage(image, 0, 0, w, h);
             
              ctx.restore();
          }else{
              ctx.drawImage(image, this.x, this.y, w, h);
          }
         
      }
  }
 
  function clearScreen(){
      ctx.drawImage(bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
 
  function drawScreen(){
      clearScreen();
     
      //绘制得分
    
      ctx.font = "18px 微软雅黑"
      ctx.fillStyle = "#000000";
      ctx.fillText("超能美白队",10,20);
      ctx.fillStyle = "#000000";
      ctx.fillText("得分:"+score,10,60);
     
      for(i=0;i<10;i++){
          for(j=0; j<10; j++){
              sprites[i][j].draw();
          }
      }
     
      if(hammer){
          hammer.draw(mousePress);
      }
  }
 
  function updateLogic(){
 
      for(i=0;i<10;i++){
          for(j=0; j<10; j++){
              sprites[i][j].state=='hide'
          }
      }
     
      var a = Math.round(Math.random()*100)%3;
      var b = Math.round(Math.random()*100)%3;
	  var s = sprites[a][b];
      s.state='show';
	  pimplePos.innerHTML='pimplePos : <'+s.x+' , '+s.y+'>';
  }
 
 
  function hammerMove(e){
      if(hammer){
          hammer.x = event.x-40;
          hammer.y = event.y-40;
      }
  }
 
  function hit(x, y){
     
      for(i=0;i<10;i++){
          for(j=0;j<10;j++){
              var s = sprites[i][j];
             
              if(s.state=='show'){
                  if(x>s.x+30 && y>s.y && x<(s.x+s.w+30) && y<(s.y+s.h)){
                      score++;
                      s.state = 'hide';
                  }
              }
          }
      }
  }
 
  function init(){
      brushPos = document.getElementById('brushPos');
	  pimplePos = document.getElementById('pimplePos');
      canvas = document.getElementById('screen');
      ctx = canvas.getContext('2d');
     
      bg = new Image();
      bg.src = 'bg.jpg';
      bg.onload = function(){};
     
      var hamImg = new Image();
      hamImg.src = 'hammer.png';
      hamImg.onload = function(){
          hammer = new HammerSprite(48, 48, 100, 100, hamImg);
      }
     
      var msImg = new Image();
      msImg.src = 'mouse.png';
     
      msImg.onload = function(){
          for(i=0;i<10;i++){
              var arr = [];
              for(j=0; j<10; j++){
                  var s = new Sprite(18, 18, 80+15*i, 80+15*j, 'hide', msImg);
                  arr[j] = s;
              }
              sprites[i] = arr;
          }     
      }
     
      setInterval(drawScreen, 30);
      setInterval(updateLogic, 3000);
  };
 
  function hammerDown(){
      mousePress = true;
  }
 
  function hammerUp(){
      brushPos.innerHTML='brushPos : <'+event.x+' , '+event.y+'>';
      mousePress = false;
      hit(event.x, event.y);
  }
 
  function hideCursor(obj){
      obj.style.cursor='none';
  }
 
  function showCursor(obj){
      obj.style.cursor='';
  }