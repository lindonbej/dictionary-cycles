const CycleFinder = require('CycleFinder.js');

// 86,024 vertices (words)
// 1,072,562 edges
// |V| * |V| = over 7 billion

const dictionary = JSON.parse(fs.readFileSync('dictionary.json'));
const cycleFinder = new CycleFinder(dictionary);
const cycles = cycleFinder.findCycles("APPLE");
fs.writeFileSync('cycles.json', JSON.stringify(cycles));