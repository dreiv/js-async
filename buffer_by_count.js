function bufferByCount(count, fn) {
	let buffer = []

	return arg => {
		buffer.push(arg)

		if (buffer.length === count) {
			fn([...buffer])

			buffer = []
		}
	}
}

const { log } = console
const logBuffered = bufferByCount(3, log)

setTimeout(() => logBuffered(1), 100)
setTimeout(() => logBuffered(2), 150)
setTimeout(() => logBuffered(3), 200)

setTimeout(() => logBuffered(4), 500)
setTimeout(() => logBuffered(5), 550)
setTimeout(() => logBuffered(6), 700)

// --1-2-3----------4-5---6--------> t (logBuffered calls)
// ------x----------------x--------> t (log calls)
//       [1, 2, 3]        [4, 5, 6]
