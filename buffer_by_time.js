function bufferByTime(delay, fn) {
	let buffer = []

	return param => {
		if (!buffer.length) {
			setTimeout(() => {
				fn([...buffer])

				buffer = []
			}, delay)
		}

		buffer.push(param)
	}
}

const { log } = console
const logBuffered = bufferByTime(150, log)

setTimeout(() => logBuffered(1), 100)
setTimeout(() => logBuffered(2), 150)
setTimeout(() => logBuffered(3), 200)

setTimeout(() => logBuffered(1), 500)
setTimeout(() => logBuffered(2), 550)

// --1-2-3----------1-2-----------> t (logBuffered calls)
// -------x--------------x--------> t (log calls)
//        [1, 2, 3]      [1, 2]
