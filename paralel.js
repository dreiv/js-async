const add = (x, y) => x + y
const sum = x => x.reduce(add, 0)
let xs = [1, 2, 3, 4, 5, 6, 7]

xs = [
	xs.slice(0, Math.ceil(xs.length / 2)),
	xs.slice(Math.ceil(xs.length / 2), xs.length),
]
const ys = []

setImmediate(_ => ys.push(sum(xs[0]))) // "thread" #1
setImmediate(_ => ys.push(sum(xs[1]))) // "thread" #2
setImmediate(_ => console.log(sum(ys))) // "thread" #3
