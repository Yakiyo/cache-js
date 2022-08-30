# Cache JS
<div align="center"><img src="https://github.com/Yakiyo/cache-js/actions/workflows/build.yml/badge.svg"> <img src="https://github.com/Yakiyo/cache-js/actions/workflows/lint.yml/badge.svg"></div>
<!-- <div align="center">
<a href="https://gitpod.io/from-referrer/"><img src="./image/gitpod.svg" alt="Open on gitpod https://gitpod.io/from-referrer/"></a>
</div> -->

## About
Minimal implementation of a cache using javascript's [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
Lightweight and easy to use. Includes typescript typings.

## Installation
Just install the package
```bash
$ npm install cache-js
# or 
$ yarn add cache-js
# or
$ pnpm add cache-js
```

## Usage

Import the package in your file and initialize the class

```js
// Es6 imports
import Cache from 'cache-js';

// Use dynamic import for Commonjs
// cz the package is written in esm
const { Cache } = await import('cache-js'); 

const cache = new Cache(60);
```
The constructor takes a number which indicated the duration in seconds upto which the cache should remain valid. Defaults to zero which means every entry is forever valid.

## Methods
The Cache class extends javascript's base [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class, so every method of Map can be used on instances of the cache class too.
### `valid(key): boolean`
Checks if a key is valid or not using the duration specified while initializing the class
```js
cache.valid('key-name'); // True or False
```

### `add(key, value): value`
Adds a new entry to the cache
```js
cache.add('key', 'value'); // 'value'
```

### `fetch(key): value | undefined`
Fetches a value from the cache. Returns undefined if the key doesn't exist or if the key expires. If they key expires, it is internally deleted.
```js
cache.fetch('key'); // 'value'
cache.fetch('non-existent-key'); // undefined
cache.fetch('expired-key'); // undefined
```

### `remove(key): void`
Removes an entry from the cache
```js
cache.remove('key');
```

### `sweep(): cache`
Clears all expired entries from the cache.
```js
cache.sweep(); // cache
```

### `toArray(): Array`
Returns an array of all the values of cache
```js
cache.toArray(); // ['value 1', 'value 2']
```

### `toMap(): Map`
Returns a new map of the key value pairs in the cache
```js
cache.toMap() // [Map Object]
```