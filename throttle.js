const d = new Date()

const throttle = (delay, fn) => {
	let lock

	return (...args) => {
		if (!lock) {
			setTimeout(() => {
				fn(...args)
				lock = false
			}, delay)

			lock = true
		}
	}
}

const log = () => console.log(new Date() - d)
const logThrottled = throttle(1000, log)

const int = setInterval(() => {
	logThrottled()
}, 50)

setTimeout(() => clearInterval(int), 5000)

// --!--!--!--!--!--!--> t (logThrottled calls)
// -----x-----x-----x--> t (log calls)
//     1.5s  2.5s  3.5s
