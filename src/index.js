import InputMask from 'inputmask'

import { event } from './utils/event'
import { assign } from './utils/assign'

/** @type {InputMask.Options} */
const defaultOptions = {
  autoUnmask: true,
  showMaskOnHover: false,
}

const events = ['paste', 'cut']

/**
 *
 * @type {import("vue").DirectiveFunction}
 */
export const vInputMask = (el, binding, vnode) => {
  if (!binding.value) return

  if (!(el instanceof HTMLInputElement)) {
    const els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      console.error(new Error('v-inputmask requires 1 input, found ' + els.length))
    } else {
      el = els[0]
    }
  }

  if (!(el instanceof HTMLInputElement)) return

  const opts = assign(defaultOptions, binding.value)
  const im = el.inputmask ? el.inputmask : new InputMask(opts)

  // Create a mask for the input
  im.mask(el)

  // Fix copy/cut/paste issues
  events.forEach(evt => {
    el.addEventListener(evt, () => {
      el.dispatchEvent(event('input'))
      el.dispatchEvent(event('change'))
    }, { once: true })
  })
}
