const d = new Date()

const debounce = (delay, fn) => {
	let t
	return (...args) => {
		clearTimeout(t)
		t = setTimeout(() => fn(...args), delay)
	}
}

const log = () => console.log(new Date() - d)
const logDebounced = debounce(1000, log)

setTimeout(logDebounced, 10)
setTimeout(logDebounced, 20)
setTimeout(logDebounced, 2000)
setTimeout(logDebounced, 2010)

// !!-------!!--------> t (logDebounced calls)
// ----x--------x-----> t (log calls)
//    ~1s      ~3s
