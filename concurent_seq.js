const afn1 = next => next('A')
const afn2 = (x1, next) => next(`${x1}-B`)
const afn3 = (_, x2, next) => next(`${x2}-C`)

afn1(x1 => {
	afn2(x1, x2 => {
		afn3(x1, x2, x3 => {
			console.log(x1, x2, x3)
		})
	})
})
