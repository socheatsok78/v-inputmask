import type { PluginObject, VueConstructor } from "vue";
import { vInputmask } from '../directive'

export const VInputmaskPlugin: PluginObject<{}> = {
  installed: false,
  install(Vue) {
    if (this.installed) return
    this.installed = true

    Vue.directive('inputmask', vInputmask)
  }
}
