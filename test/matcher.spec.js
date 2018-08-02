'use strict'

/* eslint-env mocha */
/* eslint-disable guard-for-in */

const assert = require('assert')
const {matcher} = require('..')

const shouldMatch = {
  strict: [
    ['hello', 'hello'],
    [2, 2]
  ],
  regex: [
    ['HELLO', '^hello\\/i']
  ],
  glob: [
    ['example.com', '*example.com']
  ]
}

const shouldNotMatch = {
  strict: [
    [2, '2']
  ],
  regex: [
    ['hi', 'bye']
  ],
  glob: [
    ['example.com', '*.example.com']
  ]
}

describe('matcher', () => {
  for (const type in shouldMatch) {
    shouldMatch[type].forEach(m => {
      it(type + ': ' + m.map(JSON.stringify).join(' should match '), () => {
        assert(matcher[type](...m))
      })
    })
  }

  for (const type in shouldNotMatch) {
    shouldNotMatch[type].forEach(m => {
      it(type + ': ' + m.map(JSON.stringify).join(' should not match '), () => {
        assert(!matcher[type](...m))
      })
    })
  }
})
