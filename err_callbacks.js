function randomInteger(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

function chance(p) {
	return randomInteger(0, 100) < p // `p` % of `true`
}

function fetch(url) {
	return function(next) {
		setTimeout(() => {
			const err = chance(10)
			if (err) {
				next('network problems')
			} else {
				next(null, `${url}!`)
			}
		}, randomInteger(800, 1000)) // random delay between 800 and 1000 ms
	}
}

// simplified clone of `async.parallel`
function parallel(fns, lastFn) {
	if (!fns.length) {
		return lastFn(null, [])
	}
	const results = []
	let isLocked = false

	fns.forEach(fn => {
		fn((err, data) => {
			if (!isLocked) {
				if (err) {
					lastFn(err, [])
					isLocked = true
				} else {
					results.push(data)

					if (results.length === fns.length) {
						lastFn(null, results)
					}
				}
			}
		})
	})
}

// `$ time node test.js` should log ~1 second
parallel(
	[
		fetch('A'), // \
		fetch('B'), //  | work in parallel
		fetch('C'), // /
	],
	(err, res) => {
		if (err) {
			throw err
		}
		console.log(res) // ["A!", "B!", "C!"] or ["A!", "C!", "B!"] or ...
	}
)

// simplified clone of `async.series`
function series(functions, lastFn) {
	function go(fns, results) {
		if (!fns.length) {
			return lastFn(null, results)
		}

		const [fn, ...restFns] = fns

		fn((err, result) => {
			if (err) {
				lastFn(err, [])
			} else {
				go(restFns, [...results, result])
			}
		})
	}

	go(functions, [])
}

// `$ time node 6.1.tsk.js` should log ~3 seconds
series(
	[
		fetch('A'), // works first
		fetch('B'), // works second
		fetch('C'), // works third
	],
	(err, res) => {
		if (err) {
			throw err
		}
		console.log(res) // ["A!", "B!", "C!"]
	}
)

// simplified clone of `async.waterfall`
function waterfall(functions, lastFn) {
	function go(fns, lastResult) {
		if (!fns.length) {
			return lastFn(null, lastResult)
		}
		const [fn, ...restFns] = fns
		fn(lastResult, (err, result) => {
			if (err) {
				lastFn(err, [])
			} else {
				go(restFns, result)
			}
		})
	}
	go(functions, null)
}

// `$ time node 6.1.tsk.js` should log ~3 seconds
waterfall(
	[
		(_, next) => {
			fetch('A')(next)
		},
		(a, next) => {
			console.log(a)
			fetch('B')(next)
		},
		(b, next) => {
			console.log(b)
			fetch('C')(next)
		},
	],
	c => console.log(c)
) // "C!"
