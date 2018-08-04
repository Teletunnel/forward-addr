'use strict'

const minimatch = require('minimatch')

function getInt (maybeInt) {
  if (typeof maybeInt === 'number') {
    if (isNaN(maybeInt)) throw new Error('NaN is not a number')
  }

  if (typeof maybeInt === 'string') {
    maybeInt = parseInt(maybeInt, 10)
  }

  if (isNaN(maybeInt) || typeof maybeInt !== 'number') throw new Error('Int not a number')

  return maybeInt
}

function getFloat (maybeFloat) {
  if (typeof maybeFloat === 'number') {
    if (isNaN(maybeFloat)) throw new Error('NaN is not a number')
  }

  if (typeof maybeFloat === 'string') {
    maybeFloat = parseFloat(maybeFloat, 10)
  }

  if (isNaN(maybeFloat) || typeof maybeFloat !== 'number') throw new Error('Int not a number')

  return maybeFloat
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
  },
  float: {
    strict: (value, compareWith) => getFloat(value) === getFloat(compareWith),
    range: (value, compareWith) => {
      let [smallest, biggest] = compareWith.split('-').map(getFloat)
      value = getFloat(value)
      return value >= smallest && value <= biggest
    }
  }
}
