export function assign (defaults, extras) {
  defaults = defaults || {}
  extras = extras || {}
  return Object.keys(defaults).concat(Object.keys(extras)).reduce(function (acc, val) {
    acc[val] = extras[val] === undefined ? defaults[val] : extras[val]
    return acc
  }, {})
}

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
export function event (name) {
  var evt = document.createEvent('Event')
  evt.initEvent(name, true, true)
  return evt
}
