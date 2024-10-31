// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', evt => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector('.targeted').classList.remove('targeted')
        evt.currentTarget.classList.add('targeted')
        console.log(evt.target)
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })





  document.addEventListener('keydown', evt => {

    const targetedSquare = document.querySelector('.targeted')
    const rows = Array.from(document.querySelectorAll('.row'))

    const squareRow = rows.find(row => row.contains(targetedSquare))
    let squareRowIndex = rows.indexOf(squareRow)

    const squareColumn = Array.from(squareRow.children)
    let squareColumnIndex = squareColumn.indexOf(targetedSquare)

    let currentSquare = rows[squareRowIndex].children[squareColumnIndex];
    console.log(squareRow)
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    if (evt.key === keys.up) {
      const targetedSquare = document.querySelector('.targeted')
      const rows = Array.from(document.querySelectorAll('.row'))

      const squareRow = rows.find(row => row.contains(targetedSquare))
      let squareRowIndex = rows.indexOf(squareRow)

      const squareColumn = Array.from(squareRow.children)
      let squareColumnIndex = squareColumn.indexOf(targetedSquare)

      currentSquare.classList.remove('targeted')

      squareRowIndex = Math.max(0, squareRowIndex - 1);
      currentSquare = rows[squareRowIndex].children[squareColumnIndex];
      currentSquare.classList.add('targeted')

      // console.log(`Row index: ${squareRowIndex}, Column index: ${squareColumnIndex}`);
      // console.log(currentSquare)
    } else if (evt.key === keys.down) {
      currentSquare.classList.remove('targeted')

      squareRowIndex = Math.min(rows.length - 1, squareRowIndex + 1);
      currentSquare = rows[squareRowIndex].children[squareColumnIndex];
      currentSquare.classList.add('targeted')
    } else if (evt.key === keys.right) {
      currentSquare.classList.remove('targeted')

      squareColumnIndex = Math.min(squareColumn.length - 1, squareColumnIndex + 1);
      currentSquare = rows[squareRowIndex].children[squareColumnIndex];
      currentSquare.classList.add('targeted')
    } else if (evt.key === keys.left) {
      currentSquare.classList.remove('targeted')

      squareColumnIndex = Math.max(0, squareColumnIndex - 1);
      currentSquare = rows[squareRowIndex].children[squareColumnIndex];
      currentSquare.classList.add('targeted')
    } else if (evt.key === keys.space) {
      if (currentSquare.firstChild) {
        currentSquare.firstChild.setAttribute('data-status', 'dead')
        currentSquare.style.backgroundColor = 'red'
      }
    }
    let bugsAlive = Array.from(document.querySelectorAll('[data-status="alive"]'))
    let h2 = document.querySelector('h2')
    if (!bugsAlive.length) {
      document.querySelector('.info').textContent = `Extermination completed in ${getTimeElapsed()/1000} seconds!`
      let restartBtn = document.createElement('button')
      restartBtn.textContent = 'Restart'
      restartBtn.addEventListener('click', () => location.reload())
      h2.appendChild(restartBtn)


    }
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈

    // 👉 TASK 5 - End the game 👈
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
