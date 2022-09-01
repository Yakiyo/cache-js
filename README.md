# <div align="center">Cache JS</div> 

<div align="center"><img src="https://github.com/Yakiyo/cache-js/actions/workflows/build.yml/badge.svg"> <img src="https://github.com/Yakiyo/cache-js/actions/workflows/lint.yml/badge.svg"> <a href="https://github.com/Yakiyo/cache-js"><img src="https://img.shields.io/github/stars/Yakiyo/cache-js?style=social"></a> <a href="https://www.npmjs.com/package/@yakiyo/cache-js"><img src="https://img.shields.io/npm/v/@yakiyo/cache-js"></a> </div>

## About 
Minimal implementation of a cache using javascript's [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
Lightweight and easy to use. Includes typescript typings. 

## Installation
Just install the package
```bash
$ npm install @yakiyo/cache-js
# or 
$ yarn add @yakiyo/cache-js
# or
$ pnpm add @yakiyo/cache-js
```

## Usage

Import the package in your file and initialize the class

```ts
// Es6 imports
import Cache from '@yakiyo/cache-js';

// Use dynamic import for Commonjs
// cz the package is written in esm
const { Cache } = await import('@yakiyo/cache-js'); 

const cache = new Cache<k, v>(60);
```
The constructor takes a number which indicated the default duration in seconds upto which the cache should remain valid. You can also set duration per entry with the [add](#addkey-value-value) method. The default is 0 if not specified while initiating.

## Methods
The Cache class extends javascript's base [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class, so every method of Map can be used on instances of the cache class too.
### `valid(key: k): boolean`
Checks if a key is valid or not using the duration specified while initializing the class
```ts
cache.valid('key-name'); // True or False
```

### `add(key: k, value: v, duration?: number): value`
Adds a new entry to the cache. Duration is the time in seconds till which the entry should be valid. If unspecified, it uses the default duration specified while initiating the class. If even that is set to 0, the entry remains forever valid.
```ts
cache.add('key', 'value', 20); // 'value'
```

### `fetch(key: k): value | undefined`
Fetches a value from the cache. Returns undefined if the key doesn't exist or if the key expires. If the key expires, it is internally deleted.
```ts
cache.fetch('key'); // 'value'
cache.fetch('non-existent-key'); // undefined
cache.fetch('expired-key'); // undefined
```

### `remove(key: k): void`
Removes an entry from the cache
```ts
cache.remove('key');
```

### `sweep(): cache`
Clears all expired entries from the cache.
```ts
cache.sweep(); // cache
```

### `toArray(): Array`
Returns an array of all the values of cache
```ts
cache.toArray(); // ['value 1', 'value 2']
```

### `toMap(): Map`
Returns a new map of the key value pairs in the cache
```ts
cache.toMap() // [Map Object]
```
<hr>

## Side-note
This project is inspired by [@discordjs/Collection](https://discord.js.org/#/docs/collection)

## Author
**Cache-js** © [Yakiyo](https://github.com/Yakiyo). Authored and maintained by Yakiyo.

Released under [MIT](https://opensource.org/licenses/MIT) License
