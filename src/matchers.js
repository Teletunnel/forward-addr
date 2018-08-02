'use strict'

const minimatch = require('minimatch')

module.exports = {
  strict: (value, compareWith) => value === compareWith,
  regex: (value, compareWith) => {
    let [regex, flags] = String(compareWith).split('\\/')
    regex = new RegExp(regex, flags)
    return Boolean(regex.exec(value))
  },
  glob: minimatch
}
