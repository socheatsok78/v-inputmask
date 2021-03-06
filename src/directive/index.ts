import type { DirectiveOptions } from 'vue'
import Inputmask from "inputmask";
import { assign, deepEqual, event, getInputElement } from '../utils'

const defaultOptions: Inputmask.Options = {
  autoUnmask: true,
  showMaskOnHover: false,
}

const imEventMap = ['paste', 'cut']
const cached = new Map<HTMLElement, Inputmask.Options>()

export const vInputmask: DirectiveOptions = {
  bind(el, binding, vnode) {
    if (!binding.value) {
      console.error('<v-inputmask>', 'missing inputmask configuration.')
      return
    }

    el = getInputElement(el)
    if (!(el instanceof HTMLInputElement)) return

    const opts = assign(defaultOptions, binding.value)
    const im = el.inputmask ? el.inputmask : new Inputmask(opts)

    // Create a mask for the input
    im.mask(el)
    cached.set(el, opts)

    // Fix copy/cut/paste issues
    imEventMap.forEach(evt => {
      el.addEventListener(evt, () => {
        el.dispatchEvent(event('input'))  // v-model
        el.dispatchEvent(event('change')) // v-model.lazy
      }, { once: true })
    })
  },
  update(el, binding, vnode) {
    if (!binding.value) return

    el = getInputElement(el)
    if (!(el instanceof HTMLInputElement)) return
    if (!el.inputmask) return

    const cachedOpts = cached.get(el)
    const opts = assign(cachedOpts!, binding.value)

    // Don't update when option are equal
    if (deepEqual(cachedOpts!, opts)) return
    cached.set(el, opts)

    el.inputmask.option(opts)

    // Fix copy/cut/paste issues
    imEventMap.forEach(evt => {
      el.addEventListener(evt, () => {
        el.dispatchEvent(event('input'))  // v-model
        el.dispatchEvent(event('change')) // v-model.lazy
      }, { once: true })
    })
  },
  unbind(el, binding, vnode) {
    el = getInputElement(el)
    if (!(el instanceof HTMLInputElement)) return
    if (!el.inputmask) return

    el.inputmask.remove()
    cached.delete(el)
  }
}
