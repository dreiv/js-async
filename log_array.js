function logArray(xs) {
	if (!xs.length) {
		return
	}
	const [x, ...xsRest] = xs
	console.log(x)
	setImmediate(() => {
		logArray(xsRest)
	})
}

function range(n) {
	return [...Array(n).keys()]
}

logArray(range(10000))
