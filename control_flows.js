function randomInteger(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

function fetch(url) {
	return function(next) {
		setTimeout(() => {
			next(`${url}!`)
		}, randomInteger(800, 1000))
	}
}

function parallelAlpha(fns, callback) {
	if (!fns.length) {
		return callback([])
	}
	const results = []
	fns.forEach(fn => {
		fn(res => {
			results.push(res)
			if (results.length === fns.length) {
				callback(results)
			}
		})
	})
}

function seriesAlpha(functions, callback) {
	function go(fns, results) {
		if (!fns.length) {
			return callback(results)
		}
		const [fn, ...restFns] = fns
		fn(result => {
			go(restFns, [...results, result])
		})
	}

	go(functions, [])
}

function waterfallAlpha(functions, callback) {
	function go(fns, lastResult) {
		if (!fns.length) {
			return callback(lastResult)
		}
		const [fn, ...restFns] = fns
		fn(lastResult, result => {
			go(restFns, result)
		})
	}
	go(functions, null)
}

parallelAlpha(
	[
		fetch('A'), // \
		fetch('B'), //  | work in parallel
		fetch('C'), // /
	],
	res => {
		console.log(res) // ["A!", "B!", "C!"] or ["A!", "C!", "B!"] or ...
	}
)

seriesAlpha(
	[
		fetch('A'), // works first
		fetch('B'), // works second
		fetch('C'), // works third
	],
	res => {
		console.log(res) // ["A!", "B!", "C!"]
	}
)

waterfallAlpha(
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
