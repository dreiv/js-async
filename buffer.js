function bufferByCount(n, fn) {
	let buffer = []

	return arg => {
		if (buffer.length < n) {
			buffer.push(arg)
		}
		if (buffer.length === n) {
			fn(buffer)
			buffer = []
		}
	}
}

const bufferByTime = (t, fn) => {
	let buffer = []

	return arg => {
		if (!buffer.length) {
			setTimeout(() => {
				fn(buffer)
				buffer = []
			}, t)
		}

		buffer.push(arg)
	}
}

const log = console.log
const logBuffered = bufferByTime(150, log)
// const logBuffered = bufferByCount(3, log)

setTimeout(_ => logBuffered(1), 100)
setTimeout(_ => logBuffered(2), 150)
setTimeout(_ => logBuffered(3), 200)

setTimeout(_ => logBuffered(1), 500)
setTimeout(_ => logBuffered(2), 550)
setTimeout(_ => logBuffered(3), 700)
