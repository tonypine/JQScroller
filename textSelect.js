/*
    Author: Tony Bispo Pinheiro a.k.a Tony Pine
    */
(function($) {
    var methods = {
        disable: function() {
            return this.each(function() {
                $(this).attr('unselectable', 'on').css('MozUserSelect', 'none').bind('selectstart.textSelect mousedown.textSelect', function() {
                    return false;
                });
            });
        },
        enable: function() {
            $(this).attr('unselectable', 'off').css('MozUserSelect', 'text').unbind('selectstart.textSelect mousedown.textSelect');
        }
    }
    $.fn.textSelect = function(enabled) {
        if (enabled) {
            return methods.enable.apply(this);
        } else {
            return methods.disable.apply(this);
        }
    };
})(jQuery);