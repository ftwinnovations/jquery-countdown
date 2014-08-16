/*
 * jQuery Number Countdown
 * A hack of a jquery module that really should be a plugin to the 'animate' system
 *
 * Copyright 2011 Austin Butler/FTW Innovations, Inc
 * Released under the MIT and GPL licenses.
 *
 * @param endValue = End value
 */

(function($){
	$.fn.countdown = function(endValue, spec, milliseconds) {
		milliseconds = milliseconds || 1000;
		spec.prefix = spec.prefix || '';
		spec.suffix = spec.suffix || '';
		spec.formatter = spec.formatter || function(val){return val;};
		var stepTime = 50,
			steps = Math.floor(milliseconds / stepTime),
			endValue = parseInt(endValue, 10),
			startValue = parseInt(this.html().replace(/\W+/g, ''), 10),
			inc = Math.floor((startValue-endValue) / steps),
			timeout,
			fn;

		if (steps > endValue - startValue) {
			steps = endValue - startValue;
			inc = Math.floor((startValue-endValue) / steps);
			milliseconds = stepTime * steps;
		}

		var $this = this;
		fn = function() {
			startValue-=inc;
			milliseconds-=stepTime;
			$this.html(spec.prefix+spec.formatter(startValue)+spec.suffix);
			if (milliseconds <= 0) {
				clearTimeout(timeout);
				$this.html(spec.prefix+spec.formatter(endValue)+spec.suffix);
				return;
			}
			setTimeout(fn, stepTime);
		};
		timeout = setTimeout(fn, stepTime);

	};
})(jQuery);