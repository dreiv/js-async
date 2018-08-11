function randomInteger(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

function fetch(url, next) {
	setTimeout(() => next(url), randomInteger(0, 1000))
}

fetch('a', a => {
	fetch('b', b => {
		fetch('c', c => {
			console.log(a, b, c) // A B C
		})
	})
})

const urls = ['a', 'b', 'c']
const results = []
urls.forEach(url => {
	fetch(url, result => {
		results.push(result)
		if (results.length === urls.length) {
			console.log(...results) // A B C | A C B | ... (random order)
		}
	})
})
