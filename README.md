# forward-addr

A multiaddr-inspired address format for recursivly matching protocols and properties

> # WIP

## API

- `.parse(String str)<Object>`

Returns a parsed forward-addr

Example:

```js
console.log(fwAddr.parse('/tcp/.port/5323/ssl/.hostname/*.example.com/http/.path/"/myservice"/_ws/stream/'))

/* [
  {protocol: 'tcp', conditions: {port: {compare: '', value: '5323'}, action: 'stream'},
  {protocol: 'ssl', conditions: {hostname: {compare: '', value: '*.example.com'}}, action: 'stream'},
  {protocol: 'http', conditions: {path: {compare: '', value: '/myservice'}}, action: 'sub', sub: {
    protocol: 'ws', conditions: {}, action: 'stream'
  }},
] */
```

> Below APIs are not implemented yet

- `.validate(Object parsedAddr, Protocols[] protocols)<Object>`

Validates the multiaddr. Throws if it is using invalid combinations of protocols, etc.

Returns a new complete parsed object where missing `match` fields are filled in and values are properly parsed.

- `.match(Object parsedAddr, Object connState)<Boolean>`

Matches a parsed address with a connection state
