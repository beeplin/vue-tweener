import TWEEN from 'tween.js'
( ->
  plugin = (Vue) ->
    Vue::$tween = ({
      output
      start
      end
      duration
      easing
      rounded
    }) ->

      start ?= 0
      end ?= 100
      duration ?= 2000
      easing ?= TWEEN.Easing.Quadratic.Out
      rounded ?= yes

      isNumber = typeof start is 'number'
      if isNumber
        start = key: start
        end = key: end

      isCallback = typeof output is 'function'
      vm = @

      animate = (time) ->
        requestAnimationFrame animate
        TWEEN.update time

      new TWEEN.Tween start
      .easing easing
      .to end, duration
      .onUpdate ->
        if isCallback
          if isNumber
            output if rounded then Number @key.toFixed 0 else @key
          else
            output @
        else
          if isNumber
            vm[output] = if rounded then Number @key.toFixed 0 else @key
          else
            vm[output] = @
      .start()
      animate()

    Vue::$tween.Easing = TWEEN.Easing
    Vue::$tween.toInteger = (v) -> (Number v?.toFixed 0) or 0

    Vue.mixin
      created: ->
        tween = @$options.tween
        if tween?
          @_unwatchers = {}
          for name, options of tween
            do (name, options) =>
              if typeof options is 'function'
                options = options.call @
              if typeof options is 'string'
                watch = options
                options = {watch}
              options.duration ?= 1500
              options.rounded ?= yes
              options.easing ?= TWEEN.Easing.Quadratic.Out
              Vue.util.defineReactive @, name, true
              @$data[name] = @[name]
              @_unwatchers[name] = @$watch options.watch, (newVal, oldVal) =>
                @$tween
                  output: name
                  start: oldVal
                  end: newVal
                  duration: options.duration
                  easing: options.easing
                  rounded: options.rounded
              ,
                deep: yes
                immediate: yes

      beforeDestroy: ->
        for name, unwatcher of @_unwatchers
          unwatcher()
        return

  if Vue? then Vue.use plugin
  if typeof exports is 'object' and typeof module is 'object'
    module.exports = plugin
  else if typeof define is 'function' and define.amd
    define -> plugin
  else if window?
    window.VueTweener = plugin

)()