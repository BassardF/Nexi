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
      $("#chat").append(CHAT.msg_pattern
          .replace("{{name}}", name)
          .replace("{{date}}", date)
          .replace("{{content}}", content));
  }
}

// RaphaelJS

var DRAW = {
  tmp : {
    nodes : []
  },

  init : function(){
    DRAW.tmp.canvasWidth = $("#canvas").width();
    DRAW.tmp.canvasHeight = $(window).height() - $("header").height() - $("#chat-box").height() - 5;
    DRAW.tmp.paper = Raphael("canvas", DRAW.tmp.canvasWidth, DRAW.tmp.canvasHeight);

    DRAW.tmp.initTips = DRAW.tmp.paper.image("img/add.svg", DRAW.tmp.canvasWidth / 2 - 40, DRAW.tmp.canvasHeight / 2 - 40, 80, 80).mouseover(function(){
      this.animate( {transform: "r45"}, 1000, 'bounce');
    }).mouseout(function(){
      this.animate({transform: "r-45"}, 1000, 'bounce');
    }).click(function(e){
      this.animate({height: "0", width : "0", x : DRAW.tmp.canvasWidth / 2, y : DRAW.tmp.canvasHeight / 2}, 100, '>', function(){
        this.remove();
        DRAW.createBox(e.clientX, e.clientY, "");
        DRAW.tmp.lastClickPos = {x : e.clientX, y : e.clientY};
      });
    });

    $("#canvas").click(function(e){
      if (e.target.nodeName == "svg"){
          if(DRAW.tmp.initTips !== null & DRAW.tmp.initTips.node !== null){
            DRAW.tmp.initTips.animate({height: "0", width : "0", x : DRAW.tmp.canvasWidth / 2, y : DRAW.tmp.canvasHeight / 2}, 100, '>', function(){
              this.remove();
              DRAW.tmp.lastClickPos = {x : e.clientX, y : e.clientY};
              DRAW.createBox(e.clientX, e.clientY, "");
            });
          } else{
            DRAW.tmp.lastClickPos = {x : e.clientX, y : e.clientY};
            DRAW.createBox(e.clientX, e.clientY, "");
          }
        }
    });
  },

  launch_triggers : function(){
    $("#create-box-check").click(function(){
      DRAW.bubble(DRAW.tmp.lastClickPos.x, DRAW.tmp.lastClickPos.y - $("header").height() - $("#chat-box").height() - 5, $("#create-box-content-input").val());
      $("#create-box").css("display", "none");
      $("#create-box-content-input").val('');
    });

    $("#create-box-delete").click(function(){
      $("#create-box").css("display", "none");
      $("#create-box-content-input").val('');
    });
  },

  createBox : function(x, y, content){
    $("#create-box").css("display", "block")
                    .css("left", x - 312 / 2)
                    .css("top", y - 64 / 2);
    $("#create-box-content-input").focus();
  },

  bubble : function(x, y, content){
    // Text
    var text = DRAW.tmp.paper.text(x, y, content),
        box = text.getBBox();

    // Bubble
    var metrics = {xcenter : box.x / 2 + box.x2 / 2,
                  ycenter : box.y / 2 + box.y2 / 2,
                  yrad : box.width + 5,
                  xrad : box.height + 5};

    var ellipse = DRAW.tmp.paper.ellipse(metrics.xcenter, metrics.ycenter, metrics.yrad, metrics.xrad);

    DRAW.tmp.nodes.push({text : text, ellipse : ellipse});
  }
}

// main

CHAT.launch_triggers();
DRAW.init();
DRAW.launch_triggers();
