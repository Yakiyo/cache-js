import Cache from "../lib/index.js";
console.log('Testing ES module');
const cache = new Cache(4);

// Adding an entry
cache.add('key', 'value');
cache.add('key 2', 'value 2', 10);

// Make sure key returns undefined 
// and key2 returns value2
setTimeout(() => {
    const key1 = cache.fetch('key'), key2 = cache.fetch('key 2');
    console.log('value 1 after 5 seconds -', key1);
    console.log('value 2 after 5 seconds -', key2);
    if (key1 !== undefined && key2 === undefined) throw new Error('Error, key 1 should be undefined and key 2 should be valid');
    setTimeout(() => {
        const key22 = cache.fetch('key 2');
        console.log('value 2 after another 5 seconds -', key22);
        if (key22 !== undefined) throw new Error('Error, key 2 should be undefined at this point');
    }, 6 * 1000);
}, 5 * 1000);

// Fetching an entry
console.log('value 1 initially -', cache.fetch('key'),'\nvalue 2 initially -', cache.fetch('key 2'));

// Testing addMany
console.log(cache.addMany(['key 3', 'value 3'], ['key 4', 'value 4'], ['key 5', 'value 5']));

// toArray and toMap test
console.log('Array -', cache.toArray(),'\nMap -', cache.toMap());