import TWEEN from 'tween.js'

export default {
  install: function(Vue) {
    Vue.prototype.$tweening = function(arg) {
      var animate, duration, easing, end, from, integer, isCallback, isNumber, rounded, start, to, tween, via, vm, within;
      tween = arg.tween, start = arg.start, end = arg.end, duration = arg.duration, easing = arg.easing, integer = arg.integer, from = arg.from, to = arg.to, within = arg.within, via = arg.via, rounded = arg.rounded;
      if (start == null) {
        start = from != null ? from : 0;
      }
      if (end == null) {
        end = to != null ? to : 100;
      }
      if (duration == null) {
        duration = within != null ? within : 2000;
      }
      if (integer == null) {
        integer = rounded != null ? rounded : true;
      }
      if (easing == null) {
        easing = via != null ? via : TWEEN.Easing.Quadratic.Out;
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
      isCallback = typeof tween === 'function';
      vm = this;
      animate = function(time) {
        requestAnimationFrame(animate);
        return TWEEN.update(time);
      };
      new TWEEN.Tween(start).easing(easing).to(end, duration).onUpdate(function() {
        if (isCallback) {
          if (isNumber) {
            return tween(integer ? Number(this.key.toFixed(0)) : this.key);
          } else {
            return tween(this);
          }
        } else {
          if (isNumber) {
            return vm[tween] = integer ? Number(this.key.toFixed(0)) : this.key;
          } else {
            return vm[tween] = this;
          }
        }
      }).start();
      return animate();
    };
    Vue.prototype.$tweening.Easing = TWEEN.Easing;
    return Vue.prototype.$tweening.toInteger = function(v) {
      return (Number(v != null ? v.toFixed(0) : void 0)) || 0;
    };
  }
};
