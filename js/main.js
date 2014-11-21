// Tools

TOOLS = {
  getDate : function(){
    var d = new Date();
    return d.getHours() + ":" + d.getMinutes() + " " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
  }
}

// Chat

CHAT = {
  msg_pattern : '<div class="message"><div class="message-header"><div class="message-name">#{{name}}</div><div class="message-date">{{date}}</div></div><div class="message-body">{{content}}</div></div>',
  launch_triggers : function(){
    $("#send-button").click(function(){
      var name = $("#name-input").val(),
          content = $("#content-input").val();
      if(name === ""){
        alert("You must select a name before chatting.");
      } else if(content ===""){
        alert("You didn't write a message to send !");
      } else {
        $("#chat-tips").hide();
        CHAT.addMsg(name, TOOLS.getDate(), content);
        $("#content-input").val("");
      }
    });
  },
  addMsg : function(name, date, content){
      $("#chat").append(CHAT.msg_pattern.replace("{{name}}", name).replace("{{date}}", date).replace("{{content}}", content));
  }
}

CHAT.launch_triggers();

// RaphaelJS

var canvasWidth = $("#canvas").width(),
    canvasHeight = $(window).height() - $("header").height() - $("#chat-box").height() - 5;
var paper = Raphael("canvas", canvasWidth, canvasHeight);
var initTips = paper.image("img/add.svg", canvasWidth / 2 - 40, canvasHeight / 2 - 40, 80, 80).mouseover(function(){
  this.animate( {transform: "r45"}, 1000, 'bounce');
}).mouseout(function(){
  this.animate({transform: "r-45"}, 1000, 'bounce');
}).click(function(e){
  this.animate({height: "0", width : "0", x : canvasWidth / 2, y : canvasHeight / 2}, 100, '>', function(){
    this.remove();
    modifyBox(e.clientX, e.clientY, "");
  });
});

function modifyBox(x, y, content){
  $("#create-box").css("display", "block");
  $("#create-box").css("left", x);
  $("#create-box").css("top", y);
  $("#create-box-content-input").focus();
}

function bubble(x, y, content){

  // Text
  var text = paper.text(x, y, content),
      box = text.getBBox();

  // Bubble
  var metrics = {xcenter : box.x / 2 + box.x2 / 2,
                 ycenter : box.y / 2 + box.y2 / 2,
                 yrad : box.width + 5,
                 xrad : box.height + 5};

  var ellipse = paper.ellipse(metrics.xcenter, metrics.ycenter, metrics.yrad, metrics.xrad);

  return {text : text, ellipse : ellipse};
}
