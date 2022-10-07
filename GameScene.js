var selected = [];
var qnum = 1;
class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  preload() {}

  create() {
    this.correctMusic = this.sound.add("correctMusic");

    this.semiCorrectMusic = this.sound.add("semiCorrectMusic");
    this.wrongMusic = this.sound.add("wrongMusic");

    this.cardHoverMusic = this.sound.add("cardHoverMusic");
    this.slideIn = this.sound.add("slideIn");
    this.cardFlipMusic = this.sound.add("cardFlipMusic");
    this.cardstobar = this.sound.add("cardstobar");
    this.logoMusic = this.sound.add("logoMusic");

    this.basketOpen = this.sound.add("basketOpen").setVolume(0.1);

    //this.cardstobar.setVolume(0.1).setLoop(true).play()

    this.stopvid = false;

    this.load.video("logo", "assets/GameSceneAssets/LOGO.mp4");
    this.load.start();

    this.bg = this.add.image(0, 0, "bg").setOrigin(0);
    this.text = this.add.image(151, 123, "text1").setOrigin(0).setAlpha(0);
    //this.bar= this.add.image(20,25,'bar').setOrigin(0);

    this.anims.create({
      key: "bar",
      frames: this.anims.generateFrameNames("sidebarAnim", {
        start: 0,
        end: 59,
        prefix: "sidebar",
        suffix: ".png",
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "tick",
      frames: this.anims.generateFrameNames("tickAnim", {
        start: 0,
        end: 19,
        prefix: "tick",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "cross",
      frames: this.anims.generateFrameNames("crossAnim", {
        start: 0,
        end: 6,
        prefix: "cross",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: "confetti",
      frames: this.anims.generateFrameNames("confettiAnim", {
        start: 0,
        end: 122,
        prefix: "CONFETTI0",
        suffix: ".png",
      }),
      frameRate: 30,
      repeat: 0,
    });

    this.confetti = this.add.sprite(640, 350, "confettiAnim").setDepth(3);

    this.gap = 215;

    this.bar = this.add.sprite(2.4, 2, "sidebarAnim").setOrigin(0, 0).play("bar").setScale(0.99, 1).setDepth(3);

    this.tick1 = this.add.sprite(295, 550, "tickAnim").setOrigin(0, 0).setScale(0.2).setDepth(2).setVisible(false); //.play('tick')
    this.tick2 = this.add
      .sprite(295 + this.gap, 550, "tickAnim")
      .setOrigin(0, 0)
      .setScale(0.2)
      .setDepth(2)
      .setVisible(false); //.play('tick').setScale(0.2).setDepth(2)
    this.tick3 = this.add
      .sprite(295 + 2 * this.gap, 550, "tickAnim")
      .setOrigin(0, 0)
      .setScale(0.2)
      .setDepth(2)
      .setVisible(false); //.play('tick').setScale(0.2).setDepth(2)
    this.tick4 = this.add
      .sprite(295 + 3 * this.gap, 550, "tickAnim")
      .setOrigin(0, 0)
      .setScale(0.2)
      .setDepth(2)
      .setVisible(false); //.play('tick').setScale(0.2).setDepth(2)

    this.cross1 = this.add.sprite(280, 540, "crossAnim").setOrigin(0, 0).setScale(0.8).setDepth(2).setVisible(false); //.play('cross')

    this.cross2 = this.add
      .sprite(280 + this.gap, 540, "crossAnim")
      .setOrigin(0, 0)
      .setScale(0.8)
      .setDepth(2)
      .setVisible(false);
    this.cross3 = this.add
      .sprite(280 + 2 * this.gap, 540, "crossAnim")
      .setOrigin(0, 0)
      .setScale(0.8)
      .setDepth(2)
      .setVisible(false);
    this.cross4 = this.add
      .sprite(280 + 3 * this.gap, 540, "crossAnim")
      .setOrigin(0, 0)
      .setScale(0.8)
      .setDepth(2)
      .setVisible(false);

    this.bar_on = this.add.image(20, 25, "bar_on").setOrigin(0).setDepth(3); //.setCrop(0,0,76,59);

    this.cut = this.add.sprite(0, 238);
    qnum = 1;
    this.repeat();
  }

  repeat() {
    this.mainCard = this.add.image(640, -140, "mainCard" + (5 + qnum));

    this.rect1 = this.add.image(317, 475, "Rect_1").setAlpha(0);
    this.rect2 = this.add.image(317 + this.gap, 475, "Rect_1").setAlpha(0);
    this.rect3 = this.add.image(317 + 2 * this.gap, 475, "Rect_1").setAlpha(0);
    this.rect4 = this.add.image(317 + 3 * this.gap, 475, "Rect_1").setAlpha(0);

    this.cardy = 500;

    this.card1 = this.add.image(317, 475 + this.cardy, "C_" + qnum + "_1").setInteractive({ cursor: "pointer" });
    this.card2 = this.add.image(317 + this.gap, 475 + this.cardy, "C_" + qnum + "_2").setInteractive({ cursor: "pointer" });
    this.card3 = this.add.image(317 + 2 * +this.gap, 475 + this.cardy, "C_" + qnum + "_3").setInteractive({ cursor: "pointer" });
    this.card4 = this.add.image(317 + 3 * +this.gap, 475 + this.cardy, "C_" + qnum + "_4").setInteractive({ cursor: "pointer" });

    this.card1.disableInteractive();
    this.card2.disableInteractive();
    this.card3.disableInteractive();
    this.card4.disableInteractive();

    this.cardProp(this.card1, this.rect1);
    this.cardProp(this.card2, this.rect2);
    this.cardProp(this.card3, this.rect3);
    this.cardProp(this.card4, this.rect4);

    this.setTvalues();

    this.S1 = false;
    this.S2 = false;
    this.S3 = false;
    this.S4 = false;

    this.check = this.add.image(640, 603, "check").setOrigin(0.5, 0).setInteractive({ cursor: "pointer" }).setAlpha(0);

    this.check.on(
      "pointerover",
      function (pointer) {
        this.check.setTexture("check_on");
        //this.scene.pause("GameLoadScene");
      },
      this
    );

    this.check.on(
      "pointerout",
      function (pointer) {
        this.check.setTexture("check");
        //this.scene.resume("GameLoadScene");
      },
      this
    );

    this.check.on("pointerdown", () => {
      this.check.setAlpha(0);

      this.text.setAlpha(0);
      this.card1.disableInteractive();

      this.card2.disableInteractive();
      this.card3.disableInteractive();
      this.card4.disableInteractive();

      //(selected ==1&&selected ==2&&selected ==3)
      if (this.T1 == this.S1 && this.T2 == this.S2 && this.T3 == this.S3 && this.T4 == this.S4) {
        this.correctMusic.setVolume(0.1).setLoop(false).play();

        this.confetti.play("confetti");

        if (this.T1) {
          this.rect1.setTexture("Rect_3");
        }

        if (this.T2) {
          this.rect2.setTexture("Rect_3");
        }
        if (this.T3) {
          this.rect3.setTexture("Rect_3");
        }
        if (this.T4) {
          this.rect4.setTexture("Rect_3");
        }

        this.timegap1 = 4000;

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 1.1,
          duration: 100,
          delay: this.timegap1,
          repeat: 0,
        });

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 0,
          duration: 200,
          delay: this.timegap1 + 100,
          repeat: 0,

          onComplete: () => {
            this.mainCard.setTexture("mainCard" + (5 + qnum) + "_on");

            this.card1.setTexture("D_" + qnum + "_1");
            this.card2.setTexture("D_" + qnum + "_2");
            this.card3.setTexture("D_" + qnum + "_3");
            this.card4.setTexture("D_" + qnum + "_4");
          },
        });

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 1.1,
          duration: 200,
          delay: this.timegap1 + 300,
          repeat: 0,
        });

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 1,
          duration: 100,
          delay: this.timegap1 + 500,
          repeat: 0,

          onComplete: () => {
            if (this.T1) {
              this.tick1.play("tick").setVisible(true);
            }

            if (this.T2) {
              this.tick2.play("tick").setVisible(true);
            }
            if (this.T3) {
              this.tick3.play("tick").setVisible(true);
            }
            if (this.T4) {
              this.tick4.play("tick").setVisible(true);
            }
          },
        });
        this.timer = 8000;

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 1.1,
          duration: 100,
          delay: this.timer + 300,
          repeat: 0,

          onComplete: () => {
            this.tick1.setVisible(false);
            this.tick2.setVisible(false);
            this.tick3.setVisible(false);
            this.tick4.setVisible(false);

            this.cross1.setVisible(false);
            this.cross2.setVisible(false);
            this.cross3.setVisible(false);
            this.cross4.setVisible(false);

            this.cardFlipMusic.setVolume(0.1).setLoop(false).play();
          },
        });

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 0,
          duration: 200,
          delay: this.timer + 400,
          repeat: 0,
          onComplete: () => {
            this.mainCard.setTexture("mainCard" + (5 + qnum));

            if (this.T1) {
              this.card1.setTexture("mainCard" + (5 + qnum));
            } else {
              if (qnum == 3) {
                this.card1.setTexture("mainCard" + 9);
              }
            }

            if (this.T2) {
              this.card2.setTexture("mainCard" + (5 + qnum));
            }else {
              if (qnum == 1) {
                this.card2.setTexture("mainCard" + 9);
              }
            }
            if (this.T3) {
              this.card3.setTexture("mainCard" + (5 + qnum));
            }else {
              if (qnum == 2) {
                this.card3.setTexture("mainCard" + 8);
              }
            }

            if (this.T4) {
              this.card4.setTexture("mainCard" + (5 + qnum));
            } else {
               if (qnum == 4) {
                this.card4.setTexture("mainCard" + 10);
              }
            }
          },
        });

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 1.1,
          duration: 200,
          delay: this.timer + 600,
          repeat: 0,
        });

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4, this.mainCard],
          scaleX: 1,
          duration: 100,
          delay: this.timer + 800,
          repeat: 0,
        });

        this.timegap = 0;
        this.cutValue = 35.8;

        this.time.delayedCall(
          this.timer + 1500 + this.timegap,
          () => {
            this.cardstobar.setVolume(0.1).setLoop(false).play();
            //this.bicycleMusic.setVolume(0.1).setLoop(false).play()
          },
          [],
          this
        );

        if (this.T1) {
          this.tweens.add({
            targets: [this.card1, this.rect1],
            scale: 0.1,
            x: 60,
            y: 250,
            ease: "Power2",
            duration: 500,
            delay: this.timer + 2000 + this.timegap,
            repeat: 0,

            onComplete: () => {
              this.card1.setScale(0);
              this.rect1.setScale(0);
            },
          });
          this.timegap += 100;
        }

        if (this.T2) {
          this.tweens.add({
            targets: [this.card2, this.rect2],
            scale: 0.1,
            x: 60,
            y: 250,
            ease: "Power2",
            duration: 500,
            delay: this.timer + 2000 + this.timegap,
            repeat: 0,

            onComplete: () => {
              this.card2.setScale(0);
              this.rect2.setScale(0);
            },
          });
          this.timegap += 100;
        }

        if (this.T3) {
          this.tweens.add({
            targets: [this.card3, this.rect3],
            scale: 0.1,
            x: 60,
            y: 250,
            ease: "Power2",
            duration: 500,
            delay: this.timer + 2000 + this.timegap,
            repeat: 0,

            onComplete: () => {
              this.card3.setScale(0);
              this.rect3.setScale(0);
            },
          });
          this.timegap += 100;
        }

        if (this.T4) {
          this.tweens.add({
            targets: [this.card4, this.rect4],
            scale: 0.1,
            x: 60,
            y: 250,
            ease: "Power2",
            duration: 500,
            delay: this.timer + 2000 + this.timegap,
            repeat: 0,

            onComplete: () => {
              this.card4.setScale(0);
              this.rect4.setScale(0);
            },
          });
          this.timegap += 100;
        }

        this.tweens.add({
          targets: this.cut,
          y: this.cut.y - this.cutValue,
          duration: 400,
          delay: this.timer + 1700 + this.timegap,
          repeat: 0,
        });

        this.tweens.add({
          targets: [this.card1, this.rect1, this.card2, this.rect2, this.card3, this.rect3, this.card4, this.rect4],
          y: 1000,
          ease: "Power2",
          duration: 1000,
          delay: this.timer + 2400 + this.timegap,
          repeat: 0,
        });

        this.tweens.add({
          targets: this.mainCard,
          y: -200,
          ease: "Power2",
          duration: 1000,
          delay: this.timer + 2400 + this.timegap,
          repeat: 0,
          onComplete: () => {
            qnum++;

            this.text.setTexture("text" + qnum);
            selected = [];
            if (qnum <= 5) {
              this.repeat();
            } else {
              this.vid = this.add.video(640, 360, "logo").setAlpha(0).setDepth(15);

              this.tweens.add({
                targets: this.vid,
                alpha: 1,
                ease: "Power2",
                duration: 1000,
              });

              this.time.delayedCall(
                1000,
                () => {
                  this.basketOpen.setLoop(false).play();
                  this.vid.play(true).setLoop(false);

                  //this.bicycleMusic.setVolume(0.1).setLoop(false).play()
                },
                [],
                this
              );

              this.time.delayedCall(
                10500,
                () => {
                  bgMusic.stop();
                  this.logoMusic.setVolume(0.1).setLoop(false).play();
                },
                [],
                this
              );

              this.time.delayedCall(
                16000,
                () => {
                  this.scale.stopFullscreen();
                  this.stopvid = true;

                  //this.scene.start("EndScene");
                },
                [],
                this
              );
            }
          },
        });
      } 
      
      else if (this.S2 && qnum == 1) {
        this.wrongMusic.setVolume(0.1).setLoop(false).play();

        this.cardFlip(this.mainCard, this.recta);
        this.rect2.setTexture("Rect_2");
        this.cardFlip(this.card2, this.rect2);

        if (this.S4) {
          this.rect4.setTexture("Rect_3");
          this.cardFlip(this.card4, this.rect4);
        }
        if (this.S1) {
          this.rect1.setTexture("Rect_3");
          this.cardFlip(this.card1, this.rect1);
        }
        if (this.S3) {
          this.rect3.setTexture("Rect_3");
          this.cardFlip(this.card3, this.rect3);
        }
      }

      else if (this.S3 && qnum == 2) {
        this.wrongMusic.setVolume(0.1).setLoop(false).play();

        this.cardFlip(this.mainCard, this.recta);
        this.rect3.setTexture("Rect_2");
        this.cardFlip(this.card3, this.rect3);

        if (this.S4) {
          this.rect4.setTexture("Rect_3");
          this.cardFlip(this.card4, this.rect4);
        }
        if (this.S2) {
          this.rect2.setTexture("Rect_3");
          this.cardFlip(this.card2, this.rect2);
        }
        if (this.S1) {
          this.rect1.setTexture("Rect_3");
          this.cardFlip(this.card1, this.rect1);
        }
      }
      
      
      else if (this.S4 && qnum == 4) {
        this.wrongMusic.setVolume(0.1).setLoop(false).play();

        this.cardFlip(this.mainCard, this.recta);
        this.rect4.setTexture("Rect_2");
        this.cardFlip(this.card4, this.rect4);
        if (this.S1) {
          this.rect1.setTexture("Rect_3");
          this.cardFlip(this.card1, this.rect1);
        }
        if (this.S2) {
          this.rect2.setTexture("Rect_3");
          this.cardFlip(this.card2, this.rect2);
        }
        if (this.S3) {
          this.rect3.setTexture("Rect_3");
          this.cardFlip(this.card3, this.rect3);
        }
      } else if (this.S1 && qnum == 3) {
        this.wrongMusic.setVolume(0.1).setLoop(false).play();

        this.cardFlip(this.mainCard, this.recta);
        this.rect1.setTexture("Rect_2");
        this.cardFlip(this.card1, this.rect1);

        if (this.S4) {
          this.rect4.setTexture("Rect_3");
          this.cardFlip(this.card4, this.rect4);
        }
        if (this.S2) {
          this.rect2.setTexture("Rect_3");
          this.cardFlip(this.card2, this.rect2);
        }
        if (this.S3) {
          this.rect3.setTexture("Rect_3");
          this.cardFlip(this.card3, this.rect3);
        }
      } else if (this.S1 || this.S2 || this.S3 || this.S4) {
        this.semiCorrectMusic.setVolume(0.1).setLoop(false).play();

        this.text.setTexture("texth");

        this.tweens.add({
          targets: this.text,
          alpha: 1,
          ease: "Power2",
          duration: 400,
          delay: 1000,
          repeat: 0,
        });

        if (this.S1) {
          this.rect1.setTexture("Rect_3");
          this.cardFlip(this.card1, this.rect1);
        }

        if (this.S4) {
          this.rect4.setTexture("Rect_3");
          this.cardFlip(this.card4, this.rect4);
        }
        if (this.S2) {
          this.rect2.setTexture("Rect_3");
          this.cardFlip(this.card2, this.rect2);
        }
        if (this.S3) {
          this.rect3.setTexture("Rect_3");
          this.cardFlip(this.card3, this.rect3);
        }
      } else {
        this.card1.setInteractive();

        this.card2.setInteractive();
        this.card3.setInteractive();
        this.card4.setInteractive();

        this.tweens.add({
          targets: [this.text, this.check],
          alpha: 1,
          ease: "Power2",
          duration: 400,
          repeat: 0,
        });
      }
    });

    this.tweens.add({
      targets: this.card1,
      y: 475,
      ease: "Power2",
      duration: 1000,
      delay: 2000,
      repeat: 0,
      onStart: () => {
        this.slideIn.setVolume(0.1).setLoop(false).play();
      },
    });

    this.tweens.add({
      targets: this.card2,
      y: 475,
      ease: "Power2",
      duration: 1000,
      delay: 2200,
      repeat: 0,
    });

    this.tweens.add({
      targets: this.card3,
      y: 475,
      ease: "Power2",
      duration: 1000,
      delay: 2400,
      repeat: 0,
    });

    this.tweens.add({
      targets: this.card4,
      y: 475,
      ease: "Power2",
      duration: 1000,
      delay: 2600,
      repeat: 0,
      onComplete: () => {
        this.card1.setInteractive();

        this.card2.setInteractive();
        this.card3.setInteractive();
        this.card4.setInteractive();
      },
    });

    this.tweens.add({
      targets: this.text,
      alpha: 1,
      ease: "Power2",
      duration: 400,
      delay: 4000,
      repeat: 0,
    });

    this.tweens.add({
      targets: this.mainCard,
      y: 160,
      ease: "Power2",
      duration: 1000,
      delay: 1000,
      repeat: 0,
    });
  }

  cardProp(card, rect) {
    card.on("pointerdown", () => {
      this.tweens.add({
        targets: this.check,
        alpha: 1,
        ease: "Power2",
        duration: 400,
        repeat: 0,
      });

      if (card == this.card1) {
        if (selected.includes(1)) {
          Phaser.Utils.Array.Remove(selected, 1);
          this.rect1.setAlpha(0);
          this.S1 = false;
        } else {
          Phaser.Utils.Array.AddAt(selected, 1, 0);
          this.rect1.setAlpha(1);
          this.S1 = true;
        }
      } else if (card == this.card2) {
        if (selected.includes(2)) {
          Phaser.Utils.Array.Remove(selected, 2);
          this.rect2.setAlpha(0);
          this.S2 = false;
        } else {
          Phaser.Utils.Array.AddAt(selected, 2, 1);
          this.rect2.setAlpha(1);
          this.S2 = true;
        }
      } else if (card == this.card3) {
        if (selected.includes(3)) {
          Phaser.Utils.Array.Remove(selected, 3);
          this.rect3.setAlpha(0);
          this.S3 = false;
        } else {
          Phaser.Utils.Array.AddAt(selected, 3, 2);
          this.rect3.setAlpha(1);
          this.S3 = true;
        }
      } else if (card == this.card4) {
        if (selected.includes(4)) {
          Phaser.Utils.Array.Remove(selected, 4);
          this.rect4.setAlpha(0);
          this.S4 = false;
        } else {
          Phaser.Utils.Array.AddAt(selected, 4, 3);
          this.rect4.setAlpha(1);
          this.S4 = true;
        }
      }
    });

    card.on(
      "pointerover",
      function (pointer) {
        this.cardHoverMusic.setVolume(0.1).setLoop(false).play();

        card.y = card.y - 10;
        rect.y = rect.y - 10;
      },
      this
    );

    card.on(
      "pointerout",
      function (pointer) {
        card.y = card.y + 10;
        rect.y = rect.y + 10;
      },
      this
    );
  }

  setTvalues() {
    if (qnum == 1) {
      this.T1 = true;
      this.T2 = false;
      this.T3 = true;
      this.T4 = true;
    } 

    else if(qnum ==2){
      
        this.T1 = true;
        this.T2 = true;
        this.T3 = false;
        this.T4 = true;      
    }

    else if (qnum == 3) {
      this.T1 = false;
      this.T2 = true;
      this.T3 = true;
      this.T4 = true;
    } 
    
    else if (qnum == 4) {
      this.T1 = true;
      this.T2 = true;
      this.T3 = true;
      this.T4 = false;
    } 
    
    else if (qnum == 5) {
      this.T1 = true;
      this.T2 = true;
      this.T3 = true;
      this.T4 = true;
    }
  }

  cardFlip(card, rect) {
    this.timer = 500;

    this.tweens.add({
      targets: [card, rect],
      scaleX: 1.1,
      duration: 100,
      delay: this.timer,
      repeat: 0,
    });

    this.tweens.add({
      targets: [card, rect],
      scaleX: 0,
      duration: 200,
      delay: this.timer + 100,
      repeat: 0,

      onComplete: () => {
        if (card == this.card1) {
          this.card1.setTexture("D_" + qnum + "_1");
        } else if (card == this.card2) {
          this.card2.setTexture("D_" + qnum + "_2");
        } else if (card == this.card3) {
          this.card3.setTexture("D_" + qnum + "_3");
        } else if (card == this.card4) {
          this.card4.setTexture("D_" + qnum + "_4");
        } else if (card == this.mainCard) {
          this.mainCard.setTexture("mainCard" + (5 + qnum) + "_on");
        }
      },
    });

    this.tweens.add({
      targets: [card, rect],
      scaleX: 1.1,
      duration: 200,
      delay: this.timer + 300,
      repeat: 0,
    });

    this.tweens.add({
      targets: [card, rect],
      scaleX: 1,
      duration: 100,
      delay: this.timer + 500,
      repeat: 0,
      onComplete: () => {
        if (card == this.card1) {
          if (qnum == 3) {
            this.cross1.play("cross").setVisible(true).setScale(0.8);
          } else {
            this.tick1.play("tick").setVisible(true).setScale(0.2);
          }
        } 
        
        else if (card == this.card2) {
          if (qnum == 1) {
            this.cross2.play("cross").setVisible(true).setScale(0.8);
          } else {
          this.tick2.play("tick").setVisible(true).setScale(0.2);
          }

        } 
        
        else if (card == this.card3) {
          if (qnum == 2) {
            this.cross3.play("cross").setVisible(true).setScale(0.8);
          } else {
          this.tick3.play("tick").setVisible(true).setScale(0.2);
          }
        } 
        
        else if (card == this.card4) {
          if (qnum == 4) {
            this.cross4.play("cross").setVisible(true).setScale(0.8);
          } else {
            this.tick4.play("tick").setVisible(true).setScale(0.2);
          }
        }
      },
    });

    this.timer = 5000;

    this.tweens.add({
      targets: [card, rect],
      scaleX: 1.1,
      duration: 100,
      delay: this.timer,
      repeat: 0,
      onComplete: () => {
        this.cardFlipMusic.setVolume(0.1).setLoop(false).play();

        this.tick1.setVisible(false);
        this.tick2.setVisible(false);
        this.tick3.setVisible(false);
        this.tick4.setVisible(false);

        this.cross1.setVisible(false);
        this.cross2.setVisible(false);
        this.cross3.setVisible(false);
        this.cross4.setVisible(false);
      },
    });

    this.tweens.add({
      targets: [card, rect],
      scaleX: 0,
      duration: 200,
      delay: this.timer + 100,
      repeat: 0,

      onComplete: () => {
        this.text.setAlpha(0);

        if (card == this.card1) {
          this.card1.setTexture("C_" + qnum + "_1");
        } else if (card == this.card2) {
          this.card2.setTexture("C_" + qnum + "_2");
        } else if (card == this.card3) {
          this.card3.setTexture("C_" + qnum + "_3");
        } else if (card == this.card4) {
          this.card4.setTexture("C_" + qnum + "_4");
        } else if (card == this.mainCard) {
          this.mainCard.setTexture("mainCard" + (5 + qnum));
        }
      },
    });

    this.tweens.add({
      targets: [card, rect],
      scaleX: 1.1,
      duration: 200,
      delay: this.timer + 300,
      repeat: 0,
    });

    this.tweens.add({
      targets: [card, rect],
      scaleX: 1,
      duration: 100,
      delay: this.timer + 500,
      repeat: 0,
      onComplete: () => {
        if (card == this.card3 || card == this.card1 || card == this.card2 || card == this.card4) rect.setTexture("Rect_1").setAlpha(0);

        this.card1.setInteractive();
        this.card2.setInteractive();
        this.card3.setInteractive();
        this.card4.setInteractive();

        selected = [];

        this.S1 = false;
        this.S2 = false;
        this.S3 = false;
        this.S4 = false;

        this.text.setTexture("text" + qnum);
        this.tweens.add({
          targets: [this.text, this.check],
          alpha: 1,
          ease: "Power2",
          duration: 400,
          repeat: 0,
        });
      },
    });
  }

  update() {
    this.bar_on.setCrop(0, 0, 75, this.cut.y);

    if (this.stopvid) {
      this.vid.stop();
    }
  }
}
