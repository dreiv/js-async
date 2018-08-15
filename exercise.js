// log time every 2 seconds

const currentTime = () => console.log(new Date().toUTCString())

const int = setInterval(currentTime, 2000)

// log time every 2 seconds for 30 seconds
setTimeout(() => clearInterval(int), 30000)
