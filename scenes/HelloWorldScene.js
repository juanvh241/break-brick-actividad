// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "public/assets/space3.png");
    this.load.image("logo", "public/assets/phaser3-logo.png");
    this.load.image("red", "public/assets/particles/red.png");
  }

create() {
  this.add.image(400, 300, "sky");

  // --- Pala ---
  this.pala = this.add.rectangle(400, 500, 200, 30, 0x00ff00);
  this.physics.add.existing(this.pala);
  this.pala.body.setCollideWorldBounds(true);
  this.pala.body.setImmovable(true);
  this.pala.body.allowGravity = false;
  this.cursors = this.input.keyboard.createCursorKeys();

  // --- Grupo de bloques ---
  this.blocks = this.physics.add.staticGroup();

  for (let i = 0; i < 10; i++) {
    // Creamos cada bloque como un GameObject con física estática
    const block = this.add.rectangle(80 + i * 70, 100, 60, 20, 0x0000ff);
    this.physics.add.existing(block, true); // true = cuerpo estático
    this.blocks.add(block);
  }

  // --- Pelota ---
  this.ball = this.physics.add.image(400, 300, "red");
  this.ball.setBounce(1);
  this.ball.setCollideWorldBounds(true);
  this.ball.setVelocity(200, 200);
  this.ball.setScale(0.5);

  // --- Colisiones ---
  this.physics.add.collider(this.ball, this.pala);
  this.physics.add.collider(this.ball, this.blocks, (ball, block) => {
    block.destroy(); // destruir bloque al golpearlo
  });
}

update() {
  this.pala.body.setVelocityX(0);

  if (this.cursors.left.isDown) {
    this.pala.body.setVelocityX(-300);
  } else if (this.cursors.right.isDown) {
    this.pala.body.setVelocityX(300);
  }
}

}