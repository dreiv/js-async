const afn = (x, next) => {
	setTimeout(() => next(x), Math.random() * 1000)
}

const xs = ['A', 'B', 'C']
const rs = []

xs.forEach(async x => {
	await afn(x, r => {
		rs.push(r)

		if (rs.length === xs.length) {
			console.log(rs)
		}
	})
})
