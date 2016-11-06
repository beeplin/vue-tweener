import TWEEN from 'tween.js';

(function () {
	var plugin;
	plugin = function (Vue) {
		Vue.prototype.$tween = function (arg) {
			var animate, duration, easing, end, isCallback, isNumber, output, rounded, start, vm;
			output = arg.output, start = arg.start, end = arg.end, duration = arg.duration, easing = arg.easing, rounded = arg.rounded;
			if (start == null) {
				start = 0;
			}
			if (end == null) {
				end = 100;
			}
			if (duration == null) {
				duration = 2000;
			}
			if (easing == null) {
				easing = TWEEN.Easing.Quadratic.Out;
			}
			if (rounded == null) {
				rounded = true;
			}
			isNumber = typeof start === 'number';
			if (isNumber) {
				start = {
					key: start
				};
				end = {
					key: end
				};
			}
			isCallback = typeof output === 'function';
			vm = this;
			animate = function (time) {
				requestAnimationFrame(animate);
				return TWEEN.update(time);
			};
			new TWEEN.Tween(start).easing(easing).to(end, duration).onUpdate(function () {
				if (isCallback) {
					if (isNumber) {
						return output(rounded ? Number(this.key.toFixed(0)) : this.key);
					} else {
						return output(this);
					}
				} else {
					if (isNumber) {
						return vm[output] = rounded ? Number(this.key.toFixed(0)) : this.key;
					} else {
						return vm[output] = this;
					}
				}
			}).start();
			return animate();
		};
		Vue.prototype.$tween.Easing = TWEEN.Easing;
		Vue.prototype.$tween.toInteger = function (v) {
			return (Number(v != null ? v.toFixed(0) : void 0)) || 0;
		};
		return Vue.mixin({
			created: function () {
				var name, options, results, tween;
				tween = this.$options.tween;
				if (tween != null) {
					this._unwatchers = {};
					results = [];
					for (name in tween) {
						options = tween[name];
						results.push((function (_this) {
							return function (name, options) {
								var watch;
								if (typeof options === 'function') {
									options = options.call(_this);
								}
								if (typeof options === 'string') {
									watch = options;
									options = {
										watch: watch
									};
								}
								if (options.duration == null) {
									options.duration = 1500;
								}
								if (options.rounded == null) {
									options.rounded = true;
								}
								if (options.easing == null) {
									options.easing = TWEEN.Easing.Quadratic.Out;
								}
								Vue.util.defineReactive(_this, name, true);
								_this.$data[name] = _this[name];
								return _this._unwatchers[name] = _this.$watch(options.watch, function (newVal, oldVal) {
									return _this.$tween({
										output: name,
										start: oldVal,
										end: newVal,
										duration: options.duration,
										easing: options.easing,
										rounded: options.rounded
									});
								}, {
									deep: true,
									immediate: true
								});
							};
						})(this)(name, options));
					}
					return results;
				}
			},
			beforeDestroy: function () {
				var name, ref, unwatcher;
				ref = this._unwatchers;
				for (name in ref) {
					unwatcher = ref[name];
					unwatcher();
				}
			}
		});
	};
	if (typeof Vue !== "undefined" && Vue !== null) {
		Vue.use(plugin);
	}
	if (typeof exports === 'object' && typeof module === 'object') {
		return module.exports = plugin;
	} else if (typeof define === 'function' && define.amd) {
		return define(function () {
			return plugin;
		});
	} else if (typeof window !== "undefined" && window !== null) {
		return window.VueTweener = plugin;
	}
})();