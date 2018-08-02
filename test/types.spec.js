'use strict'

/* eslint-env mocha */
/* eslint-disable guard-for-in */

const assert = require('assert')
const {types} = require('..')

const shouldMatch = {
  string: {
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
  },
  number: {
    strict: [
      [2, 2],
      ['2', 2],
      ['2', '2']
    ],
    range: [
      [20, '10-30'],
      [20, '20-21'],
      [20, '20-20']
    ]
  }
}

const shouldNotMatch = {
  string: {
    strict: [
      [2, '2']
    ],
    regex: [
      ['hi', 'bye']
    ],
    glob: [
      ['example.com', '*.example.com']
    ]
  },
  number: {
    strict: [
      [23, 22]
    ],
    range: [
      [20, '10-11']
    ]
  }
}

describe('types', () => {
  for (const mainType in shouldMatch) {
    for (const type in shouldMatch[mainType]) {
      shouldMatch[mainType][type].forEach(m => {
        it(mainType + '.' + type + ': ' + m.map(JSON.stringify).join(' should match '), () => {
          assert(types[mainType][type](...m))
        })
      })

      shouldNotMatch[mainType][type].forEach(m => {
        it(mainType + '.' + type + ': ' + m.map(JSON.stringify).join(' should not match '), () => {
          assert(!types[mainType][type](...m))
        })
      })
    }
  }
})
