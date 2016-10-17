# vue-tweener

tween Vue's reactive data over time. A Vue wrapper for [tween.js](https://github.com/tweenjs/tween.js).

## Install

```bash
npm i -g vue-tweener
```

## Plugin into Vue

```js
import Vue from 'vue'
import VueTweener from 'vue-tweener'

Vue.use(VueTweener)
```

## Usage

```js
data() {
  return {
    source: 1
    test1: 0，
    test2: {a: 1, b: 2}，
    test3: 0，
    test4: {a: 1, b: 2}
  }

// Declarative syntax:
tween: {
  tweened() { // when this.source changes, refer to this.tweened to get the tweened source
    return {
      watch: 'source', // NOTE: can only watch expression returning single number, not object or others.
      duration: 1000, // 1500 by default
      easing: this.$tween.Easing.Quadratic.InOut, // this.$tween.Easing.Quadratic.Out by default
      rounded: no // yes by default, rounded to integer
    }
  }
}

// Imperative syntax:
InSomeMethodsOrHooks() {

  // tween one number to a string output, which is the name of the tweened outcome
  this.$tween({
    start: 1,
    end: 100,
    duration: 2000,
    easing: this.$tween.Easing.Quadratic.Out,
    rounded: true,
    output: 'test1' //this.test1 as the tweened outcome. test1 must be in data list.
  });

  // tween multiple numbers in an object at the same time
  this.$tween({
    start: {a: 0.1, b: 0.2},
    end: {a: 1, b: -1},
    duration: 1000,
    easing: this.$tween.Easing.Quadratic.InOut,
    rounded: false,
    output: 'test2' //this.test2 as the tweened outcome. test2 must be in data list.
  });

  // tween one number with callback syntax for post-processing
  this.$tween({
    start: 1,
    end: 100,
    duration: 5000,
    easing: this.$tween.Easing.Quadratic.Out,
    rounded: false,
    output(value) => this.test3 = value * 2 // test3 must be in data list.
  });

  // tween multiple numbers in an object at the same time, with callback syntax for post-processing
  this.$tween({
    start: {a: 1, b: 2},
    end: {a: 10, b: -20},
    duration: 2000,
    easing: this.$tween.Easing.Quadratic.InOut,
    rounded: false,
    output(value) => {
      this.test4.a = this.$tween.toInteger(value.a)
      this.test4.b = Number(value.b.toFixed(0)) // test4 must be in data list.
    }
  });
}
```

## Injected Globals

`this.$tween.Easing`: equivalent to `TWEEN.Easing`;

`this.$tween.toInteger()`: use this when you don't set `rouned: true` but still want integers.
