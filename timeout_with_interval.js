function setTimeout(fn, delay) {
	const int = setInterval(() => {
		fn()
		clearInterval(int)
	}, delay)

	return int
}

setTimeout(() => console.log('should log once'), 1000)
