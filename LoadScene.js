class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadScene",
    });
  }

  preload() {
    //this.load.scenePlugin('WebpackLoader',WebpackLoader,'loader','loader')
    this.load.atlas("load", "assets/StartSceneAssets/loadAnims/loadAnim.png", "assets/StartSceneAssets/loadAnims/loadAnim.json");
    this.load.atlas("load2", "assets/StartSceneAssets/loadAnims/loadAnim2.png", "assets/StartSceneAssets/loadAnims/loadAnim2.json");
  }

  create() {
    //StartScene.load.start()

    this.loadAnim = this.add.sprite(config.width / 2, config.height / 2, "load").setScale(0.25);
    this.loadAnim2 = this.add
      .sprite(config.width / 2, config.height / 2, "load2")
      .setVisible(false)
      .setScale(0.5);

    this.anims.create({
      key: "loading",
      frames: this.anims.generateFrameNames("load", {
        start: 0,
        end: 8,
        zeroPad: 0,
        prefix: "LOAD",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "loading2",
      frames: this.anims.generateFrameNames("load2", {
        start: 9,
        end: 40,
        zeroPad: 0,
        prefix: "LOAD",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.startSceneAssetsLoad(); //no change
    //to be loaded while user is going through the tutorial
    this.endSceneAssetsLoad(); //to be loaded anywhere during the gamescene
    this.audioLoad();

    this.load.start();

    this.load.on(
      "progress",
      function (value) {
        this.loadAnim.play("loading");
      },
      this
    );

    this.load.on(
      "complete",
      function () {
        //this.load.on("progress",function (value) {},this);
        //console.log("complete");
        this.loadAnim.destroy();
        this.loadAnim2.setVisible(true).play("loading2");
        this.loadAnim2.on(
          Phaser.Animations.Events.ANIMATION_COMPLETE,
          function () {
            this.scene.stop("LoadScene");
            this.scene.start("StartScene");
          },
          this
        );
      },
      this
    );
  }

  audioLoad() {
    //audio loaded here
    this.load.audio("bgMusic", "assets/Audio/bgmusic.mp3");

    this.load.audio("correctMusic", "assets/Audio/allcorrectanswerselected.mp3");
    this.load.audio("wrongMusic", "assets/Audio/incorrectanswer.mp3");
    this.load.audio("semiCorrectMusic", "assets/Audio/correctselection.mp3");
    this.load.audio("cardstobar", "assets/Audio/cardsgotorewardbar.wav");
    this.load.audio("logoMusic", "assets/Audio/Cuemath Logo Reveal.mp3");

    this.load.audio("cardHoverMusic", "assets/Audio/card hover.wav");
    this.load.audio("slideIn", "assets/Audio/OptionCardsSlideIN.mp3");
    this.load.audio("cardFlipMusic", "assets/Audio/cardsflippingbacktonumber.mp3");

    this.load.audio("basketOpen", "assets/Audio/coinReveal.mp3");
  }

  endSceneAssetsLoad() {
    //this.load.multiatlas("DoorAnim", "assets/EndSceneAssets/Door animation/DoorAnim.json", "assets/EndSceneAssets/Door animation");
    //this.load.video('logo','assets/EndSceneAssets/LOGO.mp4');
  }

  startSceneAssetsLoad() {
    this.load.image("play_button", "assets/StartSceneAssets/play_button.png");
    this.load.image("play_button_on", "assets/StartSceneAssets/play_button_on.png");
    this.load.image("Background", "assets/StartSceneAssets/Background.png");
    this.load.multiatlas("startSceneAnim", "assets/StartSceneAssets/Start Scene Anim/startSceneAnim.json", "assets/StartSceneAssets/Start Scene Anim/");
    this.load.image("cycle", "assets/StartSceneAssets/cycle.png");
    this.load.image("cloud1", "assets/StartSceneAssets/cloud1.png");
    this.load.image("cloud2", "assets/StartSceneAssets/cloud2.png");
    this.load.image("cloud3", "assets/StartSceneAssets/cloud3.png");

    this.load.image("bg", "assets/GameSceneAssets/bg.png");
    this.load.image("Name", "assets/StartSceneAssets/Name.png");
    this.load.image("bar", "assets/GameSceneAssets/bar.png");
    this.load.image("Rect_1", "assets/GameSceneAssets/Rect_1.png");
    this.load.image("Rect_2", "assets/GameSceneAssets/Rect_2.png");
    this.load.image("Rect_3", "assets/GameSceneAssets/Rect_3.png");

    this.load.image("bar_on", "assets/GameSceneAssets/bar_on1.png");
    this.load.image("texth", "assets/GameSceneAssets/texth.png");
    this.load.image("text1", "assets/GameSceneAssets/text1.png");
    this.load.image("text2", "assets/GameSceneAssets/text2.png");
    this.load.image("text3", "assets/GameSceneAssets/text3.png");
    this.load.image("text4", "assets/GameSceneAssets/text4.png");
    this.load.image("text5", "assets/GameSceneAssets/text5.png");

    this.load.image("mainCard6", "assets/GameSceneAssets/MainCard6.png");

    this.load.image("mainCard7", "assets/GameSceneAssets/MainCard7.png");
    this.load.image("mainCard8", "assets/GameSceneAssets/MainCard8.png");
    this.load.image("mainCard9", "assets/GameSceneAssets/MainCard9.png");
    this.load.image("mainCard10", "assets/GameSceneAssets/MainCard10.png");

    this.load.image("mainCard6_on", "assets/GameSceneAssets/MainCard6_on.png");

    this.load.image("mainCard7_on", "assets/GameSceneAssets/MainCard7_on.png");
    this.load.image("mainCard8_on", "assets/GameSceneAssets/MainCard8_on.png");
    this.load.image("mainCard9_on", "assets/GameSceneAssets/MainCard9_on.png");
    this.load.image("mainCard10_on", "assets/GameSceneAssets/MainCard10_on.png");

    this.load.image("check", "assets/GameSceneAssets/check.png");
    this.load.image("check_on", "assets/GameSceneAssets/check_on.png");

    this.load.image("C_1_1", "assets/GameSceneAssets/C_1_1.png");
    this.load.image("C_1_2", "assets/GameSceneAssets/C_1_2.png");
    this.load.image("C_1_3", "assets/GameSceneAssets/C_1_3.png");
    this.load.image("C_1_4", "assets/GameSceneAssets/C_1_4.png");

    this.load.image("D_1_1", "assets/GameSceneAssets/D_1_1.png");
    this.load.image("D_1_2", "assets/GameSceneAssets/D_1_2.png");
    this.load.image("D_1_3", "assets/GameSceneAssets/D_1_3.png");
    this.load.image("D_1_4", "assets/GameSceneAssets/D_1_4.png");

    this.load.image("C_2_1", "assets/GameSceneAssets/C_2_1.png");
    this.load.image("C_2_2", "assets/GameSceneAssets/C_2_2.png");
    this.load.image("C_2_3", "assets/GameSceneAssets/C_2_3.png");
    this.load.image("C_2_4", "assets/GameSceneAssets/C_2_4.png");

    this.load.image("D_2_1", "assets/GameSceneAssets/D_2_1.png");
    this.load.image("D_2_2", "assets/GameSceneAssets/D_2_2.png");
    this.load.image("D_2_3", "assets/GameSceneAssets/D_2_3.png");
    this.load.image("D_2_4", "assets/GameSceneAssets/D_2_4.png");

    this.load.image("C_3_1", "assets/GameSceneAssets/C_3_1.png");
    this.load.image("C_3_2", "assets/GameSceneAssets/C_3_2.png");
    this.load.image("C_3_3", "assets/GameSceneAssets/C_3_3.png");
    this.load.image("C_3_4", "assets/GameSceneAssets/C_3_4.png");

    this.load.image("D_3_1", "assets/GameSceneAssets/D_3_1.png");
    this.load.image("D_3_2", "assets/GameSceneAssets/D_3_2.png");
    this.load.image("D_3_3", "assets/GameSceneAssets/D_3_3.png");
    this.load.image("D_3_4", "assets/GameSceneAssets/D_3_4.png");

    this.load.image("C_4_1", "assets/GameSceneAssets/C_4_1.png");
    this.load.image("C_4_2", "assets/GameSceneAssets/C_4_2.png");
    this.load.image("C_4_3", "assets/GameSceneAssets/C_4_3.png");
    this.load.image("C_4_4", "assets/GameSceneAssets/C_4_4.png");

    this.load.image("D_4_1", "assets/GameSceneAssets/D_4_1.png");
    this.load.image("D_4_2", "assets/GameSceneAssets/D_4_2.png");
    this.load.image("D_4_3", "assets/GameSceneAssets/D_4_3.png");
    this.load.image("D_4_4", "assets/GameSceneAssets/D_4_4.png");

    this.load.image("C_5_1", "assets/GameSceneAssets/C_5_1.png");
    this.load.image("C_5_2", "assets/GameSceneAssets/C_5_2.png");
    this.load.image("C_5_3", "assets/GameSceneAssets/C_5_3.png");
    this.load.image("C_5_4", "assets/GameSceneAssets/C_5_4.png");

    this.load.image("D_5_1", "assets/GameSceneAssets/D_5_1.png");
    this.load.image("D_5_2", "assets/GameSceneAssets/D_5_2.png");
    this.load.image("D_5_3", "assets/GameSceneAssets/D_5_3.png");
    this.load.image("D_5_4", "assets/GameSceneAssets/D_5_4.png");
    this.load.atlas("sidebarAnim", "assets/GameSceneAssets/sidebarAnim.png", "assets/GameSceneAssets/sidebarAnim.json");

    this.load.atlas("tickAnim", "assets/GameSceneAssets/tickAnim.png", "assets/GameSceneAssets/tickAnim.json");
    this.load.atlas("crossAnim", "assets/GameSceneAssets/crossAnim.png", "assets/GameSceneAssets/crossAnim.json");

    this.load.multiatlas("confettiAnim", "assets/GameSceneAssets/confetti/confettiAnim.json", "assets/GameSceneAssets/confetti/");
  }

  update() {
    //console.log(this.load.inflight.size);
  }
}
