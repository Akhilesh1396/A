const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  zoom: 1,
  fps: { target: 60 },
  backgroundColor: "fff",
  physics: {
    default: "arcade",
  },
  scene: [LoadScene, StartScene, GameScene, EndScene],
  //scene: [GameScene, EndScene,LoadScene, StartScene],
  audio: {
    disableWebAudio: true,
  },
};

const game = new Phaser.Game(config);
