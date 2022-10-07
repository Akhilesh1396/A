var bgMusic = null;
class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: "StartScene",
    });
  }

  preload() {}

  create() {
    bgMusic = this.sound.add("bgMusic");

    this.anims.create({
      key: "start",
      frames: this.anims.generateFrameNames("startSceneAnim", {
        start: 0,
        end: 89,
        prefix: "startSceneAnim",
        suffix: ".png",
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.bg = this.add.image(0, 0, "Background").setOrigin(0);
    this.bg = this.add.image(0, 0, "bg").setOrigin(0).setAlpha(0).setDepth(5);

    this.Name = this.add.image(440, 181, "Name").setOrigin(0, 0);

    //this.cloud1 = this.add.image(142,16,'cloud1').setOrigin(0)
    //this.cloud2 = this.add.image(753,22,'cloud2').setOrigin(0)
    //this.cloud3 = this.add.image(950,18,'cloud3').setOrigin(0)

    this.cloud1 = this.add.image(-200, 16, "cloud1").setOrigin(0);

    this.cloud2 = this.add.image(1300, 22, "cloud2").setOrigin(0);
    this.cloud3 = this.add.image(1300, 18, "cloud3").setOrigin(0);

    this.tweens.add({
      targets: this.cloud1,
      x: 1500,
      duration: 50000,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.cloud2,
      x: -100,
      duration: 50000,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.cloud3,
      x: -100,
      duration: 50000,
      delay: 8000,
      yoyo: true,
      repeat: -1,
    });

    this.cycle = this.add.image(0, 0, "cycle").setOrigin(0).setDepth(2);

    this.start = this.add.sprite(0, 0, "startSceneCharacterAnim").setOrigin(0).setDepth(3).play("start");

    this.playButton = this.add.image(516, 570, "play_button").setInteractive({ cursor: "pointer" }).setOrigin(0, 0);

    this.playButton.on(
      "pointerover",
      function (pointer) {
        this.playButton.setTexture("play_button_on");
        //this.scene.pause("GameLoadScene");
      },
      this
    );

    this.playButton.on(
      "pointerout",
      function (pointer) {
        this.playButton.setTexture("play_button");
        //this.scene.resume("GameLoadScene");
      },
      this
    );

    this.playButton.on(
      "pointerdown",
      function (pointer) {
        bgMusic.setVolume(0.03).setLoop(true).play();
        this.scale.startFullscreen();

        this.Name.setScale(0);

        //        config.audio.bgAudio.setLoop(true).setVolume(0.1).play();

        // this.gamename.setScale(0);
        this.playButton.setScale(0);

        this.tweens.add({
          targets: this.bg,
          alpha: 1,
          ease: "Power2",
          duration: 500,
          repeat: 0,
        });

        this.time.delayedCall(
          500,
          () => {
            this.scene.start("GameScene");

            //this.scene.start("FinalScene");

            this.scene.stop("StartScene");

            //this.scene.start("EndScene");
          },
          [],
          this
        );
      },
      this
    );
  }

  startloads() {}

  update() {}
}
