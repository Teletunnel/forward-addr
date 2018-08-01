'use strict'

/* eslint-env mocha */

const parser = require('..').parse
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
    ]
  ]
]

describe('parser', () => {
  samples.forEach((sample, i) => {
    it('should parse ' + JSON.stringify(sample[0]) + ' correctly', () => {
      assert.deepStrictEqual(parser(sample[0]), sample[1])
    })
  })
})
