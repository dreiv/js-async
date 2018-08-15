const chunkArray = (array, chunkSize) => {
	const results = []
	const input = array.slice(0)

	while (input.length) {
		results.push(input.splice(0, chunkSize))
	}

	return results
}

const add = (x, y) => x + y
const sum = arr => arr.reduce(add, 0)
const xs = [...Array(1200).keys()]

const total = sum(chunkArray(xs, xs.length / 4).map(arr => sum(arr)))

console.log(total)
