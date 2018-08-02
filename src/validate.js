'use strict'

/* eslint-disable guard-for-in */

const types = require('./types')

function validate (current, parsed, protocols) {
  const raise = (ex) => {
    throw new Error('ValidationError: Address part ' + (current + 1) + ': ' + ex)
  }
  const cur = parsed[current]
  const curProto = protocols.filter(proto => proto.name === cur.protocol)[0]
  if (!curProto) {
    raise('Definition for ' + cur.protocol + ' not found! Please check if it is a child protocol (for example of tcp) or misspelled')
  }
  for (const key in cur.conditions) {
    let keyDef = curProto.properties[key]
    if (!keyDef) {
      raise('Protocol ' + cur.protocol + ' does not support the key ' + key)
    }
    const type = types[keyDef.type]
    const cond = cur.conditions[key]
    if (!cond.compare) {
      cond.compare = keyDef.matcher || 'strict'
    } else {
      if (Object.keys(type).indexOf(cond.compare) === -1) {
        raise('Key ' + key + ' from ' + cur.protocol + ' is type ' + keyDef.type + ' which does not support the compare method ' + cond.compare)
      }
    }
  }

  if (parsed.length > ++current) {
    if (curProto.children) {
      protocols = curProto.children
    }

    validate(current, parsed, protocols)
  }

  return parsed
}

module.exports = (parsed, protocols) => {
  return validate(0, parsed, protocols)
}
