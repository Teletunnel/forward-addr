'use strict'

/* eslint-env mocha */

const {parse, validate} = require('..')
const assert = require('assert')

const samples = [ // TODO: finish matches, protocols
  [
    '/tcp/.port/5323/ssl/.hostname/*.example.com/http/.path/"/myservice"/_ws/stream/',
    [
      {protocol: 'tcp', conditions: {port: {compare: '', value: '5323'}}, action: 'stream'},
      {protocol: 'ssl', conditions: {hostname: {compare: '', value: '*.example.com'}}, action: 'stream'},
      {protocol: 'http',
        conditions: {path: {compare: '', value: '/myservice'}},
        action: 'sub',
        sub: {
          protocol: 'ws', conditions: {}, action: 'stream'
        }}
    ],
    [
      {protocol: 'tcp', conditions: {port: {compare: 'strict', value: 5323}}, action: 'stream'},
      {protocol: 'ssl', conditions: {hostname: {compare: 'glob', value: '*.example.com'}}, action: 'stream'},
      {protocol: 'http',
        conditions: {path: {compare: 'strict', value: '/myservice'}},
        action: 'sub',
        sub: {
          protocol: 'ws', conditions: {}, action: 'stream'
        }}
    ]
  ]
]

let protocols = require('./protocols.stub')

describe('parser', () => {
  samples.forEach((sample, i) => {
    it('should parse sample #' + ++i + ' correctly', () => {
      assert.deepStrictEqual(parse(sample[0]), sample[1])
    })

    it.skip('should validate sample #' + i + ' correctly', () => {
      assert.deepStrictEqual(validate(parse(sample[0]), protocols), sample[1])
    })
  })
})
