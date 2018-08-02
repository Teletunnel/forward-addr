'use strict'

const lexer = require('./lexer')
const parser = require('./parser')
const compiler = require('./compiler')

module.exports = function Parser (str) {
  return compiler(parser(lexer(str)))
}
