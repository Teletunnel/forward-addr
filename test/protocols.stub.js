'use strict'

module.exports = [
  {
    name: 'tcp',
    properties: {
      port: {
        type: 'number',
        matcher: 'strict'
      }
    },
    children: [
      {
        name: 'ssl',
        properties: {
          hostname: {
            type: 'string',
            matcher: 'glob'
          }
        }
      },
      {
        name: 'http',
        properties: {
          path: {
            type: 'string',
            matcher: 'strict'
          }
        },
        sub: {
          ws: {
            properties: {}
          }
        }
      }
    ]
  }
]
