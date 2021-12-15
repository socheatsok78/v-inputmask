import type InputMask from 'inputmask'

export function assign (defaults: InputMask.Options, extras: InputMask.Options): InputMask.Options {
  defaults = defaults || {}
  extras = extras || {}
  return Object.keys(defaults).concat(Object.keys(extras)).reduce(function (acc, val) {
    (acc as any)[val] = (extras as any)[val] === undefined
      ? (defaults as any)[val]
      : (extras as any)[val]
    return acc
  }, {})
}

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
export function event (name: keyof DocumentEventMap) {
  var evt = document.createEvent('Event')
  evt.initEvent(name, true, true)
  return evt
}

export const getInputElement = (el: HTMLElement) => {
  if (!(el instanceof HTMLInputElement)) {
    const els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      console.error(new Error('v-inputmask requires 1 input, found ' + els.length))
    } else {
      return el
    }
  }

  return el
}
