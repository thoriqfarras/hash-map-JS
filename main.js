import StringHashMap from './hashMap.js';
import StringHashSet from './hashSet.js';

const map = new StringHashMap();
map.set('novi', 16);
map.set('noVI', 'rahayu');
map.set('nOVI', 'lala');
map.set('NoVI', 'poro');
map.set('brian', 'rich');
map.set('BRIan', 'chigga');
map.set('Musician', 33);
map.set('MusiciaN', 34);
map.set('MusiCIAN', 35);
map.set('MusiCINA', 36);
map.set('MusiCANI', 37);
map.set('MusiCNIA', 37);
map.set('MusiCAIN', 37);
map.set('MusiCAINa', 37);
map.set('MusiCAINaN', 37);
console.log('map: ', map.entries());

console.log('get NOVI: ', map.get('NOVI'));
console.log('get novi: ', map.get('novi'));
console.log('get MusiCINA: ', map.get('MusiCINA'));

console.log('has NOVI: ', map.has('NOVI'));
console.log('has novi: ', map.has('novi'));
console.log('has MusiCINA: ', map.has('MusiCINA'));
console.log('map length: ', map.length());
console.log(
  'remove MusiCINA (0 if successful, -1 otherwise): ',
  map.remove('MusiCINA')
);
console.log('map length: ', map.length());
console.log('map keys: ', map.keys());
console.log('map values: ', map.values());

console.log();

const set = new StringHashSet();
set.add('hello');
set.add('hello');
set.add('hello');
set.add('hello1');
set.add('hello2');
set.add('hello3');
set.add('hello4');
set.add('hello5');
set.add('hello6');
set.add('hello7');
set.add('hello8');
set.add('hello9');
set.add('hello10');
set.add('hello11');
set.add('hello12');
set.add('hello13');
set.remove('hello13');
console.log('set: ', set.keys());

console.log('has hello1: ', set.has('hello1'));
console.log('has hello11: ', set.has('hello11'));
console.log('has hello15: ', set.has('hello15'));
console.log('get hello9: ', set.get('hello9'));
console.log('set length: ', set.length());
console.log(
  'remove hello7 (0 if successful, -1 otherwise): ',
  set.remove('hello7')
);
console.log('set length: ', set.length());
