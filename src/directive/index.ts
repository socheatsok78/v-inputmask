import type { DirectiveFunction, DirectiveOptions } from 'vue'
import InputMask from 'inputmask'
import { assign, event } from '../utils'

const defaultOptions: InputMask.Options = {
  autoUnmask: true,
  showMaskOnHover: false,
}

const events = ['paste', 'cut']

export const vInputmask: DirectiveOptions = {
  bind(el, binding, vnode) {
    if (!binding.value) {
      console.error('<v-inputmask>', 'missing inputmask configuration.')
      return
    }

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
    const im = el.inputmask ? el.inputmask : new Inputmask(opts)

    // Create a mask for the input
    im.mask(el)

    // Fix copy/cut/paste issues
    events.forEach(evt => {
      el.addEventListener(evt, () => {
        el.dispatchEvent(event('input'))
        el.dispatchEvent(event('change'))
      }, { once: true })
    })
  },
  unbind(el, binding, vnode) {
    if (el.inputmask) {
      el.inputmask.remove()
    }
  }
}
