'use strict'

const minimatch = require('minimatch')

function getInt (maybeInt) {
  if (typeof maybeInt === 'number') {
    if (isNaN(maybeInt)) throw new Error('Int not a number')
  }

  if (typeof maybeInt === 'string') {
    maybeInt = parseInt(maybeInt, 10)
  }

  if (isNaN(maybeInt) || typeof maybeInt !== 'number') throw new Error('Int not a number')

  return maybeInt
}

module.exports = {
  string: {
    strict: (value, compareWith) => value === compareWith,
    regex: (value, compareWith) => {
      let regex = compareWith.split('\\/')
      let flags = regex.pop()
      if (!flags.match(/^[gmi]+$/gmi)) { // only use that part if it contains valid regex flags
        regex.unshift(flags)
        flags = ''
      }
      regex = regex.join('\\/')
      regex = new RegExp(regex, flags)
      return Boolean(regex.exec(value))
    },
    glob: minimatch
  },
  number: {
    strict: (value, compareWith) => getInt(value) === getInt(compareWith),
    range: (value, compareWith) => {
      let [smallest, biggest] = compareWith.split('-').map(getInt)
      value = getInt(value)
      return value >= smallest && value <= biggest
    }
  }
}
