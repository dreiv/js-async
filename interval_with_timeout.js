function setInterval(fn, delay) {
	let int
	function go() {
		int = setTimeout(() => {
			fn()
			go()
		}, delay)

		return { clearInterval: () => clearTimeout(int) }
	}

	return go()
}

const t = setInterval(() => {
	console.log(new Date().toUTCString())
}, 500)

setTimeout(() => {
	t.clearInterval() // Alternated API, see a hint below
}, 5000)
