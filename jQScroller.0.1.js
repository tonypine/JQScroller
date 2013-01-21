/*
    jQScroller.v0.1.js Tony Bispo Pinheiro aka Tony Pine
*/
(function($) {

    var methods = {
        init: function(options) {

            return this.each(function() {
                $this = $(this);
                $this.data($.extend({
                    hPad: 20,
                    vPad: 20,
                    scrollWidth: 10,
                    readPad: true,
                    pad: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }
                }, options));
                methods.setup.apply(this);
                methods.buildContainer.apply(this);
                methods.buildScroller.apply(this);
            });
        },
        setup: function() {
            $this = $(this);
            if ($this.data('readPad')) {
                $this.data({
                    pad: {
                        top: parseInt($this.css('paddingTop')),
                        left: parseInt($this.css('paddingLeft')),
                        right: parseInt($this.css('paddingRight')),
                        bottom: parseInt($this.css('paddingBottom'))
                    }
                });
                with($this.data()) {
                    $this.data({
                        boxHeight: parseInt($this.css('height')),
                        scrollerHeight: parseInt($this.css('height'))
                    });
                }
            } else {
                with($this.data()) {
                    $this.css('padding', 0);
                    $this.data({
                        boxHeight: parseInt($this.css('height')) + pad.top + pad.bottom,
                        scrollerHeight: parseInt($this.css('height')) + pad.top + pad.bottom
                    });
                }
            }
        },
        buildContainer: function() {
            $this = $(this);
            $this.data({
                container: $("<div>").addClass('text-container cf').append($this.html())
            });
            $this.css({
                position: 'relative',
                overflow: 'hidden'
            }).html('').append($this.data('container'));
            $this.data({
                textHeight: $this.data('container').height(),
                viewRatio: $this.data('container').height() / parseInt($this.css('height'))
            });
            with($this.data()) {
                $this.data('container').css({
                    position: 'absolute',
                    top: pad.top,
                    left: pad.left,
                    height: boxHeight,
                    width: container.width() - pad.right - scrollWidth,
                    overflow: 'hidden'
                });
            }
            $this.data('container').bind({
                mousewheel: $.proxy( methods.toScroll, this ),
                mouseover: function(){
                    $(window).bind('mousewheel.wScroll', function(e){
                        e.preventDefault();
                    });
                },
                mouseout: function(){
                    $(window).unbind('mousewheel.wScroll');
                }
            });
        },
        buildScroller: function() {
            var $this = $(this);
            $this.data({
                scrollContainer: $("<div>").addClass('scroller-container'),
                scroller: $("<div>").addClass('scroller').css({
                    position: 'relative',
                    top: 0,
                    width: 'inherit',
                    height: Math.round($this.data('scrollerHeight') / $this.data('viewRatio'))
                })
            });
            $this.data('scrollContainer').append($this.data('scroller'));
            with($this.data()) {
                scrollContainer.css({
                    backgroundColor: '#ccc',
                    position: 'absolute',
                    top: pad.top,
                    right: pad.right,
                    width: scrollWidth,
                    height: $this.data('scrollerHeight') - Math.round($this.data('scrollerHeight') / viewRatio),
                    paddingBottom: Math.round($this.data('scrollerHeight') / viewRatio)
                });
                $(this).append(scrollContainer);
            }

            $this.data('scroller').bind({
                mouseover: function() {
                    $(this).addClass('scrollerHover');
                },
                mouseout: function() {
                    $(this).removeClass('scrollerHover');
                },
                mousedown: function(e) {

                    $(this).data('y', e.pageY);
                    methods.setScrInitPos.apply(this, $this);

                    // select
                    $('body').find('*').textSelect(false);

                    // StartDrag
                    $(window).bind('mousemove.scroller', {
                        context: $this
                    }, $.proxy(methods.dragScroller, this));

                    // StopDrag
                    $(window).bind('mouseup.scroller', function() {
                        $('body').find('*').textSelect(true);
                        $(window).unbind('mousemove.scroller');
                    });
                }
            });


        },
        setScrInitPos: function(self) {
            with($(self).data()) {
                var pos = parseFloat($(this).css('top'));
                pos = parseFloat(pos.toFixed(1));
                scroller.data('startPos', pos);
            }
        },
        toScroll: function(evt) {
            $this = $(this);
            var height = $this.data('container').scrollTop();
            var step = 125;

            if (window.event.wheelDelta > 0) {
                $this.data('container').stop(false, false).animate({
                    scrollTop: $this.data('container').scrollTop() - step
                }, {
                    duration: 500,
                    ease: 'easeInOutElastic',
                    step: function() {
                        methods.setScrollerPos(methods.calcScrollerPos());

                    }
                });
            } else if (window.event.wheelDelta < 0) {
                $this.data('container').stop(false, false).animate({
                    scrollTop: $this.data('container').scrollTop() + step
                }, {
                    duration: 500,
                    ease: 'easeInOutElastic',
                    step: function() {
                        methods.setScrollerPos(methods.calcScrollerPos());
                    }
                });

            }

        },
        dragScroller: function(e) {
            e.preventDefault();
            $this = e.data.context;
            $this.data('step', e.pageY - $(this).data('y'));

            var step = e.pageY - $(this).data('y');
            var porcentagem = step / (Math.round($this.data('scrollerHeight') - $this.data('scrollerHeight') / $this.data('viewRatio')) * 0.01);
            porcentagem = parseFloat(porcentagem.toFixed(1));
            porcentagem = $this.data('scroller').data('startPos') + porcentagem;
            if (porcentagem <= 100 && porcentagem >= 0) {
                $this.data('scroller').css({
                    top: porcentagem + "%"
                });
            }

            var top = ($this.data('textHeight') - $this.data('boxHeight')) * (porcentagem * 0.01);
            $this.data('container').scrollTop(top);
        },
        calcScrollerPos: function() {
            var total = $this.data('textHeight') - $this.data('boxHeight');
            return $this.data('container').scrollTop() / (total * 0.01);
        },
        setScrollerPos: function(porcentagem) {
            porcentagem = porcentagem.toFixed(1);
            if (porcentagem <= 100 && porcentagem >= 0) {
                $this.data('scroller').css({
                    top: porcentagem + "%"
                });
            }
        }
    };

    $.fn.JQScroller = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };
})(jQuery);