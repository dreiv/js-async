let ball = 'ping'

function makePlayer(name, timeout) {
	setTimeout(() => {
		setInterval(() => {
			ball = ball === 'ping' ? 'pong' : 'ping'

			console.log(`${name}: ${ball}`)
		}, 1000)
	}, timeout)
}

makePlayer('Mary', 0)
makePlayer('Sue', 500)
