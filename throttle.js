const d = new Date()

const throttle = (delay, fn) => {
	let lock = false
	return (...args) => {
		if (!lock) {
			setTimeout(() => {
				fn(...args)
				lock = false
			}, delay)
		}
	}
}

const log = () => console.log(new Date() - d)
const logThrottled = throttle(1000, log)

setInterval(logThrottled, 500)

// --!--!--!--!--!--!--> t (logThrottled calls)
// -----x-----x-----x--> t (log calls)
//     1.5s  2.5s  3.5s
