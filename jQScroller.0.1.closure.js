(function(b){var c={init:function(a){return this.each(function(){$this=b(this);$this.data(b.extend({hPad:20,vPad:20,scrollWidth:10,readPad:!0,pad:{top:0,left:0,right:0,bottom:0}},a));c.setup.apply(this);c.buildContainer.apply(this);c.buildScroller.apply(this)})},setup:function(){$this=b(this);if($this.data("readPad")){$this.data({pad:{top:parseInt($this.css("paddingTop")),left:parseInt($this.css("paddingLeft")),right:parseInt($this.css("paddingRight")),bottom:parseInt($this.css("paddingBottom"))}});
with($this.data())$this.data({boxHeight:parseInt($this.css("height")),scrollerHeight:parseInt($this.css("height"))})}else with($this.data())$this.css("padding",0),$this.data({boxHeight:parseInt($this.css("height"))+pad.top+pad.bottom,scrollerHeight:parseInt($this.css("height"))+pad.top+pad.bottom})},buildContainer:function(){$this=b(this);$this.data({container:b("<div>").addClass("text-container cf").append($this.html())});$this.css({position:"relative",overflow:"hidden"}).html("").append($this.data("container"));
$this.data({textHeight:$this.data("container").height(),viewRatio:$this.data("container").height()/parseInt($this.css("height"))});with($this.data())$this.data("container").css({position:"absolute",top:pad.top,left:pad.left,height:boxHeight,width:container.width()-pad.right-scrollWidth,overflow:"hidden"});$this.data("container").bind({mousewheel:b.proxy(c.toScroll,this),mouseover:function(){b(window).bind("mousewheel.wScroll",function(a){a.preventDefault()})},mouseout:function(){b(window).unbind("mousewheel.wScroll")}})},
buildScroller:function(){var a=b(this);a.data({scrollContainer:b("<div>").addClass("scroller-container"),scroller:b("<div>").addClass("scroller").css({position:"relative",top:0,width:"inherit",height:Math.round(a.data("scrollerHeight")/a.data("viewRatio"))})});a.data("scrollContainer").append(a.data("scroller"));with(a.data())scrollContainer.css({backgroundColor:"#ccc",position:"absolute",top:pad.top,right:pad.right,width:scrollWidth,height:a.data("scrollerHeight")-Math.round(a.data("scrollerHeight")/
viewRatio),paddingBottom:Math.round(a.data("scrollerHeight")/viewRatio)}),b(this).append(scrollContainer);a.data("scroller").bind({mouseover:function(){b(this).addClass("scrollerHover")},mouseout:function(){b(this).removeClass("scrollerHover")},mousedown:function(d){b(this).data("y",d.pageY);c.setScrInitPos.apply(this,a);b("body").find("*").textSelect(!1);b(window).bind("mousemove.scroller",{context:a},b.proxy(c.dragScroller,this));b(window).bind("mouseup.scroller",function(){b("body").find("*").textSelect(!0);
b(window).unbind("mousemove.scroller")})}})},setScrInitPos:function(a){with(b(a).data())a=parseFloat(b(this).css("top")),a=parseFloat(a.toFixed(1)),scroller.data("startPos",a)},toScroll:function(){$this=b(this);$this.data("container").scrollTop();0<window.event.wheelDelta?$this.data("container").stop(!1,!1).animate({scrollTop:$this.data("container").scrollTop()-125},{duration:150,ease:"easeOutCirc",step:function(){c.setScrollerPos(c.calcScrollerPos())}}):0>window.event.wheelDelta&&$this.data("container").stop(!1,
!1).animate({scrollTop:$this.data("container").scrollTop()+125},{duration:150,ease:"easeOutCirc",step:function(){c.setScrollerPos(c.calcScrollerPos())}})},dragScroller:function(a){a.preventDefault();$this=a.data.context;$this.data("step",a.pageY-b(this).data("y"));a=(a.pageY-b(this).data("y"))/(0.01*Math.round($this.data("scrollerHeight")-$this.data("scrollerHeight")/$this.data("viewRatio")));a=parseFloat(a.toFixed(1));a=$this.data("scroller").data("startPos")+a;100>=a&&0<=a&&$this.data("scroller").css({top:a+
"%"});a=($this.data("textHeight")-$this.data("boxHeight"))*0.01*a;$this.data("container").scrollTop(a)},calcScrollerPos:function(){var a=$this.data("textHeight")-$this.data("boxHeight");return $this.data("container").scrollTop()/(0.01*a)},setScrollerPos:function(a){a=a.toFixed(1);100>=a&&0<=a&&$this.data("scroller").css({top:a+"%"})}};b.fn.JQScroller=function(a){if(c[a])return c[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return c.init.apply(this,arguments);b.error("Method "+
a+" does not exist on jQuery.tooltip")}})(jQuery);