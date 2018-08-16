const CHAR_DELAY = 50
const LETTER_DELAY = 200
const WORD_DELAY = 400

function logMorseLetter(letter, next) {
	if (!letter.length) {
		process.stdout.write(' ')
		return next()
	}
	const [char, ...chars] = letter
	process.stdout.write(char)
	setTimeout(() => logMorseLetter(chars, next), CHAR_DELAY)
}

function logMorseWord(word, next) {
	if (!word.length) {
		process.stdout.write(' ')
		return next()
	}
	const [letter, ...letters] = word

	logMorseLetter(letter, () => {
		setTimeout(() => logMorseWord(letters, next), LETTER_DELAY)
	})
}

function logMorseText(text, next) {
	if (!text.length) {
		return next()
	}
	const [word, ...words] = text

	logMorseWord(word, () => {
		setTimeout(() => logMorseText(words, next), WORD_DELAY)
	})
}

// Step-1
logMorseLetter('.-..', () => null)

// Step-2
logMorseWord(['.-..', '---', '.-.', '.', '--'], () => null)

// Step-3
logMorseText(
	[
		['.-..', '---', '.-.', '.', '--'],
		['..', '.--.', '...', '..-', '--'],
		['-..', '---', '.-..', '---', '.-.'],
		['...', '..', '-'],
		['.-', '--', '.', '-'],
	],
	() => null
)
