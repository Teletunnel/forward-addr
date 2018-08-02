'use strict'

/* eslint-disable guard-for-in */

const types = require('./types')

module.exports = (parsedAddr, connState) => {
  for (let i = 0; i < parsedAddr.length; i++) {
    let cur = parsedAddr[i]

    if (connState[i]) {
      if (connState[i][0] !== cur.protocol) { // can't match, protocols different
        return 0
      }

      for (const key in cur.conditions) {
        const cond = cur.conditions[key]
        const compareFnc = types[cond.type][cond.compare]

        if (!compareFnc(connState[i][1], cond.value)) { // can't match, direct comparison failed
          return 0
        }
      }
    } else {
      return 1 // might match
    }
  }

  return 2 // if we're still here it means it matches
}
