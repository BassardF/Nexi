/* Tools */

TOOLS = {

  getDate : function(){
    var d = new Date();
    return d.getHours() + ":" + d.getMinutes() + " " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
  }

}

/* Chat */

CHAT = {

  // Templates : {{name}}, {{date}} & {{content}}
  msg_pattern : '<div class="message box"><div class="message-header"><div class="message-name">#{{name}}</div><div class="message-date">{{date}}</div></div><div class="message-body">{{content}}</div></div>',

  launch_triggers : function(){
    $("#send-button").click(function(){
      var name = $("#name-input").val(),
          content = $("#content-input").val();
      if(name === ""){
        // TODO : improved solution
        alert("You must select a name before chatting.");
      } else if(content ===""){
        // TODO : improved solution
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

/* RaphaelJS */

// Connect two objects, line = color
Raphael.fn.connection = function (obj1, obj2, line, bg) {
  if (obj1.line && obj1.from && obj1.to) {
    line = obj1;
    obj1 = line.from;
    obj2 = line.to;
  }
  var bb1 = obj1.getBBox(),
  bb2 = obj2.getBBox(),
  p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
  {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
  {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
  {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
  {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
  {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
  {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
  {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
  d = {}, dis = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 4; j < 8; j++) {
      var dx = Math.abs(p[i].x - p[j].x),
      dy = Math.abs(p[i].y - p[j].y);
      if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
        dis.push(dx + dy);
        d[dis[dis.length - 1]] = [i, j];
      }
    }
  }
  if (dis.length == 0) {
    var res = [0, 4];
  } else {
    res = d[Math.min.apply(Math, dis)];
  }
  var x1 = p[res[0]].x,
  y1 = p[res[0]].y,
  x4 = p[res[1]].x,
  y4 = p[res[1]].y;
  dx = Math.max(Math.abs(x1 - x4) / 2, 10);
  dy = Math.max(Math.abs(y1 - y4) / 2, 10);
  var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
  y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
  x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
  y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
  var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
  if (line && line.line) {
    line.bg && line.bg.attr({path: path});
    line.line.attr({path: path});
  } else {
    var color = typeof line == "string" ? line : "#000";
    return {
      bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
      line: this.path(path).attr({stroke: color, fill: "none"}),
      from: obj1,
      to: obj2
    };
  }
};

// Set a Set Draggable
Raphael.st.draggable = function() {
  var me = this,
  lx = 0,
  ly = 0,
  ox = 0,
  oy = 0,
  moveFnc = function(dx, dy) {
    lx = dx + ox;
    ly = dy + oy;
    me.transform('t' + lx + ',' + ly);
    for (var i = DRAW.tmp.connections.length; i--;) {
      DRAW.tmp.paper.connection(DRAW.tmp.connections[i]);
    }
    DRAW.tmp.paper.safari();
  },
  startFnc = function() {
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
  },
  endFnc = function() {
    ox = lx;
    oy = ly;
  };
  this.drag(moveFnc, startFnc, endFnc);
};

var DRAW = {
  tmp : {
    // every creates set : [0] = text, [1] = ellipse
    nodes : [],
    // links between elements lists
    connections : []
  },

  init : function(){
    DRAW.tmp.canvasWidth = $("#canvas").width();
    DRAW.tmp.canvasHeight = $(window).height() - $("header").height() - $("#tool-bar").height() - 35;
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

    $("#modify-box-check").click(function(){
      DRAW.tmp.currentModifElement.attr("text", $("#modify-box-content-input").val());
      $("#modify-box").css("display", "none");
      $("#modify-box-content-input").val('');
      DRAW.redrawEllipses();
    });

    $("#modify-box-delete").click(function(){
      DRAW.tmp.currentModifElement.remove();
      $("#modify-box").css("display", "none");
      $("#modify-box-content-input").val('');
      DRAW.redrawEllipses();
    });
  },

  createBox : function(x, y, content){
    $("#create-box").css("display", "block")
                    .css("left", x - 312 / 2)
                    .css("top", y - 64 / 2);
    $("#create-box-content-input").focus();
  },

  modifyBox : function(x, y, content){
    $("#modify-box").css("display", "block")
                    .css("left", x - 312 / 2)
                    .css("top", y - 64 / 2);
    $("#modify-box-content-input").val(content);
  },

  bubble : function(x, y, content){
    // Text
    var text = DRAW.tmp.paper.text(x, y, content).attr({"font-size" : 13, "fill" : "#222222", cursor: "move"}),
        box = text.getBBox();

    // Bubble
    var metrics = {xcenter : box.x / 2 + box.x2 / 2,
                  ycenter : box.y / 2 + box.y2 / 2,
                  yrad : box.width / 2 + 15,
                  xrad : box.height / 2 + 15};

    var ellipse = DRAW.tmp.paper.ellipse(metrics.xcenter, metrics.ycenter, metrics.yrad, metrics.xrad).attr({"stroke" : "#222222", "stroke-width" : "1", "fill" : "white", cursor: "move"}).toBack();

    var nodeSet = DRAW.tmp.paper.set();
    nodeSet.push(text);
    nodeSet.push(ellipse);
    nodeSet.draggable();
    DRAW.tmp.nodes.push(nodeSet);

    ellipse.onDragOver(function(target){
      DRAW.addConnection(this, target);
    });

    text.onDragOver(function(target){
      DRAW.addConnection(this, target);
    });

    ellipse.click(function(e){
      for (var i = DRAW.tmp.nodes.length; i--;){
        if(DRAW.tmp.nodes[i].items[1].id === this.id){
          var text = DRAW.tmp.nodes[i].items[0];
          DRAW.modifyBox(e.clientX, e.clientY, text.attr("text"));
          DRAW.tmp.currentModifElement = text;
        }
      }
    });

    text.click(function(e){
      DRAW.modifyBox(e.clientX, e.clientY, this.attr("text"));
      DRAW.tmp.currentModifElement = this;
    });

  },

  addConnection : function(shape1, shape2){
    if (shape2.type !== "ellipse" || (shape1.type !== "ellipse" && shape1.type !== "text")){
      return ;
    }
    if(shape1.type == "text"){
      for (var i = DRAW.tmp.nodes.length; i--;){
        if(DRAW.tmp.nodes[i].items[0].id === shape1.id){
          shape1 = DRAW.tmp.nodes[i].items[1];
        }
        if(shape1.id === shape2.id){
          return ;
        }
      }
    }
    for (var i = DRAW.tmp.connections.length; i--;) {
      if((shape1.id == DRAW.tmp.connections[i].from.id && shape2.id == DRAW.tmp.connections[i].to.id) || (shape1.id == DRAW.tmp.connections[i].to.id && shape2.id == DRAW.tmp.connections[i].from.id)){
        return;
      }
    }
    console.log(shape1.type + " " + shape2.type + " ok");
    DRAW.tmp.connections.push(DRAW.tmp.paper.connection(shape1, shape2, "#222222"));
  },

  redrawEllipses : function(){
    for (var i = DRAW.tmp.nodes.length; i--;){
      //the text element has been deleted
      if(DRAW.tmp.nodes[i][0].node == null){
        DRAW.tmp.nodes[i][1].remove();
      } else{
        var textBox = DRAW.tmp.nodes[i][0].getBBox(),
            ellipseBox = DRAW.tmp.nodes[i][1].getBBox();
        //the text doesn't fit into the Ellipse
        if(textBox.width > ellipseBox.width - 15){
          DRAW.tmp.nodes[i][1].attr({"rx" : textBox.width / 2 + 15});
        }
      }

    }
  }
}

// main

CHAT.launch_triggers();
DRAW.init();
DRAW.launch_triggers();
