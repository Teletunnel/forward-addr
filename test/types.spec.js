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
  },
  float: {
    strict: [
      [2, 2],
      ['2', 2],
      ['2', '2'],
      [2.1, 2.1],
      ['2.1', 2.1],
      ['2.1', '2.1']
    ],
    range: [
      [20, '10-30'],
      [20, '20-21'],
      [20, '20-20'],
      [20.1, '10.1-30.1'],
      [20.1, '20.1-21.1'],
      [20.1, '20.1-20.1']
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
  },
  float: {
    strict: [
      [23, 22],
      [23.1, 22.1]
    ],
    range: [
      [20, '10-11'],
      [20.1, '10.1-11.1']
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
