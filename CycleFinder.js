const fs = require('fs');

module.exports = class CycleFinder {
	#graph;
	#knownCycles;
	#leafNodes;
	#lostNodes;
	#selfCycles;

	constructor(graph) {
		this.#graph = graph;
	}

	getLeafNodes() {
		return this.#leafNodes;
	}

	getLostNodes() {
		return this.#lostNodes;
	}

	getSelfCycles() {
		return this.#selfCycles;
	}

	findCyclesFromNode(startNode) {
		if (!(this.#graph.hasOwnProperty(startNode))) {
			throw "given start node is not in graph";
		}

		this.#knownCycles = [];
		this.#leafNodes = [];
		this.#lostNodes = [];
		this.#selfCycles = [];

		this.#findCycles([startNode]);

		return this.#knownCycles;
	}

	#findCycles(path) {
		const startNode = path[0];
		const currentNode = path[path.length - 1];
		const previousNode = path.length > 1 ? path[path.length - 2] : null;

		if (!(this.#graph.hasOwnProperty(currentNode))) {
			this.#lostNodes.push(currentNode);
		} else if (currentNode === previousNode) {
			if (path.length === 2) {
				this.#knownCycles.push(path);
			}
		} else if (path.length > 1 && currentNode === startNode) {
			this.#knownCycles.push(path);
		} else {
			const knownCyclesWithCurrentNode = this.#knownCycles.filter(cycle => cycle.includes(currentNode));
			if (knownCyclesWithCurrentNode.length > 0) {
				for (let cycle of knownCyclesWithCurrentNode) {
					const indexInCycle = cycle.findIndex(node => node === currentNode);
					const restOfCycle = cycle.slice(indexInCycle + 1);
					const newCycle = path.concat(restOfCycle);
					this.#knownCycles.push(newCycle);
				}
			} else {
				const neighbors = this.#graph[currentNode];
				if (neighbors.length = 0) {
					this.#leafNodes.push(currentNode);
				} else {
					for (let neighbor of neighbors) {
						const newPath = [...path];
						newPath.push(neighbor);
						extendedPath = newPath;
						this.#findCycles(extendedPath);
					}
				}
			}
		}
	}
}