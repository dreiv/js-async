const frames = ['/', '–', '\\', '|'] // spin frames

let i = 0
process.stderr.write('\x1B[?25l') // hide cursor
const t = setInterval(() => {
	process.stdout.clearLine()
	process.stdout.cursorTo(0)
	process.stdout.write(frames[i])
	i = (i + 1) % frames.length
}, 100)

process.on('SIGINT', () => {
	clearInterval(t)
	process.stderr.write('\x1B[?25h') // show cursor
	console.log()
})
