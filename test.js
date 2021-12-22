const CycleFinder = require('./CycleFinder');
const assert = require('assert');
const fs = require('fs');

const graph = JSON.parse(fs.readFileSync('testGraph.json'));
const cycleFinder = new CycleFinder(graph);

// Start at center node
let cycles = cycleFinder.findCyclesFromNode("e");
let leafNodes = cycleFinder.getLeafNodes();
let lostNodes = cycleFinder.getLostNodes();
let expectedCycles = [
	["e","f","b","a","d","c","e"],
	["e","f","b","a","d","e"],
	["e","f","i","h","g","d","c","e"],
	["e","f","i","h","g","d","e"]
];
assert.deepEqual(cycles, expectedCycles);
assert.deepEqual(leafNodes, ["k"]);
assert.deepEqual(lostNodes, ["j"]);

// Start at node with self-loop
cycles = cycleFinder.findCyclesFromNode("i");
leafNodes = cycleFinder.getLeafNodes();
lostNodes = cycleFinder.getLostNodes();
expectedCycles = [
	["i", "h", "g", "d", "c", "e", "f", "i"],
	["i", "h", "g", "d", "e", "f", "i"],
	["i", "i"]
];
assert.deepEqual(cycles, expectedCycles);
assert.deepEqual(leafNodes, ["k"]);
assert.deepEqual(lostNodes, ["j"]);

// Start at leaf node
cycles = cycleFinder.findCyclesFromNode("k");
leafNodes = cycleFinder.getLeafNodes();
lostNodes = cycleFinder.getLostNodes();
expectedCycles = [];
assert.deepEqual(cycles, expectedCycles);
assert.deepEqual(leafNodes, ["k"]);
assert.deepEqual(lostNodes, []);

// Start at lost node
try {
	cycles = cycleFinder.findCyclesFromNode("j");
	assert.fail();
} catch (e) {
	assert.equal(e, "given start node is not in graph")
}

// Start at non-existent node
try {
	cycles = cycleFinder.findCyclesFromNode("hubbub");
	assert.fail();
} catch (e) {
	assert.equal(e, "given start node is not in graph")
}