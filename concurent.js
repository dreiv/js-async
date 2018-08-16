function randomInteger(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

function fetch(url, next) {
	setTimeout(() => next(url), randomInteger(0, 1000))
}

const arr = ['A', 'B', 'C']
const results = []

arr.forEach(item => {
	fetch(item, res => {
		results.push(res)

		if (results.length === arr.length) {
			console.log(...results)
		}
	})
})
