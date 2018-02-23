const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const paletteSelect = document.getElementById('palette')
const imageSelect = document.getElementById('image')
const resolution = 15
const bitImage = document.getElementById('bitimage')

// lets resize our canvas to something usable
canvas.width = 320
canvas.height = 240

// lets define some images

// indirect color uses a representation of the color within memory
// here, we will represent numbers 0-4 with their respective colors
// within the selected color palette

const images = [
  [
    // image0 will be blank for ease of use
  ],
  [
    // cheep cheep
    //0=gray
    //1=orange
    //2=red
    //3=white
    [0,0,0,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,2,2,2,2,2,2,2,3,3,0,0],
    [0,3,2,3,3,2,2,2,2,3,3,3,3,0],
    [3,3,3,3,3,3,2,2,2,3,3,3,3,0],
    [3,2,3,3,2,3,2,2,2,3,3,3,3,0],
    [3,2,3,3,2,3,2,2,2,3,3,3,0,0],
    [0,3,2,3,3,2,2,2,3,3,3,2,0,0],
    [1,1,1,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,1,1,2,2,2,2,2,2,2,2,2,1],
    [0,2,2,1,2,2,2,2,2,2,2,2,1,1],
    [1,1,1,3,3,3,2,2,2,2,2,1,1,1],
    [0,0,3,3,3,3,3,2,2,2,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,0,0],
  ],
  [
    // mushroom
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,2,2,3,3,3,2,2,1,0,0],
    [0,1,1,2,2,3,3,3,2,2,1,1,0],
    [0,1,3,3,2,2,2,2,2,3,3,1,0],
    [0,1,3,3,2,3,3,3,2,3,3,1,0],
    [0,1,2,1,1,1,1,1,1,1,2,1,0],
    [0,1,1,3,3,1,3,1,3,3,1,1,0],
    [0,0,1,3,3,1,3,1,3,3,1,0,0],
    [0,0,1,1,3,3,3,3,3,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  //mario
  [
    [0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,2,2,2,3,3,4,3,0,0,0,0,0,0],
    [0,0,2,3,2,3,3,3,4,3,3,3,0,0,0,0],
    [0,0,2,3,2,2,3,3,3,4,3,3,3,0,0,0],
    [0,0,0,2,3,3,3,3,4,4,4,4,0,0,0,0],
    [0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0],
    [0,0,0,1,1,5,1,1,5,1,1,0,0,0,0,0],
    [0,0,1,1,1,5,1,1,5,1,1,1,0,0,0,0],
    [0,1,1,1,1,5,5,5,5,1,1,1,1,0,0,0],
    [0,3,3,1,5,3,5,5,3,5,1,3,3,0,0,0],
    [0,3,3,3,5,5,5,5,5,5,3,3,3,0,0,0],
    [0,3,3,5,5,5,5,5,5,5,5,3,3,0,0,0],
    [0,0,0,5,5,5,0,0,5,5,5,0,0,0,0,0],
    [0,0,2,2,2,0,0,0,0,2,2,2,0,0,0,0],
    [0,2,2,2,2,0,0,0,0,2,2,2,2,0,0,0]
  ]
]

// lets define some palettes
// shout out to coolors.co - these palettes were generated with it!

const palettes = [
  [
    //palette0 will be blank for ease of use
  ],
  [
    '#087E8B',
    '#FF5A5F',
    '#3C3C3C',
    '#F5F5F5',
    '#C1839F'
  ],
  [
    '#424243',
    '#244F26',
    '#256D1B',
    '#149911',
    '#1EFC1E'
  ],
  [
    '#1F2041',
    '#4B3F72',
    '#FFC857',
    '#119DA4',
    '#19647E'
  ],
  [
    '#B7AD99',
    '#FF4365',
    '#030301',
    '#00D9C0',
    '#FFFFF3'
  ],
  [
    '#F7F052',
    '#F28123',
    '#D34E24',
    '#563F1B',
    '#38726C'
  ]
]

// our screen object
let screen = {
  width: 640,
  height: 480,
  mode: 1, //use 1 for indirect color, direct color will be implemented later

  switchMode() {
    if(mode==1){ mode=0 }
    if(mode==0){ mode=1 }
  },
  drawBitImage(image){
    let addMe = ''

    for(let row=0; row < image.length; row++){
      addMe += image[row] + '<br>'
      console.log(image[row])
    }
    bitImage.innerHTML = '<pre>' + addMe + '</pre>'
  },

  draw(image, colorPalette){
      // reset canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      for(let row=0; row < image.length; row++) {
        for(let col=0; col < image[row].length; col++) {

          for(color in colorPalette){
            if (image[row][col] == color){
              // set the color to representative value in the image
              context.fillStyle = colorPalette[image[row][col]]
              // draw the image
              context.fillRect(
                col * resolution,
                row * resolution,
                resolution,
                resolution
              )

            }
          }
          // console.log(`(${row},${col}) is ${image[row][col]}`)
        }
      }
  }

}

// to do: rewrite this as one function
paletteSelect.addEventListener("change", function () {
screen.draw(
  images[imageSelect.options[imageSelect.selectedIndex].value],
  palettes[paletteSelect.options[paletteSelect.selectedIndex].value]
)
})

imageSelect.addEventListener("change", function () {
screen.draw(
  images[imageSelect.options[imageSelect.selectedIndex].value],
  palettes[paletteSelect.options[paletteSelect.selectedIndex].value]
)
screen.drawBitImage(images[imageSelect.options[imageSelect.selectedIndex].value])
})

screen.draw(images[1], palettes[1])
screen.drawBitImage(images[1])
