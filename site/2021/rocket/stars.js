// getStars() from the 2021 Rocket.js, without React: 100 divs with random
// positions, sizes and fall durations. A duration of 0 s means a star never moves.
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const stars = document.querySelector('.stars')
for (let starNumber = 100; starNumber > 0; starNumber--) {
  const size = getRandomInt(5)
  const star = document.createElement('div')
  star.className = 'star'
  star.style.left = getRandomInt(100) + '%'
  star.style.top = -getRandomInt(100) + '%'
  star.style.width = size / 10 + 'rem'
  star.style.height = size / 10 + 'rem'
  star.style.animationDuration = getRandomInt(50) + 's'
  stars.append(star)
}
