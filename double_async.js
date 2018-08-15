const chunkArray = (array, chunkSize) => {
	const results = []
	const input = array.slice(0)

	while (input.length) {
		results.push(input.splice(0, chunkSize))
	}

	return results
}

const double = x => x * 2
const xs = [...Array(1200).keys()]
const ys = []

chunkArray(xs, xs.length / 4).forEach(async arr => {
	await ys.push(...arr.map(double))
})

console.log(ys)
