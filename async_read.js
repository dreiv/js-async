const readFoo = (path, next) => {
	next(path)
}

const writeBar = (path, data, next = () => null) => {
	next()
}

readFoo('a1.txt', data1 => {
	readFoo('a2.txt', data2 => {
		writeBar('b1.txt', data1, () => {
			writeBar('b2.txt', data2)
		})
	})
})
