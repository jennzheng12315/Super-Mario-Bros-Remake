// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, background, width, height,
 *    colorMode, HSB
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,
 *    keyIsPressed, keyCode, loadImage, image, line, 
 *    fill, rect
 */

let g1, mario, l1, direction, jumpTimer;

function setup() {
  // Code here runs only once
  createCanvas(400, 300);

  g1 = new Goomba();
  mario = new Mario();
  direction = null;
  jumpTimer = 0;
  // l1 = new Level1();
}

function draw() {
  // Code here runs continuously
  background(220);
  line(0, 250, 400, 250); //ground line

  g1.move();
  g1.display();

  mario.updateGravity();
  mario.move();
  mario.display();

  // l1.display()
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direction = "E";
  } else if (keyCode === RIGHT_ARROW) {
    direction = "W";
  }
  else if (keyCode === UP_ARROW) {
    direction = "N";
  }
  else {
    direction = null;
  }
  
}

class Mario {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.speed = 1;
    this.gravity = 0.6;
    this.jump = -15;
    this.velocityY = 0;
    this.image = loadImage("https://i.imgur.com/4NbQZAp.png");
  }

  move() {
    if (keyIsPressed) {
      if (direction == "E") {
        this.x -= this.speed;
      } else if (direction == "W") {
        this.x += this.speed;
      }
      if (direction == "N") {
        if (jumpTimer <= 5){
        this.y += this.jump;
        jumpTimer++;
        } 
        
      }
    }
  }

  display() {
    image(this.image, this.x, this.y, 50, 50);
  }

  updateGravity() {
    if (this.y < 200) {
      this.velocityY += this.gravity;
      this.velocityY *= 0.9;
      this.y += this.velocityY;
    }
    if (this.y < 15) {
      this.y = 15;
    }
    
    if (this.y >= 200){
      jumpTimer = 0;
    }
  }
}

// class Monster {
//   constructor(x, y, speed) {
//     this.x = x
//     this.y = y
//     this.speed = speed
//   }
//   move() {}
//   display() {}
// }

class Goomba {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.speed = 1;
    this.image = loadImage("https://i.imgur.com/0L0a1xm.png");
    // this.image = loadImage("https://i.imgur.com/4NbQZAp.png")
  }
  move() {
    this.x += this.speed;
    if (this.x > width - 50){
      this.speed *= -1;
    }
    if (this.x < 0){
      this.speed *= -1;
    }
  }
  display() {
    image(this.image, this.x, this.y, 50, 50);
  }
}

class Level1 {
  constructor() {
    this.map = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0][(0, 0, 0, 2, 2, 2)][(0, 0, 0, 0, 0, 0)][
        (0, 2, 0, 0, 0, 0)
      ][(0, 0, 0, 0, 0, 0)][(0, 0, 0, 0, 0, 0)][(1, 1, 1, 1, 1, 1)]
    ];
    this.blockLength = 10;
  }
  display() {
    let tempMap = this.map;
    for (let i = 0; i < tempMap.length; i++) {
      for (let j = 0; j < tempMap[i].length; j++) {
        // if (tempMap[i][j]==0) {
        //   fill(60, 20, 20);
        rect(
          i * this.blockLength,
          j * this.blockLength,
          this.blockLength,
          this.blockLength
        );
        // }
      }
    }
  }
}
