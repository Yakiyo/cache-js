const Cache = require('../lib/index.js');

const cache = new Cache(5);

// Adding an entry
cache.add('key', 'value');

// Make sure it returns undefined after expired time
setTimeout(() => {
    console.log(cache.fetch('key'));
}, 5 * 1000);

// Fetching an entry
console.log(cache.fetch('key'));

// toArray and toMap test
console.log(cache.toArray(), cache.toMap());