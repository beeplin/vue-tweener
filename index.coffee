import TWEEN from 'tween.js'

export default v =
  install: (Vue) ->
    Vue::$tweening = ({
      tween
      start
      end
      duration
      easing
      integer
      from
      to
      within
      via
      rounded
    }) ->

      start ?= from ? 0
      end ?= to ? 100
      duration ?= within ? 2000
      integer ?= rounded ? yes
      easing ?= via ? TWEEN.Easing.Quadratic.Out

      isNumber = typeof start is 'number'
      if isNumber
        start = key: start
        end = key: end

      isCallback = typeof tween is 'function'
      vm = @

      animate = (time) ->
        requestAnimationFrame animate
        TWEEN.update time

      new TWEEN.Tween start
      .easing easing
      .to end, duration
      .onUpdate ->
        # console.log this.a
        if isCallback
          if isNumber
            tween if integer then Number @key.toFixed 0 else @key
          else
            tween @
        else
          if isNumber
            vm[tween] = if integer then Number @key.toFixed 0 else @key
          else
            vm[tween] = @

      .start()
      animate()

    Vue::$tweening.Easing = TWEEN.Easing
    Vue::$tweening.toInteger = (v) -> (Number v?.toFixed 0) or 0

    Vue.mixin
      created: ->
        tween = @$options.tween
        if tween?
          for name, options of tween
            do (name, options) =>
              if typeof options is 'function'
                options = options.call @
              if typeof options is 'string'
                watch = options
                options = {watch}
              options.duration ?= 1500
              options.integer ?= yes
              options.easing ?= TWEEN.Easing.Quadratic.Out
              Vue.util.defineReactive @, name, true
              @$watch options.watch, (newVal, oldVal) =>
                @$tweening
                  tween: name
                  start: oldVal
                  end: newVal
                  duration: options.duration
                  easing: options.easing
                  integer: options.integer
              ,
                deep: yes
                immediate: no
