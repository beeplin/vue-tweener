# vue-tweening
Tweening vue's reactive data over time. A vue wrapper for [tween.js](https://github.com/tweenjs/tween.js)

## Install:

```
npm i -g vue-tweening
```

## Plugin into Vue:

```javascript
import VueTweening from 'vue-tweening'
Vue.use(VueTweening)
```

## Usage 

Call `this.$tweening` in a vue component (`from-to-within-via-rounded` is equivalent to `start-end-duration-easing-integer`):

```javascript

data() {
  return {
    test1: 0，
    test2: {a: 1, b: 2}，
    test3: 0，
    test4: {a: 1, b: 2}
  } 

InSomeMethodsOrHooks() {

  // tweening one number with string syntax
  this.$tweening({
    tween: 'test1',
    from: 1,
    to: 100,
    within: 2000,
    via: this.$tweening.Easing.Quadratic.Out,
    rounded: true
  });

  // tweening multiple numbers in an object at the same time, with string syntax
  this.$tweening({
    tween: 'test2',
    start: {a: 0.1, b: 0.2},
    end: {a: 1, b: -1},
    duration: 1000,
    easing: this.$tweening.Easing.Quadratic.InOut,
    integer: false
  });

  // tweening one number with callback syntax for post-processing
  this.$tweening({
    tween(value) => this.test3 = value * 2,
    from: 1,
    to: 100,
    within: 5000,
    via: this.$tweening.Easing.Quadratic.Out,
    rounded: false
  });

  // tweening multiple numbers in an object at the same time, with callback syntax for post-processing
  this.$tweening({
    tween(value) => {
      this.test4.a = this.$tweening.toInteger(value.a)
      this.test4.b = Number(value.b.toFixed(0))
    },
    start: {a: 1, b: 2},
    end: {a: 10, b: -20},
    duration: 2000,
    easing: this.$tweening.Easing.Quadratic.InOut,
    integer: false
  });
}  
```

## Injected Globals

`this.$tweening.Easing`: equivalent to `TWEEN.Easing`;

`this.$tweening.toInteger()`: if you don't set `integer: true` or `rouned: true` but still want integers. 
