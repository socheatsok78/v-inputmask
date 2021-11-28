import type InputMask from 'inputmask'

export function assign (defaults: InputMask.Options, extras: InputMask.Options): InputMask.Options {
  defaults = defaults || {}
  extras = extras || {}
  return Object.keys(defaults).concat(Object.keys(extras)).reduce(function (acc, val) {
    acc[val] = extras[val] === undefined ? defaults[val] : extras[val]
    return acc
  }, {})
}

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
export function event (name: keyof DocumentEventMap) {
  var evt = document.createEvent('Event')
  evt.initEvent(name, true, true)
  return evt
}
