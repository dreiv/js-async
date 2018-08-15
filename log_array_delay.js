const letters = ['a', 'b', 'c']

letters.forEach((letter, idx) => {
	setTimeout(() => {
		console.log(letter)
	}, 1000 * idx)
})
