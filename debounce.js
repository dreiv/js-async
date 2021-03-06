const debounce = (delay, fn) => {
	let int

	return (...arg) => {
		clearTimeout(int)
		int = setTimeout(() => fn(...arg), delay)
	}
}

const { log } = console
const logDebounced = debounce(1000, log)

setTimeout(() => logDebounced(1), 10)
setTimeout(() => logDebounced(2), 20)
setTimeout(() => logDebounced(3), 2000)
setTimeout(() => logDebounced(4), 2010)

// !!-------!!--------> t (logDebounced calls)
// ----x--------x-----> t (log calls)
//    ~1s      ~3s
