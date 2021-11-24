export function assign (defaults, extras) {
  defaults = defaults || {}
  extras = extras || {}
  return Object.keys(defaults).concat(Object.keys(extras)).reduce(function (acc, val) {
    acc[val] = extras[val] === undefined ? defaults[val] : extras[val]
    return acc
  }, {})
}
