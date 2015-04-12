/*
 * jQuery Number Countdown
 * A hack of a jquery module that really should be a plugin to the 'animate' system
 *
 * Copyright 2011 Austin Butler/FTW Innovations, Inc
 * Released under the MIT and GPL licenses.
 *
 * @param {number|array} endValue End value.  If array, first element is end value, first element is forced start value
 * @param {object} [spec] - {string}prefix, {string}suffix, {function}formatter
 * @param {number} [milliseconds] - length of the animation
 */

(function($){
	$.fn.countdown = function(endValue, spec, milliseconds, cb) {
		spec = spec || {};
		milliseconds = milliseconds || 1000;
		spec.prefix = spec.prefix || '';
		spec.suffix = spec.suffix || '';
		spec.formatter = spec.formatter || function(val){return val;};
		var stepTime = 50,
			steps = Math.floor(milliseconds / stepTime),
			endVal = parseInt((Array.isArray(endValue)) ? endValue[0] : endValue, 10),
			startVal = parseInt((Array.isArray(endValue)) ? endValue[1] : this.html().replace(/\W+/g, ''), 10),
            start = startVal,
            end = endVal,
			inc = Math.floor((start-end) / steps),
			timeout,
			fn;
        
		if (steps > Math.abs(start - end)) {
			steps = Math.abs(Math.round(start - end));
			inc = Math.floor((start-end) / steps);
			milliseconds = stepTime * steps;
		}

        if(steps == 0) {
            this.html(spec.prefix+spec.formatter(end)+spec.suffix);
            if (cb) {
                setTimeout(cb, 0);
            }
            return this;
        }

		var $this = this;
		fn = function() {
            start = start - inc;
            if(startVal < endVal) {
                start = Math.min(start, endVal);
            } else {
                start = Math.max(start, endVal);
            }
			milliseconds-=stepTime;
			$this.html(spec.prefix+spec.formatter(start)+spec.suffix);
			if (milliseconds <= 0) {
				clearTimeout(timeout);
				$this.html(spec.prefix+spec.formatter(end)+spec.suffix);
                if (cb) cb();
				return;
			}
			setTimeout(fn, stepTime);
		};
		timeout = setTimeout(fn, stepTime);

        return this;
	};
})(jQuery);
