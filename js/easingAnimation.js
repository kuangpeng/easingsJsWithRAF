/***
 *
 * html elements`s path motion animation plugin.
 * plugins: Tween.js, requestAnimationFrame.js(zhangxinxu)
 *
 * requestAnimationFrame.js fix requestAnimationFrame.
 *
 */
(function(global, $) {

    if (typeof $ === 'undefined') {
        throwError('requires jQuery.');
    }

    var pluginName = 'easeAnimate';

    // Conflict, use backup
    if ($.fn.easeAnimate) {
        pluginName = 'easeAnimate2';
    }

    $.fn[pluginName] = function(options) {

        if (typeof options === 'undefined') {
            return this;
        }

        var target = $(this), params = {}, requestAnimationID = null;

        var easeAnimate = {

            initialize: function() {
                var self = this;

                // Save attributes of current instance
                if (!target.data('easeAnimate')) {
                    target.data('easeAnimate', {});
                }

                // If pagination has been initialized, destroy it
                if (target.data('easeAnimate').initialized) {
                    $(target).remove();
                }

                params.endPosition = {};
                params.endPosition.x = attributes.endPos[0];
                params.endPosition.y = attributes.endPos[1];

                params.easeType = attributes.easeType;
                params.duration = attributes.duration;

                params.targetTween = TweenEaseAnimate[params.easeType];

                params.startTime = 0;

                _run();

            }
        };

        function _run(){
            params.startTime ++;

            var top_tween = params.targetTween(params.startTime, $(target).position().top, params.endPosition.y-$(target).position().top, params.duration),
                left_tween = params.targetTween(params.startTime, $(target).position().left, params.endPosition.x-$(target).position().left, params.duration);

            $(target).css({
                "top": top_tween,
                "left": left_tween
            });

            if(params.startTime < params.duration){
                requestAnimationID = requestAnimationFrame(_run);
            }
            else{
                cancelAnimationFrame(requestAnimationID);
            }
        }

        // Attributes
        var attributes = $.extend({}, arguments.callee.defaults, options);

        // Check parameters
        parameterChecker(attributes);

        easeAnimate.initialize();

        return this;
    };

    // Instance defaults
    $.fn[pluginName].defaults = {
        easeType: 'Linear',
        endPos: [],  //x,y=>left,top
        duration: 100
    };

    (function(window) {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }

        var Tween = {
            Linear: function(t, b, c, d) { return c*t/d + b; },
            QuadEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            QuadEaseOut: function(t, b, c, d) {
                return -c *(t /= d)*(t-2) + b;
            },
            QuadEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t-2) - 1) + b;
            },
            CubicEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            CubicEaseOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t + 1) + b;
            },
            CubicEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
                return c / 2*((t -= 2) * t * t + 2) + b;
            },
            QuartEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t * t*t + b;
            },
            QuartEaseOut: function(t, b, c, d) {
                return -c * ((t = t/d - 1) * t * t*t - 1) + b;
            },
            QuartEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
            },
            QuintEaseIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            QuintEaseOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
            },
            QuintEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2*((t -= 2) * t * t * t * t + 2) + b;
            },
            SineEaseIn: function(t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            SineEaseOut: function(t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            SineEaseInOut: function(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
            },
            ExpoEaseIn: function(t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            ExpoEaseOut: function(t, b, c, d) {
                return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            ExpoEaseInOut: function(t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            CircEaseIn: function(t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            CircEaseOut: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
            },
            CircEaseInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            ElasticEaseIn: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    s = p / 4;
                    a = c;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            ElasticEaseOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p/(2*Math.PI) * Math.asin(c/a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            ElasticEaseInOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d / 2) == 2) return b+c;
                if (typeof p == "undefined") p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2  *Math.PI) * Math.asin(c / a);
                }
                if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
            },
            BackEaseIn: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            BackEaseOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            BackEaseInOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },
            BounceEaseIn: function(t, b, c, d) {
                return c - Tween.BounceEaseOut(d-t, 0, c, d) + b;
            },
            BounceEaseOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            BounceEaseInOut: function(t, b, c, d) {
                if (t < d / 2) {
                    return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
                } else {
                    return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            }
        }
        window.TweenEaseAnimate = Tween;
    }(window));

    // ============================================================
    // helpers
    // ============================================================

    var Helpers = {};

    // Throw error
    function throwError(content) {
        throw new Error('easingAnimation: '+ content);
    }

    // Check parameters
    function parameterChecker(args) {

        if(typeof TweenEaseAnimate[args.easeType] !== 'function'){
            throwError('"easeType" is not valid effect.');
        }

        if (!args.endPos) {
            throwError('"endPos" is required.');
        }

        if (Helpers.isArray(args.endPos)) {
            if (args.endPos.length != 2) {
                throwError('"endPos" is an Array that length is 2!');
            }
            else{
                if( typeof args.endPos[0] !== 'number' || typeof args.endPos[1] !== 'number'){
                    throwError('"endPos" is an Number Array.');
                }
            }
        }

        if(!args.duration && typeof args.duration !== 'number'){
            throwError('"easeType" is not valid effect.');
        }
    }

    // Object type detection
    function getObjectType(object, tmp) {
        return ( (tmp = typeof(object)) == "object" ? object == null && "null" || Object.prototype.toString.call(object).slice(8, -1) : tmp ).toLowerCase();
    }
    $.each(['Object', 'Array'], function(index, name) {
        Helpers['is' + name] = function(object) {
            return getObjectType(object) === name.toLowerCase();
        };
    });

    /*
     * export via AMD or CommonJS
     * */
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return $;
        });
    }

})(this, window.jQuery);