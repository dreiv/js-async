const SHORT_DELAY = 100
const LONG_DELAY = 200

const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

data.forEach((numbers, idx) => {
	setTimeout(() => {
		numbers.forEach(number => {
			setTimeout(() => {
				console.log(number)
			}, SHORT_DELAY)
		})
	}, LONG_DELAY * idx)
})
