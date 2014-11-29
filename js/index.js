var DRAW = {

  tmp : {
    colors : ["#00CEEA", "#AB1EC0", "#3182A3", "#23BF20"],
    growth : 0
  },

  init : function(){
    DRAW.tmp.height = $(window).height();
    DRAW.tmp.width = $(window).width();
    DRAW.tmp.paper = Raphael("canvas", DRAW.tmp.width, DRAW.tmp.height);
  },

  logo : function(){
    DRAW.tmp.logo = DRAW.tmp.paper.image("img/logo-white.png", DRAW.tmp.width / 2 - 150, DRAW.tmp.height / 4 - 60, 300, 120).toFront();
  },

  center : function(x){
    var color = "#FB595D";
    DRAW.tmp.paper.circle(DRAW.tmp.width / 2, DRAW.tmp.height / 2, 20 + x).attr({"fill" : color, "stroke" : color});
    DRAW.tmp.logo.toFront();
  },

  circle : function(){
    if(DRAW.tmp.growth <= DRAW.tmp.width / 2){
      setTimeout(function(){
        DRAW.circle();
      }, 50);
    } else{
      setTimeout(function(){
        DRAW.endAnim();
      }, 1050);
    }
    var x = Math.floor(Math.random() * DRAW.tmp.width),
        y = Math.floor(Math.random() * DRAW.tmp.height),
        r = Math.floor(Math.random() * 20 + 1),
        color = DRAW.tmp.colors[Math.floor(Math.random() * 4)],
        opacity = Math.random();

    var circle = DRAW.tmp.paper.circle(x, y, r).attr({"fill" : color, "stroke" : color, "opacity" : 1}).toBack().animate({
      "cx" : DRAW.tmp.width / 2,
      "cy" : DRAW.tmp.height / 2,
      opacity : 1
    }, 1000, "linear", function(){
      DRAW.center(DRAW.tmp.growth);
      DRAW.tmp.growth += 20;
    });
  },

  endAnim : function(){
    DRAW.tryButton();
    DRAW.quidButton();
  },

  tryButton : function(){
    var x = DRAW.tmp.width / 2 - 100,
        y = DRAW.tmp.height / 2 + DRAW.tmp.height / 6 - 30,
        wd = 200,
        ht = 60,
        rect = DRAW.tmp.paper.rect(x, y, wd, ht, 5).attr({
          "stroke" : "#fcfcfc",
          "stroke-width" : 3,
          "opacity" : 0,
          "cursor" : "pointer"
        }).animate({
          opacity : 1
        }, 500, ">", function(){}),
        text = DRAW.tmp.paper.text(x + wd / 2, y + ht / 2, "Try").attr({
          "fill" : "#fcfcfc",
          "font-size" : "18",
          "opacity" : 0,
          "cursor" : "pointer"
        }).animate({
          opacity : 1
        }, 500, ">", function(){});

      DRAW.tmp.tryButton = {
        rect : rect,
        text : text
      };

      rect.hover(function(){
        DRAW.tmp.tryButton.rect.animate({"fill" : "#fcfcfc"}, 150, ">");
        DRAW.tmp.tryButton.text.animate({"fill" : "#FB595D"}, 150, ">");
      }, function(){
        DRAW.tmp.tryButton.rect.animate({"fill" : "#FB595D"}, 150, ">");
        DRAW.tmp.tryButton.text.animate({"fill" : "#fcfcfc"}, 150, ">");
      });

      text.hover(function(){
        DRAW.tmp.tryButton.rect.animate({"fill" : "#fcfcfc"}, 150, ">");
        DRAW.tmp.tryButton.text.animate({"fill" : "#FB595D"}, 150, ">");
      }, function(){
        DRAW.tmp.tryButton.rect.animate({"fill" : "#FB595D"}, 150, ">");
        DRAW.tmp.tryButton.text.animate({"fill" : "#fcfcfc"}, 150, ">");
      });
  },

  quidButton : function(){
    var x = DRAW.tmp.width / 2 - 100,
    y = DRAW.tmp.height / 2 + DRAW.tmp.height / 6 - 30 + 80,
    wd = 200,
    ht = 60,
    rect = DRAW.tmp.paper.rect(x, y, wd, ht, 5).attr({
      "stroke" : "#fcfcfc",
      "stroke-width" : 3,
      "opacity" : 0,
      "cursor" : "pointer"
    }).animate({
      opacity : 1
    }, 500, ">", function(){}),
    text = DRAW.tmp.paper.text(x + wd / 2, y + ht / 2, "Quid ?").attr({
      "fill" : "#fcfcfc",
      "font-size" : "18",
      "opacity" : 0,
      "cursor" : "pointer"
    }).animate({
      opacity : 1
    }, 500, ">", function(){});

    DRAW.tmp.quidButton = {
      rect : rect,
      text : text
    };

    rect.hover(function(){
      DRAW.tmp.quidButton.rect.animate({"fill" : "#fcfcfc"}, 150, ">");
      DRAW.tmp.quidButton.text.animate({"fill" : "#FB595D"}, 150, ">");
    }, function(){
      DRAW.tmp.quidButton.rect.animate({"fill" : "#FB595D"}, 150, ">");
      DRAW.tmp.quidButton.text.animate({"fill" : "#fcfcfc"}, 150, ">");
    });

    text.hover(function(){
      DRAW.tmp.quidButton.rect.animate({"fill" : "#fcfcfc"}, 150, ">");
      DRAW.tmp.quidButton.text.animate({"fill" : "#FB595D"}, 150, ">");
    }, function(){
      DRAW.tmp.quidButton.rect.animate({"fill" : "#FB595D"}, 150, ">");
      DRAW.tmp.quidButton.text.animate({"fill" : "#fcfcfc"}, 150, ">");
    });

    rect.click(function(){
      DRAW.quidAnimation();
    });

    text.click(function(){
      DRAW.quidAnimation();
    });
  },

  quidAnimation : function(){
    DRAW.tmp.quidButton.rect.animate({"opacity" : 0}, 150, ">");
    DRAW.tmp.quidButton.text.animate({"opacity" : 0}, 150, ">", function(){
      DRAW.tmp.quidButton.text.remove();
      DRAW.tmp.quidButton.rect.remove();
      DRAW.tmp.tryButton.rect.animate({"y" : DRAW.tmp.height - DRAW.tmp.tryButton.rect.attr("height") - 30}, 150, ">", function(){
        DRAW.whiteBox();
      });
      DRAW.tmp.tryButton.text.animate({"y" : DRAW.tmp.height - DRAW.tmp.tryButton.rect.attr("height") / 2 - 30}, ">");
    });

    var x = DRAW.tmp.logo.attr(x);
    DRAW.tmp.logo.animate({"opacity" : 0}, 150, ">", function(){DRAW.tmp.logo.remove()});
  },

  whiteBox : function(){
    var height = DRAW.tmp.tryButton.rect.attr("y") - 30;
    console.log(height);
    DRAW.tmp.whiteBox = DRAW.tmp.paper.rect(0, 0, DRAW.tmp.width, 0).attr({"stroke" : "#ddd", "fill" : "#fcfcfc"}).animate({"height" : height}, 150, ">", function(){DRAW.tips()}).toFront();
  },

  tips : function(){
    var height = DRAW.tmp.whiteBox.attr("height");

    // left
    var left = {
      h : height / 2,
      w : height / 2 * 477 / 287
    };
    DRAW.tmp.teftTitle = DRAW.tmp.logo = DRAW.tmp.paper.image("img/logo-pink.png", 15, 15, 150, 60).toFront();
    DRAW.tmp.leftTips = DRAW.tmp.paper.image("img/sample-mapper.png", DRAW.tmp.width / 4 - left.w / 2 , height / 2 - left.h / 2, left.w, left.h).attr({"opacity" : 0}).animate({"opacity" : 1}, 500, ">").toFront();

    // right
    DRAW.tmp.paper.circle(DRAW.tmp.width / 2 + 30, height / 5, 30).attr({"opacity" : 0, "fill" : DRAW.tmp.colors[0], "stroke" : DRAW.tmp.colors[0]}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.image("img/png/bulb-white.png", DRAW.tmp.width / 2 + 30 - 15, height / 5 - 15, 30, 30).attr({"opacity" : 0}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.text(DRAW.tmp.width / 2 + 30 + 40, height / 5, "Boost your creativity").attr({"opactity" : 0, "font-size" : "16", "text-anchor" : "start", "fill" : "#222222"}).animate({"opacity" : 1}, 500, ">").toFront();

    DRAW.tmp.paper.circle(DRAW.tmp.width / 2 + 30, 2 * height / 5, 30).attr({"opacity" : 0, "fill" : DRAW.tmp.colors[1], "stroke" : DRAW.tmp.colors[1]}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.image("img/png/atomic-white.png", DRAW.tmp.width / 2 + 30 - 15, 2 * height / 5 - 15, 30, 30).attr({"opacity" : 0}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.text(DRAW.tmp.width / 2 + 30 + 40, 2 * height / 5, "Structure your thoughts").attr({"opactity" : 0, "font-size" : "16", "text-anchor" : "start", "fill" : "#222222"}).animate({"opacity" : 1}, 500, ">").toFront();

    DRAW.tmp.paper.circle(DRAW.tmp.width / 2 + 30, 3 * height / 5, 30).attr({"opacity" : 0, "fill" : DRAW.tmp.colors[2], "stroke" : DRAW.tmp.colors[2]}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.image("img/png/users-white.png", DRAW.tmp.width / 2 + 30 - 15, 3 * height / 5 - 15, 30, 30).attr({"opacity" : 0}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.text(DRAW.tmp.width / 2 + 30 + 40, 3 * height / 5, "Share with your team").attr({"opactity" : 0, "font-size" : "16", "text-anchor" : "start", "fill" : "#222222"}).animate({"opacity" : 1}, 500, ">").toFront();

    DRAW.tmp.paper.circle(DRAW.tmp.width / 2 + 30, 4 * height / 5, 30).attr({"opacity" : 0, "fill" : DRAW.tmp.colors[3], "stroke" : DRAW.tmp.colors[3]}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.image("img/png/hand-white.png", DRAW.tmp.width / 2 + 30 - 15, 4 * height / 5 - 15, 30, 30).attr({"opacity" : 0}).animate({"opacity" : 1}, 500, ">").toFront();
    DRAW.tmp.paper.text(DRAW.tmp.width / 2 + 30 + 40, 4 * height / 5, "Free of charge").attr({"opactity" : 0, "font-size" : "16", "text-anchor" : "start", "fill" : "#222222"}).animate({"opacity" : 1}, 500, ">").toFront();
  }
}

DRAW.init();
DRAW.logo();
DRAW.circle();
