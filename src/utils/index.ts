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

export function deepEqual(object1: object, object2: object) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    // @ts-ignore
    const val1 = object1[key];
    // @ts-ignore
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}
export function isObject(object: object) {
  return object != null && typeof object === 'object';
}

export const getInputElement = (el: HTMLElement) => {
  if (!(el instanceof HTMLInputElement)) {
    const els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      console.error(new Error('v-inputmask requires 1 input, found ' + els.length))
    } else {
      el = els[0]
    }
  }

  return el
}
