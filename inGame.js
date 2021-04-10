var basicmap;
var map;
var tileset;
var layer;
var score = 0;

var curr = 10;

let controls;
let player;
let player2;
//var platforms;
var cursors;

let P3;

var ship = 10;

var meteos;
var asteroid;
var comet;
var cute;
var cute2;
var moon;
var star;
var ufo;
var uranus;
var heart;
var astronaut;
var spacecapsule;
var day;
var eclipse;
var flag;
var galaxy;
var helmet;
var mars;
var moonrover;
var observatory;
var planet;
var rocket;
var satellite;
var saturn;

var outmap1;
var outmap2;

var TEXT;
var skip;

var group;

var bullets;
var bulUP;
var bulDOWN;
var bulcnt = 0;
var bulitem = 0;
var bultext;

var life = 3;
var lifeText;


var isPlaying1 = false;
var isPlaying2 = false;
var introPlay = false;

var shoot1P = false;
var shoot2P = false;
var shoot3P = false;

var itemsound;

var audio = new Audio('newschooltrap.mp3');
audio.volume = 1;

var textBGM = new Audio('textBGM.mp3');
textBGM.volume = 0.1;

var reading = new Audio('reading.mp3');
reading.volume = 1;

var intro = new Audio('intro.mp3');
intro.volume = 1;

var shoot1;
var shoot2;
var shoot3;

var time = 0;
var timeText;
var timeEvent;

var ScoreResult = 0;
var scoreText;

var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Menu() {
        Phaser.Scene.call(this, {
            key: 'Menu'
        });
    },
    preload: function () {
        this.load.image("tiles", "space_tileset.png");
        this.load.image('Starting', 'Starting.png');
        this.load.tilemapCSV("basicmap", "basicMap.csv");

    },
    create: function () {
        const basicmap = this.make.tilemap({
            key: "basicmap",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = basicmap.addTilesetImage("tiles");
        const layer = basicmap.createStaticLayer(0, tileset, 0, 0);
        var bg = this.add.image(825, 450, 'Starting');
        bg.setInteractive();
        bg.once('pointerup', function () {
            this.scene.start('Typing');
        }, this);


    },
    update: function () {
        if (!introPlay) {
            intro.play();
            introPlay = true;
        }
    }
});

var HowToPlay = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function HowToPlay() {
        Phaser.Scene.call(this, {
            key: 'HowToPlay'
        });
    },
    preload: function () {
        this.load.image("tiles", "space_tileset.png");
        this.load.image('howToPlay', 'howToPlay.png');
        this.load.tilemapCSV("basicmap", "basicMap.csv");
        this.load.image("bullet", "bullet.png");

        this.load.spritesheet("dude", "200X188.png", {
            frameWidth: 200,
            frameHeight: 188
        });
    },
    create: function () {
        const basicmap = this.make.tilemap({
            key: "basicmap",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = basicmap.addTilesetImage("tiles");
        const layer = basicmap.createStaticLayer(0, tileset, 0, 0);
        var bg = this.add.image(825, 450, 'howToPlay');

        player = this.physics.add.sprite(220, 410, "dude");
        //player.setBounce(0.2);

        //플레이어 스프라이트 애니메이션
        const anims = this.anims;
        anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 35
            }),
            frameRate: 15,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        bullets = this.physics.add.group();
        bullets.enableBody = true;

        bg.setInteractive();
        bg.once('pointerup', function () {
            this.scene.start('Choice');
        }, this);
    },
    update: function () {
        player.anims.play('rotate', true); //360도 회전 반복

        if (cursors.space.isDown) {
            bulcnt++;
        } else {
            bulcnt = 0;
        }

        if (bulcnt == 1) {
            bullets.create(player.x + 40, player.y, "bullet");
            bullets.setVelocityX(1500);
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-430);
            if (cursors.down.isDown) {
                player.setVelocityY(330);
            } else if (cursors.up.isDown) {
                player.setVelocityY(-330);
            } else {
                player.setVelocityY(0);
            }
        } else if (cursors.right.isDown) {
            player.setVelocityX(430);
            if (cursors.down.isDown) {
                player.setVelocityY(330);
            } else if (cursors.up.isDown) {
                player.setVelocityY(-330);
            } else {
                player.setVelocityY(0);
            }
        } else if (cursors.down.isDown) {
            player.setVelocityY(330);
        } else if (cursors.up.isDown) {
            player.setVelocityY(-330);
        } else {
            player.setVelocityX(0);
            player.setVelocityY(0);
        }

    }
});

var Typing = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Typing() {
        Phaser.Scene.call(this, {
            key: 'Typing'
        });
    },
    preload: function () {
        this.load.image("skip", "NEXT.png");
        this.load.image("story", "gameStory.png");
        this.load.image("tiles", "space_tileset.png");
        this.load.tilemapCSV("basicmap", "basicMap.csv");
    },
    create: function () {
        const basicmap = this.make.tilemap({
            key: "basicmap",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = basicmap.addTilesetImage("tiles");
        const layer = basicmap.createStaticLayer(0, tileset, 0, 0);

        skip = this.add.image(1475, 825, "skip");
        skip.setInteractive();
        skip.once('pointerup', function () {
            this.scene.start('HowToPlay');
        }, this);

        TEXT = this.physics.add.group();
        var textshow = TEXT.create(825, 1800, "story");

    },
    update: function () {
        if (!isPlaying2) {
            textBGM.play();
            reading.play();
            isPlaying2 = true;
            intro.pause();
        }

        TEXT.setVelocityY(-80);
    }
});

var Choice = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Choice() {
        Phaser.Scene.call(this, {
            key: 'Choice'
        });
    },
    preload: function () {
        this.load.image("tiles", "space_tileset.png");
        this.load.tilemapCSV("basicmap", "basicMap.csv");
        this.load.image("choice", "choice.png");

        this.load.spritesheet("dude", "200X188.png", {
            frameWidth: 200,
            frameHeight: 188
        });
        this.load.spritesheet("ring", "RING.png", {
            frameWidth: 160,
            frameHeight: 97
        });
        this.load.spritesheet("plane", "SHIP.png", {
            frameWidth: 136,
            frameHeight: 101
        });

    },
    create: function () {
        const basicmap = this.make.tilemap({
            key: "basicmap",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = basicmap.addTilesetImage("tiles");
        const layer = basicmap.createStaticLayer(0, tileset, 0, 0);
        this.add.image(825, 450, "choice");

        player = this.physics.add.sprite(330, 470, "dude");
        player.setInteractive();
        player.once('pointerup', function () {
            this.scene.start('Scene1');
        }, this);

        player2 = this.physics.add.sprite(825, 470, "plane");
        player2.setInteractive();
        player2.once('pointerup', function () {
            this.scene.start('Scene2');
        }, this);

        P3 = this.physics.add.sprite(1320, 470, "ring");
        P3.setInteractive();
        P3.once('pointerup', function () {
            this.scene.start('Scene3');
        }, this);

        //플레이어 스프라이트 애니메이션
        const anims = this.anims;

        anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 35
            }),
            frameRate: 25,
            repeat: -1
        });

        anims.create({
            key: 'rotate2',
            frames: this.anims.generateFrameNumbers("plane", {
                start: 0,
                end: 35
            }),
            frameRate: 25,
            repeat: -1
        });

        anims.create({
            key: 'rotate3',
            frames: this.anims.generateFrameNumbers("ring", {
                start: 0,
                end: 35
            }),
            frameRate: 25,
            repeat: -1
        });

    },
    update: function () {
        player.anims.play('rotate', true);
        player2.anims.play('rotate2', true);
        P3.anims.play('rotate3', true);

        if (!isPlaying1) {
            audio.play();
            isPlaying1 = true;
            textBGM.pause();
            reading.pause();
        }
    }
});

var Scene1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Scene1() {
        Phaser.Scene.call(this, {
            key: 'Scene1'
        });
    },
    preload: function () {
        this.load.image("tiles", "space_tileset.png");
        this.load.image("meteos", "meteo.png");
        this.load.image("asteroid", "asteroid.png");
        this.load.image("comet", "comet.png");
        this.load.image("cute", "cute.png");
        this.load.image("cute2", "cute2.png");
        this.load.image("moon", "moon.png");
        this.load.image("star", "star.png");
        this.load.image("ufo", "ufo.png");
        this.load.image("uranus", "uranus.png");
        this.load.image("astronaut", "astronaut.png");
        this.load.image("day", "day.png");
        this.load.image("eclipse", "eclipse.png");
        this.load.image("spacecapsule", "spacecapsule.png");
        this.load.image("flag", "flag.png");
        this.load.image("galaxy", "galaxy.png");
        this.load.image("helmet", "helmet.png");
        this.load.image("mars", "mars.png");
        this.load.image("moonrover", "moonrover.png");
        this.load.image("observatory", "observatory.png");
        this.load.image("planet", "planet.png");
        this.load.image("rocket", "rocket.png");
        this.load.image("satellite", "satellite.png");
        this.load.image("saturn", "saturn.png");

        this.load.image("outmap1", "OutMap.png");
        this.load.image("outmap2", "OutMap2.png");

        this.load.image("bullet", "bullet.png");
        this.load.image("bulletRD", "bulletRightDown.png");
        this.load.image("bulletRU", "bulletRightUp.png");
        this.load.image("bulletUp", "bulletUP.png");
        this.load.image("bulletDown", "bulletDOWN.png");
        this.load.audio("shoot1", ["shoot1.ogg"]);

        this.load.audio("collide", ["CollideSound.ogg"]);
                this.load.audio("item", ["itemsound.wav"]);



        this.load.image("heart", "heart.png");

        this.load.spritesheet("dude", "200X188.png", {
            frameWidth: 200,
            frameHeight: 188
        });
        this.load.tilemapCSV("map", "RealMap_mapLayer.csv");
        //this.load.tilemapCSV("Cmap", "RealMap_CollideLayer.csv");
    },

    create: function () {
        shoot1 = this.sound.add("shoot1");
        //맵
        const map = this.make.tilemap({
            key: "map",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = map.addTilesetImage("tiles");
        const layer = map.createDynamicLayer(0, tileset, 0, 0);

        //플레이어
        player = this.physics.add.sprite(200, 400, "dude");
        player.body.setSize(player.width - 40, player.height - 60).setOffset(20, 30);

        var collideS = this.sound.add("collide");
        itemsound = this.sound.add("item");

        //player.setBounce(0.2);

        //플레이어 스프라이트 애니메이션
        const anims = this.anims;
        anims.create({
            key: 'rotate',
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 35
            }),
            frameRate: 25,
            repeat: -1
        });

        const camera = this.cameras.main;
        cursors = this.input.keyboard.createCursorKeys();

        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //총알 (그냥총알, 위총알, 아래총알)
        bullets = this.physics.add.group();
        bullets.enableBody = true;

        bulletRU = this.physics.add.group();
        bulletRU.enableBody = true;

        bulletRD = this.physics.add.group();
        bulletRD.enableBody = true;

        bulUP = this.physics.add.group();
        bulUP.enablebody = true;

        bulDOWN = this.physics.add.group();
        bulDOWN.enablebody = true;

        outmap1 = this.physics.add.group();
        var Outmap1 = outmap1.create(45004, -100, "outmap1");

        outmap2 = this.physics.add.group();
        var Outmap2 = outmap2.create(45004, 1130, "outmap2");


        moon = this.physics.add.group();
        var moonARR = new Array();
        for (var i = 0; i < 10; i++) {
            var myMoon = moonARR[i];
            myMoon = moon.create(Math.random() * 9000 + 4000, Math.random() * 800, "moon");
            myMoon.body.setSize(myMoon.width - 30, myMoon.height - 30).setOffset(15, 15);
            this.physics.add.collider(player, myMoon, hitMeteo, null, this);
            this.physics.add.collider(bullets, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulUP, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myMoon, hitBullet, null, this);
        }

        saturn = this.physics.add.group(); //1
        var saturnARR = new Array();
        for (var i = 0; i < 10; i++) {
            var mySaturn = saturnARR[i];
            mySaturn = saturn.create(Math.random() * 11000 + 9000, Math.random() * 800, "saturn");
            mySaturn.body.setSize(mySaturn.width - 40, mySaturn.height - 40).setOffset(20, 20);
            this.physics.add.collider(player, mySaturn, hitMeteo, null, this);
            this.physics.add.collider(bullets, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulUP, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulletRU, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulletRD, mySaturn, hitBullet, null, this);
        }

        satellite = this.physics.add.group();
        var satelliteARR = new Array();
        for (var i = 0; i < 10; i++) {
            var mySatellite = satelliteARR[i];
            mySatellite = satellite.create(Math.random() * 5000 + 1000, Math.random() * 800, "satellite");
            mySatellite.body.setSize(mySatellite.width - 60, mySatellite.height - 60).setOffset(30, 30);

            this.physics.add.collider(player, mySatellite, hitMeteo, null, this);
            this.physics.add.collider(bullets, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulUP, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulletRU, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulletRD, mySatellite, hitBullet, null, this);
        }

        planet = this.physics.add.group();
        var planetARR = new Array();
        for (var i = 0; i < 10; i++) {
            var myPlanet = planetARR[i];
            myPlanet = planet.create(Math.random() * 11000 + 1000, Math.random() * 800, "planet");
            myPlanet.body.setSize(myPlanet.width - 50, myPlanet.height - 50).setOffset(20, 20);

            this.physics.add.collider(player, myPlanet, hitMeteo, null, this);
            this.physics.add.collider(bullets, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulUP, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myPlanet, hitBullet, null, this);
        }

        rocket = this.physics.add.group();
        var rocketARR = new Array();
        for (var i = 0; i < 5; i++) {
            var myRocket = rocketARR[i];
            myRocket = rocket.create(Math.random() * 11000 + 5000, Math.random() * 800, "rocket");
            myRocket.body.setSize(myRocket.width - 30, myRocket.height - 50).setOffset(15, 25);

            this.physics.add.collider(player, myRocket, hitMeteo, null, this);
            this.physics.add.collider(bullets, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulUP, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myRocket, hitBullet, null, this);
        }


        // moon -> rocket : stage 1 장애물들
        galaxy = this.physics.add.group();
        var galaxyARR = new Array();
        for (var i = 0; i < 25; i++) {
            var myGalaxy = galaxyARR[i]
            myGalaxy = galaxy.create(Math.random() * 14000 + 12000, Math.random() * 800, "galaxy");
            myGalaxy.body.setSize(myGalaxy.width - 50, myGalaxy.height - 50).setOffset(25, 25);

            this.physics.add.collider(player, myGalaxy, hitMeteo, null, this);
            this.physics.add.collider(bullets, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulUP, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myGalaxy, hitBullet, null, this);
        }

        asteroid = this.physics.add.group();
        var asteroidARR = new Array();
        for (var i = 0; i < 32; i++) {
            var myAsteroid = asteroidARR[i]
            myAsteroid = asteroid.create(Math.random() * 17000 + 14000, Math.random() * 800, "asteroid");
            myAsteroid.body.setSize(myAsteroid.width - 20, myAsteroid.height - 30).setOffset(10, 15);

            this.physics.add.collider(player, myAsteroid, hitMeteo, null, this);
            this.physics.add.collider(bullets, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulUP, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myAsteroid, hitBullet, null, this);
        }

        comet = this.physics.add.group();
        var cometARR = new Array();
        for (var i = 0; i < 50; i++) {
            var myComet = cometARR[i]
            myComet = comet.create(Math.random() * 20000 + 16000, Math.random() * 100, "comet");
            myComet.body.setSize(myComet.width - 20, myComet.height - 30).setOffset(10, 15);

            this.physics.add.collider(player, myComet, hitMeteo, null, this);
            this.physics.add.collider(bullets, myComet, hitBullet, null, this);
            this.physics.add.collider(bulUP, myComet, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myComet, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myComet, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myComet, hitBullet, null, this);
        }

        cute = this.physics.add.group();
        cute2 = this.physics.add.group();
        var cuteARR = new Array();
        var cute2ARR = new Array();
        for (var i = 0; i < 30; i++) {
            var myCute = cuteARR[i]
            myCute = cute.create(Math.random() * 20000 + 11000, Math.random() * 800, "cute");
            myCute.body.setSize(myCute.width - 50, myCute.height - 10).setOffset(25, 5);

            this.physics.add.collider(player, myCute, hitMeteo, null, this);
            this.physics.add.collider(bullets, myCute, hitBullet, null, this);
            this.physics.add.collider(bulUP, myCute, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myCute, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myCute, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myCute, hitBullet, null, this);

            var myCute2 = cute2ARR[i];
            myCute2 = cute2.create(Math.random() * 20000 + 11000, Math.random() * 800, "cute2");
            myCute2.body.setSize(myCute2.width - 50, myCute2.height - 10).setOffset(25, 5);

            this.physics.add.collider(player, myCute2, hitMeteo, null, this);
            this.physics.add.collider(bullets, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulUP, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myCute2, hitBullet, null, this);
        }


        ufo = this.physics.add.group();
        uranus = this.physics.add.group();
        eclipse = this.physics.add.group();
        astronaut = this.physics.add.group();
        day = this.physics.add.group();



        var ufoARR = new Array();
        var uranusARR = new Array();
        var eclipseARR = new Array();
        var astronautARR = new Array();
        var dayARR = new Array();
        for (var i = 0; i < 30; i++) {
            var myUfo = ufoARR[i]
            myUfo = ufo.create(Math.random() * 24000 + 21000, Math.random() * 800, "ufo");
            myUfo.body.setSize(myUfo.width - 20, myUfo.height - 40).setOffset(10, 20);
            this.physics.add.collider(player, myUfo, hitMeteo, null, this);
            this.physics.add.collider(bullets, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulUP, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myUfo, hitBullet, null, this);

            var myUranus = uranusARR[i];
            myUranus = uranus.create(Math.random() * 27000 + 23000, Math.random() * 800, "uranus");
            myUranus.body.setSize(myUranus.width - 30, myUranus.height - 30).setOffset(15, 15);

            this.physics.add.collider(player, myUranus, hitMeteo, null, this);
            this.physics.add.collider(bullets, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulUP, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myUranus, hitBullet, null, this);

            var myEclipse = uranusARR[i];
            myEclipse = eclipse.create(Math.random() * 30000 + 26000, Math.random() * 800, "eclipse");
            myEclipse.body.setSize(myEclipse.width - 20, myEclipse.height - 50).setOffset(10, 25);

            this.physics.add.collider(player, myEclipse, hitMeteo, null, this);
            this.physics.add.collider(bullets, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulUP, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myEclipse, hitBullet, null, this);

            var myAstronaut = astronautARR[i];
            myAstronaut = astronaut.create(Math.random() * 30000 + 20000, Math.random() * 800, "astronaut");
            myAstronaut.body.setSize(myAstronaut.width - 58, myAstronaut.height - 6).setOffset(29, 3);

            this.physics.add.collider(player, myAstronaut, hitMeteo, null, this);
            this.physics.add.collider(bullets, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulUP, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myAstronaut, hitBullet, null, this);

            var myDay = dayARR[i];
            myDay = day.create(Math.random() * 30000 + 20000, Math.random() * 800, "day");
            myDay.body.setSize(myDay.width - 30, myDay.height - 30).setOffset(15, 15);

            this.physics.add.collider(player, myDay, hitMeteo, null, this);
            this.physics.add.collider(bullets, myDay, hitBullet, null, this);
            this.physics.add.collider(bulUP, myDay, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myDay, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myDay, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myDay, hitBullet, null, this);
        }


        observatory = this.physics.add.group();
        var observatoryARR = new Array();
        for (var i = 0; i < 100; i++) {
            var myObservatory = cometARR[i]
            myObservatory = observatory.create(Math.random() * 35000 + 25000, Math.random() * 1000 + 500, "observatory");
            myObservatory.body.setSize(myObservatory.width - 20, myObservatory.height - 20).setOffset(10, 10);

            this.physics.add.collider(player, myObservatory, hitMeteo, null, this);
            this.physics.add.collider(bullets, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulUP, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myObservatory, hitBullet, null, this);
        }


        star = this.physics.add.group();
        var starARR = new Array();
        for (var i = 0; i < 10; i++) {
            var myStar = starARR[i]
            myStar = star.create(i * 2500 + (Math.random() * 500 + 400), Math.random() * 800, "star");
            myStar.body.setSize(myStar.width - 50, myStar.height - 50).setOffset(0, 50);

            this.physics.add.collider(player, myStar, hitItem, null, this);
        }

        //점수 업데이트 및 표시 부분
        timeText = this.add.text(800, 16, 'SCORE : 0', {
            font: '40px monospace',
            fill: '#999'
        }).setScrollFactor(0);
        timeEvent = this.time.addEvent({
            callback: timeDecline,
            callbackScope: this,
            loop: true
        });

        function timeDecline() {
            time++;

            timeText.setText('SCORE : ' + time);
        }

        //총알 개수 표시 부분
        bultext = this.add.text(16, 16, 'Bullet : 0', {
            font: '20px monospace',
            fill: '#999'
        }).setScrollFactor(0);

        lifeText = this.add.text(1400, 16, '♥♥♥', {
            font: '40px monospace',
            fill: '#ff0000'
        }).setScrollFactor(0);

        //하트 충돌 시 목숨 추가
        heart = this.physics.add.group();
        var heart1 = heart.create(5000, Math.random() * 800, "heart");
        var heart2 = heart.create(14000, Math.random() * 800, "heart");
        var heart3 = heart.create(22000, Math.random() * 800, "heart");
        heart1.body.setSize(heart1.width - 30, heart1.height - 50).setOffset(15, 25);
        heart2.body.setSize(heart2.width - 30, heart2.height - 50).setOffset(15, 25);
        heart3.body.setSize(heart3.width - 30, heart3.height - 50).setOffset(15, 25);
        this.physics.add.collider(player, heart1, hitHeart, null, this);
        this.physics.add.collider(player, heart2, hitHeart, null, this);
        this.physics.add.collider(player, heart3, hitHeart, null, this);

        this.physics.add.collider(player, Outmap1, hitEdge2, null, this);
        this.physics.add.collider(player, Outmap2, hitEdge1, null, this);


        function hitHeart(player, heart) {
            life++;
            heart.disableBody(true, true);
            
            itemsound.play();

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            }
        }

        //플레이어 아이템 충돌함수
        function hitItem(player, star) {
            bulitem += 5;
            bultext.setText('Bullet : ' + bulitem);
            star.disableBody(true, true);
            itemsound.play();
        }
        

        //총알 장애물 충돌함수
        function hitBullet(bullets, meteo) {
            bullets.disableBody(true, true);
            meteo.disableBody(true, true);
            time += 100;

        }

        //플레이어 장애물 충돌함수
        function hitMeteo(player, meteo) {
            //player.setTint(0xff0000);

            life--;

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                bulitem = 0;
                this.scene.start('Last');
            }

            meteo.setX(Math.random() * 1000 + 600);
            meteo.setY(Math.random() * 500);

            meteo.disableBody(true, true);
            collideS.play();

            player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 10,
            });
        }

        function hitEdge1(player, Outmap) {
            //player.setTint(0xff0000);

            life--;

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                this.scene.start('Last');
            }
            collideS.play();

            player.setY(400);

            Outmap2 = outmap2.create(45004, 1130, "outmap2");
            this.physics.add.collider(player, Outmap2, hitEdge1, null, this);
            //
            //            Outmap2.setX(45004);
            //            Outmap2.setY(1030);


            // player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
            });
        }

        function hitEdge2(player, Outmap1) {
            //player.setTint(0xff0000);

            life--;
            collideS.play();

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                this.scene.start('Last');
            }


            player.setY(400);

            Outmap1 = outmap1.create(45004, -100, "outmap1");
            this.physics.add.collider(player, Outmap1, hitEdge2, null, this);

            Outmap1.setX(45004);
            Outmap1.setY(-100);


            // player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
            });
        }
    },

    update: function () {

        if (!isPlaying1) {
            audio.play();
            isPlaying1 = true;
            textBGM.pause();
            reading.pause();
        }

        console.log(player.x);
        player.anims.play('rotate', true); //360도 회전 반복

        //장애물들 속도 정해주는거 






        moon.setVelocityY(50);
        moon.setVelocityX(-450);

        planet.setVelocityY(3);
        planet.setVelocityX(-200);

        rocket.setVelocityY(5);
        rocket.setVelocityX(-100);

        satellite.setVelocityY(2);
        satellite.setVelocityX(-300);

        saturn.setVelocityY(1);
        saturn.setVelocityX(-300);


        star.setVelocityY(0);





        if (player.x > 10000) {
            galaxy.setVelocityY(0);
            galaxy.setVelocityX(-300);

            asteroid.setVelocityY(50);
            asteroid.setVelocityX(-350);

            comet.setVelocityY(70);
            comet.setVelocityX(-450);

            cute.setVelocityY(0);
            cute.setVelocityX(-350);

            cute2.setVelocityY(0);
            cute2.setVelocityX(-150);
        }

        if (player.x > 20000) {
            ufo.setVelocityY(24);
            ufo.setVelocityX(-350);

            uranus.setVelocityY(-10);
            uranus.setVelocityX(-450);

            eclipse.setVelocityY(-50);
            eclipse.setVelocityX(-500);

            astronaut.setVelocityY(1);
            astronaut.setVelocityX(-200);

            day.setVelocityY(2);
            day.setVelocityX(-300);

            observatory.setVelocityY(-50);
            observatory.setVelocityX(-450);

        }


        //총알 쏘는 부분
        if (cursors.space.isDown && bulitem > 0) {
            bulcnt++;
            shoot1.play();
        } else {
            bulcnt = 0;
        }

        if (bulcnt == 1 && bulitem > 0) {
            if (cursors.right.isDown && cursors.down.isDown) {
                bulletRD.create(player.x + 40, player.y, "bulletRD");
                bulletRD.setVelocityX(1500);
                bulletRD.setVelocityY(1000);
            } else if (cursors.right.isDown && cursors.up.isDown) {
                bulletRU.create(player.x + 40, player.y, "bulletRU");
                bulletRU.setVelocityX(1500);
                bulletRU.setVelocityY(-1000);
            } else if (cursors.up.isDown) {
                bulUP.create(player.x + 40, player.y, "bulletUp");
                bulUP.setVelocityX(200);
                bulUP.setVelocityY(-1000);
            } else if (cursors.down.isDown) {
                bulDOWN.create(player.x + 40, player.y, "bulletDown");
                bulDOWN.setVelocityX(200);
                bulDOWN.setVelocityY(1000);
            } else {
                bullets.create(player.x + 40, player.y, "bullet");
                bullets.setVelocityX(1500);
            }

            bulitem--;
            bultext.setText('Bullet : ' + bulitem);
        }

        //플레이어 조종부분
        if (cursors.right.isDown) {
            player.setVelocityX(430);
            if (cursors.down.isDown) {
                player.setVelocityY(330);
            } else if (cursors.up.isDown) {
                player.setVelocityY(-330);
            } else {
                player.setVelocityY(0);
            }
        } else if (cursors.down.isDown) {
            player.setVelocityY(330);
        } else if (cursors.up.isDown) {
            player.setVelocityY(-330);
        } else {
            player.setVelocityX(100);
            player.setVelocityY(0);
        }
    },
});


var Scene2 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Scene2() {
        Phaser.Scene.call(this, {
            key: 'Scene2'
        });
    },
    preload: function () {
        this.load.image("tiles", "space_tileset.png");
        this.load.image("meteos", "meteo.png");
        this.load.image("asteroid", "asteroid.png");
        this.load.image("comet", "comet.png");
        this.load.image("cute", "cute.png");
        this.load.image("cute2", "cute2.png");
        this.load.image("moon", "moon.png");
        this.load.image("star", "star.png");
        this.load.image("ufo", "ufo.png");
        this.load.image("uranus", "uranus.png");
        this.load.image("astronaut", "astronaut.png");
        this.load.image("day", "day.png");
        this.load.image("eclipse", "eclipse.png");
        this.load.image("spacecapsule", "spacecapsule.png");
        this.load.image("flag", "flag.png");
        this.load.image("galaxy", "galaxy.png");
        this.load.image("helmet", "helmet.png");
        this.load.image("mars", "mars.png");
        this.load.image("moonrover", "moonrover.png");
        this.load.image("observatory", "observatory.png");
        this.load.image("planet", "planet.png");
        this.load.image("rocket", "rocket.png");
        this.load.image("satellite", "satellite.png");
        this.load.image("saturn", "saturn.png");

        this.load.image("outmap1", "OutMap.png");
        this.load.image("outmap2", "OutMap2.png");

        this.load.image("bullet2", "bullet2.png");
        this.load.image("bullet2RD", "bullet2RD.png");
        this.load.image("bullet2RU", "bullet2RU.png");
        this.load.image("bullet2Up", "bullet2UP.png");
        this.load.image("bullet2Down", "bullet2DOWN.png");

        this.load.audio("shoot2", ["shoot2.wav"]);
        this.load.audio("collide", ["CollideSound.ogg"]);
                        this.load.audio("item", ["itemsound.wav"]);




        this.load.image("heart", "heart.png");

        this.load.spritesheet("dude", "SHIP.png", {
            frameWidth: 136,
            frameHeight: 101
        });
        this.load.tilemapCSV("map", "RealMap_mapLayer.csv");
    },

    create: function () {
        //맵

        shoot2 = this.sound.add("shoot2");

        const map = this.make.tilemap({
            key: "map",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = map.addTilesetImage("tiles");
        const layer = map.createDynamicLayer(0, tileset, 0, 0);

        //플레이어
        player2 = this.physics.add.sprite(200, 400, "dude");
        player2.body.setSize(116, 81).setOffset(0, 0);
        var collideS = this.sound.add("collide");


        //player.setBounce(0.2);

        //플레이어 스프라이트 애니메이션
        const anims = this.anims;
        anims.create({
            key: 'rotate2',
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 35
            }),
            frameRate: 25,
            repeat: -1
        });
        console.log(curr);
        
                itemsound = this.sound.add("item");


        const camera = this.cameras.main;
        cursors = this.input.keyboard.createCursorKeys();

        camera.startFollow(player2);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //총알 (그냥총알, 위총알, 아래총알)
        bullets = this.physics.add.group();
        bullets.enableBody = true;

        bulletRU = this.physics.add.group();
        bulletRU.enableBody = true;

        bulletRD = this.physics.add.group();
        bulletRD.enableBody = true;

        bulUP = this.physics.add.group();
        bulUP.enablebody = true;

        bulDOWN = this.physics.add.group();
        bulDOWN.enablebody = true;

        outmap1 = this.physics.add.group();
        var Outmap1 = outmap1.create(45004, -100, "outmap1");

        outmap2 = this.physics.add.group();
        var Outmap2 = outmap2.create(45004, 1130, "outmap2");


        moon = this.physics.add.group();
        var moonARR = new Array();
        for (var i = 0; i < 10; i++) {
            var myMoon = moonARR[i];
            myMoon = moon.create(Math.random() * 9000 + 4000, Math.random() * 800, "moon");
            myMoon.body.setSize(myMoon.width - 30, myMoon.height - 30).setOffset(15, 15);
            this.physics.add.collider(player2, myMoon, hitMeteo, null, this);
            this.physics.add.collider(bullets, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulUP, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myMoon, hitBullet, null, this);
        }

        saturn = this.physics.add.group(); //1
        var saturnARR = new Array();
        for (var i = 0; i < 10; i++) {
            var mySaturn = saturnARR[i];
            mySaturn = saturn.create(Math.random() * 11000 + 9000, Math.random() * 800, "saturn");
            mySaturn.body.setSize(mySaturn.width - 40, mySaturn.height - 40).setOffset(20, 20);
            this.physics.add.collider(player2, mySaturn, hitMeteo, null, this);
            this.physics.add.collider(bullets, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulUP, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulletRU, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulletRD, mySaturn, hitBullet, null, this);
        }

        satellite = this.physics.add.group();
        var satelliteARR = new Array();
        for (var i = 0; i < 10; i++) {
            var mySatellite = satelliteARR[i];
            mySatellite = satellite.create(Math.random() * 5000 + 1000, Math.random() * 800, "satellite");
            mySatellite.body.setSize(mySatellite.width - 60, mySatellite.height - 60).setOffset(30, 30);

            this.physics.add.collider(player2, mySatellite, hitMeteo, null, this);
            this.physics.add.collider(bullets, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulUP, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulletRU, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulletRD, mySatellite, hitBullet, null, this);
        }

        planet = this.physics.add.group();
        var planetARR = new Array();
        for (var i = 0; i < 10; i++) {
            var myPlanet = planetARR[i];
            myPlanet = planet.create(Math.random() * 11000 + 1000, Math.random() * 800, "planet");
            myPlanet.body.setSize(myPlanet.width - 50, myPlanet.height - 50).setOffset(20, 20);

            this.physics.add.collider(player2, myPlanet, hitMeteo, null, this);
            this.physics.add.collider(bullets, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulUP, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myPlanet, hitBullet, null, this);
        }

        rocket = this.physics.add.group();
        var rocketARR = new Array();
        for (var i = 0; i < 5; i++) {
            var myRocket = rocketARR[i];
            myRocket = rocket.create(Math.random() * 11000 + 5000, Math.random() * 800, "rocket");
            myRocket.body.setSize(myRocket.width - 30, myRocket.height - 50).setOffset(15, 25);

            this.physics.add.collider(player2, myRocket, hitMeteo, null, this);
            this.physics.add.collider(bullets, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulUP, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myRocket, hitBullet, null, this);
        }


        // moon -> rocket : stage 1 장애물들
        galaxy = this.physics.add.group();
        var galaxyARR = new Array();
        for (var i = 0; i < 25; i++) {
            var myGalaxy = galaxyARR[i]
            myGalaxy = galaxy.create(Math.random() * 14000 + 12000, Math.random() * 800, "galaxy");
            myGalaxy.body.setSize(myGalaxy.width - 50, myGalaxy.height - 50).setOffset(25, 25);

            this.physics.add.collider(player2, myGalaxy, hitMeteo, null, this);
            this.physics.add.collider(bullets, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulUP, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myGalaxy, hitBullet, null, this);
        }

        asteroid = this.physics.add.group();
        var asteroidARR = new Array();
        for (var i = 0; i < 32; i++) {
            var myAsteroid = asteroidARR[i]
            myAsteroid = asteroid.create(Math.random() * 17000 + 14000, Math.random() * 800, "asteroid");
            myAsteroid.body.setSize(myAsteroid.width - 20, myAsteroid.height - 30).setOffset(10, 15);

            this.physics.add.collider(player2, myAsteroid, hitMeteo, null, this);
            this.physics.add.collider(bullets, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulUP, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myAsteroid, hitBullet, null, this);
        }

        comet = this.physics.add.group();
        var cometARR = new Array();
        for (var i = 0; i < 50; i++) {
            var myComet = cometARR[i]
            myComet = comet.create(Math.random() * 20000 + 16000, Math.random() * 100, "comet");
            myComet.body.setSize(myComet.width - 20, myComet.height - 30).setOffset(10, 15);

            this.physics.add.collider(player2, myComet, hitMeteo, null, this);
            this.physics.add.collider(bullets, myComet, hitBullet, null, this);
            this.physics.add.collider(bulUP, myComet, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myComet, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myComet, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myComet, hitBullet, null, this);
        }

        cute = this.physics.add.group();
        cute2 = this.physics.add.group();
        var cuteARR = new Array();
        var cute2ARR = new Array();
        for (var i = 0; i < 30; i++) {
            var myCute = cuteARR[i]
            myCute = cute.create(Math.random() * 20000 + 11000, Math.random() * 800, "cute");
            myCute.body.setSize(myCute.width - 50, myCute.height - 10).setOffset(25, 5);

            this.physics.add.collider(player2, myCute, hitMeteo, null, this);
            this.physics.add.collider(bullets, myCute, hitBullet, null, this);
            this.physics.add.collider(bulUP, myCute, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myCute, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myCute, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myCute, hitBullet, null, this);

            var myCute2 = cute2ARR[i];
            myCute2 = cute2.create(Math.random() * 20000 + 11000, Math.random() * 800, "cute2");
            myCute2.body.setSize(myCute2.width - 50, myCute2.height - 10).setOffset(25, 5);

            this.physics.add.collider(player2, myCute2, hitMeteo, null, this);
            this.physics.add.collider(bullets, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulUP, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myCute2, hitBullet, null, this);
        }


        ufo = this.physics.add.group();
        uranus = this.physics.add.group();
        eclipse = this.physics.add.group();
        astronaut = this.physics.add.group();
        day = this.physics.add.group();



        var ufoARR = new Array();
        var uranusARR = new Array();
        var eclipseARR = new Array();
        var astronautARR = new Array();
        var dayARR = new Array();
        for (var i = 0; i < 30; i++) {
            var myUfo = ufoARR[i]
            myUfo = ufo.create(Math.random() * 24000 + 21000, Math.random() * 800, "ufo");
            myUfo.body.setSize(myUfo.width - 20, myUfo.height - 40).setOffset(10, 20);
            this.physics.add.collider(player2, myUfo, hitMeteo, null, this);
            this.physics.add.collider(bullets, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulUP, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myUfo, hitBullet, null, this);

            var myUranus = uranusARR[i];
            myUranus = uranus.create(Math.random() * 27000 + 23000, Math.random() * 800, "uranus");
            myUranus.body.setSize(myUranus.width - 30, myUranus.height - 30).setOffset(15, 15);

            this.physics.add.collider(player2, myUranus, hitMeteo, null, this);
            this.physics.add.collider(bullets, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulUP, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myUranus, hitBullet, null, this);

            var myEclipse = uranusARR[i];
            myEclipse = eclipse.create(Math.random() * 30000 + 26000, Math.random() * 800, "eclipse");
            myEclipse.body.setSize(myEclipse.width - 20, myEclipse.height - 50).setOffset(10, 25);

            this.physics.add.collider(player2, myEclipse, hitMeteo, null, this);
            this.physics.add.collider(bullets, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulUP, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myEclipse, hitBullet, null, this);

            var myAstronaut = astronautARR[i];
            myAstronaut = astronaut.create(Math.random() * 30000 + 20000, Math.random() * 800, "astronaut");
            myAstronaut.body.setSize(myAstronaut.width - 58, myAstronaut.height - 6).setOffset(29, 3);

            this.physics.add.collider(player2, myAstronaut, hitMeteo, null, this);
            this.physics.add.collider(bullets, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulUP, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myAstronaut, hitBullet, null, this);

            var myDay = dayARR[i];
            myDay = day.create(Math.random() * 30000 + 20000, Math.random() * 800, "day");
            myDay.body.setSize(myDay.width - 30, myDay.height - 30).setOffset(15, 15);

            this.physics.add.collider(player2, myDay, hitMeteo, null, this);
            this.physics.add.collider(bullets, myDay, hitBullet, null, this);
            this.physics.add.collider(bulUP, myDay, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myDay, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myDay, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myDay, hitBullet, null, this);
        }


        observatory = this.physics.add.group();
        var observatoryARR = new Array();
        for (var i = 0; i < 100; i++) {
            var myObservatory = cometARR[i]
            myObservatory = observatory.create(Math.random() * 35000 + 25000, Math.random() * 1000 + 500, "observatory");
            myObservatory.body.setSize(myObservatory.width - 20, myObservatory.height - 20).setOffset(10, 10);

            this.physics.add.collider(player2, myObservatory, hitMeteo, null, this);
            this.physics.add.collider(bullets, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulUP, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myObservatory, hitBullet, null, this);
        }


        star = this.physics.add.group();
        var starARR = new Array();
        for (var i = 0; i < 7; i++) {
            var myStar = starARR[i]
            myStar = star.create(i * 4000 + (Math.random() * 500 + 400), Math.random() * 800, "star");
            myStar.body.setSize(myStar.width - 50, myStar.height - 50).setOffset(0, 50);

            this.physics.add.collider(player2, myStar, hitItem, null, this);
        }

        //점수 업데이트 및 표시 부분
        timeText = this.add.text(800, 16, 'SCORE : 0', {
            font: '40px monospace',
            fill: '#999'
        }).setScrollFactor(0);
        timeEvent = this.time.addEvent({
            callback: timeDecline,
            callbackScope: this,
            loop: true
        });

        function timeDecline() {
            time++;

            timeText.setText('SCORE : ' + time);
        }

        //총알 개수 표시 부분
        bultext = this.add.text(16, 16, 'Bullet : 0', {
            font: '20px monospace',
            fill: '#999'
        }).setScrollFactor(0);

        lifeText = this.add.text(1400, 16, '♥♥♥', {
            font: '40px monospace',
            fill: '#ff0000'
        }).setScrollFactor(0);

        //하트 충돌 시 목숨 추가
        heart = this.physics.add.group();
        var heart1 = heart.create(5000, Math.random() * 800, "heart");
        var heart2 = heart.create(14000, Math.random() * 800, "heart");
        var heart3 = heart.create(22000, Math.random() * 800, "heart");
        heart1.body.setSize(heart1.width - 30, heart1.height - 50).setOffset(15, 25);
        heart2.body.setSize(heart2.width - 30, heart2.height - 50).setOffset(15, 25);
        heart3.body.setSize(heart3.width - 30, heart3.height - 50).setOffset(15, 25);
        this.physics.add.collider(player2, heart1, hitHeart, null, this);
        this.physics.add.collider(player2, heart2, hitHeart, null, this);
        this.physics.add.collider(player2, heart3, hitHeart, null, this);





        this.physics.add.collider(player2, Outmap1, hitEdge2, null, this);
        this.physics.add.collider(player2, Outmap2, hitEdge1, null, this);



        function hitHeart(player, heart) {
            life++;
            heart.disableBody(true, true);
            itemsound.play();

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            }
        }

        //플레이어 아이템 충돌함수
        function hitItem(player, star) {
            bulitem += 7;
            bultext.setText('Bullet : ' + bulitem);
            star.disableBody(true, true);
            itemsound.play();
        }

        //총알 장애물 충돌함수
        function hitBullet(bullets, meteo) {
            bullets.disableBody(true, true);
            meteo.disableBody(true, true);
            time += 100;
        }

        //플레이어 장애물 충돌함수
        function hitMeteo(player, meteo) {
            //player.setTint(0xff0000);

            life--;

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                bulitem = 0;
                this.scene.start('Last');
            }

            meteo.setX(Math.random() * 1000 + 600);
            meteo.setY(Math.random() * 500);
            collideS.play();


            meteo.disableBody(true, true);

            player.anims.play('static', true);
            player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 10,
            });
        }

        function hitEdge1(player, Outmap) {
            //player.setTint(0xff0000);

            life--;

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                this.scene.start('Last');
            }

            player.setY(400);
            collideS.play();


            Outmap2 = outmap2.create(45004, 1130, "outmap2");
            this.physics.add.collider(player, Outmap2, hitEdge1, null, this);
            //
            //            Outmap2.setX(45004);
            //            Outmap2.setY(1030);


            // player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
            });
        }

        function hitEdge2(player, Outmap1) {
            //player.setTint(0xff0000);

            life--;
            collideS.play();


            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                this.scene.start('Last');
            }


            player.setY(400);

            Outmap1 = outmap1.create(45004, -100, "outmap1");
            this.physics.add.collider(player, Outmap1, hitEdge2, null, this);

            Outmap1.setX(45004);
            Outmap1.setY(-100);


            // player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
            });
        }
    },

    update: function () {

        if (!isPlaying1) {
            audio.play();
            isPlaying1 = true;
            textBGM.pause();
            reading.pause();
        }

        console.log(player.x);

        player2.anims.play('rotate2', true); //360도 회전 반복





        moon.setVelocityY(50);
        moon.setVelocityX(-450);

        planet.setVelocityY(3);
        planet.setVelocityX(-200);

        rocket.setVelocityY(5);
        rocket.setVelocityX(-100);

        satellite.setVelocityY(2);
        satellite.setVelocityX(-300);

        saturn.setVelocityY(1);
        saturn.setVelocityX(-300);


        star.setVelocityY(0);





        if (player2.x > 10000) {
            galaxy.setVelocityY(0);
            galaxy.setVelocityX(-300);

            asteroid.setVelocityY(50);
            asteroid.setVelocityX(-350);

            comet.setVelocityY(70);
            comet.setVelocityX(-450);

            cute.setVelocityY(0);
            cute.setVelocityX(-350);

            cute2.setVelocityY(0);
            cute2.setVelocityX(-150);
        }

        if (player2.x > 20000) {
            ufo.setVelocityY(24);
            ufo.setVelocityX(-350);

            uranus.setVelocityY(-10);
            uranus.setVelocityX(-450);

            eclipse.setVelocityY(-50);
            eclipse.setVelocityX(-500);

            astronaut.setVelocityY(1);
            astronaut.setVelocityX(-200);

            day.setVelocityY(2);
            day.setVelocityX(-300);

            observatory.setVelocityY(-50);
            observatory.setVelocityX(-450);

        }


        //총알 쏘는 부분
        if (cursors.space.isDown && bulitem > 0) {
            bulcnt++;
            shoot2.play();
        } else {
            bulcnt = 0;
        }

        if (bulcnt == 1 && bulitem > 0) {
            if (cursors.right.isDown && cursors.down.isDown) {
                bulletRD.create(player2.x + 40, player2.y, "bullet2RD");
                bulletRD.setVelocityX(1800);
                bulletRD.setVelocityY(1300);
            } else if (cursors.right.isDown && cursors.up.isDown) {
                bulletRU.create(player2.x + 40, player2.y, "bullet2RU");
                bulletRU.setVelocityX(1800);
                bulletRU.setVelocityY(-1300);
            } else if (cursors.up.isDown) {
                bulUP.create(player2.x + 40, player2.y, "bullet2Up");
                bulUP.setVelocityX(500);
                bulUP.setVelocityY(-1300);
            } else if (cursors.down.isDown) {
                bulDOWN.create(player2.x + 40, player2.y, "bullet2Down");
                bulDOWN.setVelocityX(500);
                bulDOWN.setVelocityY(1300);
            } else {
                bullets.create(player2.x + 40, player2.y, "bullet2");
                bullets.setVelocityX(1800);
            }

            bulitem--;
            bultext.setText('Bullet : ' + bulitem);
        }

        //플레이어 조종부분
        if (cursors.right.isDown) {
            player2.setVelocityX(330);
            if (cursors.down.isDown) {
                player2.setVelocityY(230);
            } else if (cursors.up.isDown) {
                player2.setVelocityY(-230);
            } else {
                player2.setVelocityY(0);
            }
        } else if (cursors.down.isDown) {
            player2.setVelocityY(230);
        } else if (cursors.up.isDown) {
            player2.setVelocityY(-230);
        } else {
            player2.setVelocityX(50);
            player2.setVelocityY(0);
        }
    },
});


var Scene3 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Scene3() {
        Phaser.Scene.call(this, {
            key: 'Scene3'
        });
    },
    preload: function () {
        this.load.image("tiles", "space_tileset.png");
        this.load.image("meteos", "meteo.png");
        this.load.image("asteroid", "asteroid.png");
        this.load.image("comet", "comet.png");
        this.load.image("cute", "cute.png");
        this.load.image("cute2", "cute2.png");
        this.load.image("moon", "moon.png");
        this.load.image("star", "star.png");
        this.load.image("ufo", "ufo.png");
        this.load.image("uranus", "uranus.png");
        this.load.image("astronaut", "astronaut.png");
        this.load.image("day", "day.png");
        this.load.image("eclipse", "eclipse.png");
        this.load.image("spacecapsule", "spacecapsule.png");
        this.load.image("flag", "flag.png");
        this.load.image("galaxy", "galaxy.png");
        this.load.image("helmet", "helmet.png");
        this.load.image("mars", "mars.png");
        this.load.image("moonrover", "moonrover.png");
        this.load.image("observatory", "observatory.png");
        this.load.image("planet", "planet.png");
        this.load.image("rocket", "rocket.png");
        this.load.image("satellite", "satellite.png");
        this.load.image("saturn", "saturn.png");

        this.load.image("outmap1", "OutMap.png");
        this.load.image("outmap2", "OutMap2.png");

        this.load.image("bullet3", "bullet3.png");
        this.load.image("bullet3RD", "bullet3RD.png");
        this.load.image("bullet3RU", "bullet3RU.png");
        this.load.image("bullet3Up", "bullet3UP.png");
        this.load.image("bullet3Down", "bullet3DOWN.png");

        this.load.audio("shoot3", ["shoot3.wav"]);
        this.load.audio("collide", ["CollideSound.ogg"]);
                        this.load.audio("item", ["itemsound.wav"]);




        this.load.image("heart", "heart.png");

        this.load.spritesheet("dude", "RING.png", {
            frameWidth: 160,
            frameHeight: 97
        });
        this.load.tilemapCSV("map", "RealMap_mapLayer.csv");
    },

    create: function () {
        //맵
        const map = this.make.tilemap({
            key: "map",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = map.addTilesetImage("tiles");
        const layer = map.createStaticLayer(0, tileset, 0, 0);

        //플레이어
        player = this.physics.add.sprite(200, 400, "dude");
        player.body.setSize(70, 50).setOffset(50, 15);

        // player.setBounce(0.2);

        var collideS = this.sound.add("collide");
        itemsound = this.sound.add("item");


        //플레이어 스프라이트 애니메이션
        const anims = this.anims;
        anims.create({
            key: 'rotate3',
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 35
            }),
            frameRate: 25,
            repeat: -1
        });
        console.log(curr);

        //시점이동
        const camera = this.cameras.main;
        cursors = this.input.keyboard.createCursorKeys();

        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //총알 (그냥총알, 위총알, 아래총알)
        bullets = this.physics.add.group();
        bullets.enableBody = true;

        bulletRU = this.physics.add.group();
        bulletRU.enableBody = true;

        bulletRD = this.physics.add.group();
        bulletRD.enableBody = true;

        bulUP = this.physics.add.group();
        bulUP.enablebody = true;

        bulDOWN = this.physics.add.group();
        bulDOWN.enablebody = true;

        outmap1 = this.physics.add.group();
        var Outmap1 = outmap1.create(45004, -100, "outmap1");

        outmap2 = this.physics.add.group();
        var Outmap2 = outmap2.create(45004, 1130, "outmap2");


        moon = this.physics.add.group();
        var moonARR = new Array();
        for (var i = 0; i < 10; i++) {
            var myMoon = moonARR[i];
            myMoon = moon.create(Math.random() * 9000 + 4000, Math.random() * 800, "moon");
            myMoon.body.setSize(myMoon.width - 30, myMoon.height - 30).setOffset(35, 35);
            this.physics.add.collider(player, myMoon, hitMeteo, null, this);
            this.physics.add.collider(bullets, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulUP, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myMoon, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myMoon, hitBullet, null, this);
        }

        saturn = this.physics.add.group(); //1
        var saturnARR = new Array();
        for (var i = 0; i < 10; i++) {
            var mySaturn = saturnARR[i];
            mySaturn = saturn.create(Math.random() * 11000 + 9000, Math.random() * 800, "saturn");
            this.physics.add.collider(player, mySaturn, hitMeteo, null, this);
            this.physics.add.collider(bullets, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulUP, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulletRU, mySaturn, hitBullet, null, this);
            this.physics.add.collider(bulletRD, mySaturn, hitBullet, null, this);
        }

        satellite = this.physics.add.group();
        var satelliteARR = new Array();
        for (var i = 0; i < 10; i++) {
            var mySatellite = satelliteARR[i];
            mySatellite = satellite.create(Math.random() * 5000 + 1000, Math.random() * 800, "satellite");
            this.physics.add.collider(player, mySatellite, hitMeteo, null, this);
            this.physics.add.collider(bullets, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulUP, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulletRU, mySatellite, hitBullet, null, this);
            this.physics.add.collider(bulletRD, mySatellite, hitBullet, null, this);
        }

        planet = this.physics.add.group();
        var planetARR = new Array();
        for (var i = 0; i < 10; i++) {
            var myPlanet = planetARR[i];
            myPlanet = planet.create(Math.random() * 11000 + 1000, Math.random() * 800, "planet");
            this.physics.add.collider(player, myPlanet, hitMeteo, null, this);
            this.physics.add.collider(bullets, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulUP, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myPlanet, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myPlanet, hitBullet, null, this);
        }

        rocket = this.physics.add.group();
        var rocketARR = new Array();
        for (var i = 0; i < 5; i++) {
            var myRocket = rocketARR[i];
            myRocket = rocket.create(Math.random() * 11000 + 5000, Math.random() * 800, "rocket");
            this.physics.add.collider(player, myRocket, hitMeteo, null, this);
            this.physics.add.collider(bullets, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulUP, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myRocket, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myRocket, hitBullet, null, this);
        }


        // moon -> rocket : stage 1 장애물들
        galaxy = this.physics.add.group();
        var galaxyARR = new Array();
        for (var i = 0; i < 25; i++) {
            var myGalaxy = galaxyARR[i]
            myGalaxy = galaxy.create(Math.random() * 14000 + 12000, Math.random() * 800, "galaxy");
            this.physics.add.collider(player, myGalaxy, hitMeteo, null, this);
            this.physics.add.collider(bullets, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulUP, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myGalaxy, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myGalaxy, hitBullet, null, this);
        }

        asteroid = this.physics.add.group();
        var asteroidARR = new Array();
        for (var i = 0; i < 32; i++) {
            var myAsteroid = asteroidARR[i]
            myAsteroid = asteroid.create(Math.random() * 17000 + 14000, Math.random() * 800, "asteroid");
            this.physics.add.collider(player, myAsteroid, hitMeteo, null, this);
            this.physics.add.collider(bullets, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulUP, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myAsteroid, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myAsteroid, hitBullet, null, this);
        }

        comet = this.physics.add.group();
        var cometARR = new Array();
        for (var i = 0; i < 50; i++) {
            var myComet = cometARR[i]
            myComet = comet.create(Math.random() * 20000 + 16000, Math.random() * 100, "comet");
            this.physics.add.collider(player, myComet, hitMeteo, null, this);
            this.physics.add.collider(bullets, myComet, hitBullet, null, this);
            this.physics.add.collider(bulUP, myComet, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myComet, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myComet, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myComet, hitBullet, null, this);
        }

        cute = this.physics.add.group();
        cute2 = this.physics.add.group();
        var cuteARR = new Array();
        var cute2ARR = new Array();
        for (var i = 0; i < 30; i++) {
            var myCute = cuteARR[i]
            myCute = cute.create(Math.random() * 20000 + 11000, Math.random() * 800, "cute");
            this.physics.add.collider(player, myCute, hitMeteo, null, this);
            this.physics.add.collider(bullets, myCute, hitBullet, null, this);
            this.physics.add.collider(bulUP, myCute, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myCute, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myCute, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myCute, hitBullet, null, this);

            var myCute2 = cute2ARR[i];
            myCute2 = cute2.create(Math.random() * 20000 + 11000, Math.random() * 800, "cute2");
            this.physics.add.collider(player, myCute2, hitMeteo, null, this);
            this.physics.add.collider(bullets, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulUP, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myCute2, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myCute2, hitBullet, null, this);
        }


        ufo = this.physics.add.group();
        uranus = this.physics.add.group();
        eclipse = this.physics.add.group();
        astronaut = this.physics.add.group();
        day = this.physics.add.group();

        shoot3 = this.sound.add("shoot3");


        var ufoARR = new Array();
        var uranusARR = new Array();
        var eclipseARR = new Array();
        var astronautARR = new Array();
        var dayARR = new Array();
        for (var i = 0; i < 30; i++) {
            var myUfo = ufoARR[i]
            myUfo = ufo.create(Math.random() * 24000 + 21000, Math.random() * 800, "ufo");
            this.physics.add.collider(player, myUfo, hitMeteo, null, this);
            this.physics.add.collider(bullets, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulUP, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myUfo, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myUfo, hitBullet, null, this);

            var myUranus = uranusARR[i];
            myUranus = uranus.create(Math.random() * 27000 + 23000, Math.random() * 800, "uranus");
            this.physics.add.collider(player, myUranus, hitMeteo, null, this);
            this.physics.add.collider(bullets, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulUP, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myUranus, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myUranus, hitBullet, null, this);

            var myEclipse = uranusARR[i];
            myEclipse = eclipse.create(Math.random() * 30000 + 26000, Math.random() * 800, "eclipse");
            this.physics.add.collider(player, myEclipse, hitMeteo, null, this);
            this.physics.add.collider(bullets, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulUP, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myEclipse, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myEclipse, hitBullet, null, this);

            var myAstronaut = astronautARR[i];
            myAstronaut = astronaut.create(Math.random() * 30000 + 20000, Math.random() * 800, "astronaut");
            this.physics.add.collider(player, myAstronaut, hitMeteo, null, this);
            this.physics.add.collider(bullets, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulUP, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myAstronaut, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myAstronaut, hitBullet, null, this);

            var myDay = dayARR[i];
            myDay = day.create(Math.random() * 30000 + 20000, Math.random() * 800, "day");
            this.physics.add.collider(player, myDay, hitMeteo, null, this);
            this.physics.add.collider(bullets, myDay, hitBullet, null, this);
            this.physics.add.collider(bulUP, myDay, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myDay, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myDay, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myDay, hitBullet, null, this);
        }


        observatory = this.physics.add.group();
        var observatoryARR = new Array();
        for (var i = 0; i < 100; i++) {
            var myObservatory = cometARR[i]
            myObservatory = observatory.create(Math.random() * 35000 + 25000, Math.random() * 1000 + 500, "observatory");
            this.physics.add.collider(player, myObservatory, hitMeteo, null, this);
            this.physics.add.collider(bullets, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulUP, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulDOWN, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulletRU, myObservatory, hitBullet, null, this);
            this.physics.add.collider(bulletRD, myObservatory, hitBullet, null, this);
        }


        star = this.physics.add.group();
        var starARR = new Array();
        for (var i = 0; i < 7; i++) {
            var myStar = starARR[i]
            myStar = star.create(i * 5000 + (Math.random() * 500 + 400), Math.random() * 800, "star");
            this.physics.add.collider(player, myStar, hitItem, null, this);
        }

        //점수 업데이트 및 표시 부분
        timeText = this.add.text(800, 16, 'SCORE : 0', {
            font: '40px monospace',
            fill: '#999'
        }).setScrollFactor(0);
        timeEvent = this.time.addEvent({
            callback: timeDecline,
            callbackScope: this,
            loop: true
        });

        function timeDecline() {
            time++;

            timeText.setText('SCORE : ' + time);
        }

        //총알 개수 표시 부분
        bultext = this.add.text(16, 16, 'Bullet : 0', {
            font: '20px monospace',
            fill: '#999'
        }).setScrollFactor(0);

        lifeText = this.add.text(1400, 16, '♥♥♥', {
            font: '40px monospace',
            fill: '#ff0000'
        }).setScrollFactor(0);

        //하트 충돌 시 목숨 추가
        heart = this.physics.add.group();
        var heart1 = heart.create(5000, Math.random() * 800, "heart");
        var heart2 = heart.create(14000, Math.random() * 800, "heart");
        var heart3 = heart.create(22000, Math.random() * 800, "heart");
        this.physics.add.collider(player, heart1, hitHeart, null, this);
        this.physics.add.collider(player, heart2, hitHeart, null, this);
        this.physics.add.collider(player, heart3, hitHeart, null, this);

        this.physics.add.collider(player, Outmap1, hitEdge2, null, this);
        this.physics.add.collider(player, Outmap2, hitEdge1, null, this);


        function hitHeart(player, heart) {
            itemsound.play();
            life++;
            heart.disableBody(true, true);

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            }
        }

        //플레이어 아이템 충돌함수
        function hitItem(player, star) {
            itemsound.play();
            bulitem += 3;
            bultext.setText('Bullet : ' + bulitem);
            star.disableBody(true, true);
        }

        //총알 장애물 충돌함수
        function hitBullet(bullets, meteo) {
            bullets.disableBody(true, true);
            meteo.disableBody(true, true);
            time += 100;
        }

        //플레이어 장애물 충돌함수
        function hitMeteo(player, meteo) {
            //player.setTint(0xff0000);

            life--;

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                bulitem = 0;
                this.scene.start('Last');
            }

            meteo.setX(Math.random() * 1000 + 600);
            meteo.setY(Math.random() * 500);

            meteo.disableBody(true, true);

            player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 10,
            });
            collideS.play();

        }

        function hitEdge1(player, Outmap) {
            //player.setTint(0xff0000);

            life--;

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                this.scene.start('Last');
            }

            player.setY(400);

            Outmap2 = outmap2.create(45004, 1130, "outmap2");
            this.physics.add.collider(player, Outmap2, hitEdge1, null, this);
            //
            //            Outmap2.setX(45004);
            //            Outmap2.setY(1030);


            // player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
            });
            collideS.play();

        }

        function hitEdge2(player, Outmap1) {
            //player.setTint(0xff0000);

            life--;

            if (life == 5) {
                lifeText.setText('♥♥♥♥♥');
            } else if (life == 4) {
                lifeText.setText('♥♥♥♥');
            } else if (life == 3) {
                lifeText.setText('♥♥♥');
            } else if (life == 2) {
                lifeText.setText('♥♥');
            } else if (life == 1) {
                lifeText.setText('♥');
            } else if (life == 0) {
                ScoreResult = time;
                this.scene.start('Last');
            }

            collideS.play();

     
            player.setY(400);

            Outmap1 = outmap1.create(45004, -100, "outmap1");
            this.physics.add.collider(player, Outmap1, hitEdge2, null, this);

            Outmap1.setX(45004);
            Outmap1.setY(-100);


            // player.anims.play('static', true);
            player.setAlpha(0);
            let tw = this.tweens.add({
                targets: player,
                alpha: 1,
                duration: 100,
                ease: 'Linear',
                repeat: 5,
            });
        }
    },

    update: function () {

        if (!isPlaying1) {
            audio.play();
            isPlaying1 = true;
            textBGM.pause();
            reading.pause();
        }

        console.log();
        player.anims.play('rotate3', true); //360도 회전 반복

        moon.setVelocityY(50);
        moon.setVelocityX(-450);

        planet.setVelocityY(3);
        planet.setVelocityX(-200);

        rocket.setVelocityY(5);
        rocket.setVelocityX(-100);

        satellite.setVelocityY(2);
        satellite.setVelocityX(-300);

        saturn.setVelocityY(1);
        saturn.setVelocityX(-300);


        star.setVelocityY(0);





        if (player.x > 10000) {
            galaxy.setVelocityY(0);
            galaxy.setVelocityX(-300);

            asteroid.setVelocityY(50);
            asteroid.setVelocityX(-350);

            comet.setVelocityY(70);
            comet.setVelocityX(-450);

            cute.setVelocityY(0);
            cute.setVelocityX(-350);

            cute2.setVelocityY(0);
            cute2.setVelocityX(-150);
        }

        if (player.x > 20000) {
            ufo.setVelocityY(24);
            ufo.setVelocityX(-350);

            uranus.setVelocityY(-10);
            uranus.setVelocityX(-450);

            eclipse.setVelocityY(-50);
            eclipse.setVelocityX(-500);

            astronaut.setVelocityY(1);
            astronaut.setVelocityX(-200);

            day.setVelocityY(2);
            day.setVelocityX(-300);

            observatory.setVelocityY(-50);
            observatory.setVelocityX(-450);

        }


        //총알 쏘는 부분
        if (cursors.space.isDown && bulitem > 0) {
            bulcnt++;
            shoot3.play();
        } else {
            bulcnt = 0;
        }

        if (bulcnt == 1 && bulitem > 0) {
            if (cursors.right.isDown && cursors.down.isDown) {
                bulletRD.create(player.x + 40, player.y, "bullet3RD");
                bulletRD.setVelocityX(1800);
                bulletRD.setVelocityY(1300);
            } else if (cursors.right.isDown && cursors.up.isDown) {
                bulletRU.create(player.x + 40, player.y, "bullet3RU");
                bulletRU.setVelocityX(1800);
                bulletRU.setVelocityY(-1300);
            } else if (cursors.up.isDown) {
                bulUP.create(player.x + 40, player.y, "bullet3Up");
                bulUP.setVelocityX(100);
                bulUP.setVelocityY(-1300);
            } else if (cursors.down.isDown) {
                bulDOWN.create(player.x + 40, player.y, "bullet3Down");
                bulDOWN.setVelocityX(100);
                bulDOWN.setVelocityY(1300);
            } else {
                bullets.create(player.x + 40, player.y, "bullet3");
                bullets.setVelocityX(1800);
            }

            bulitem--;
            bultext.setText('Bullet : ' + bulitem);
        }

        //플레이어 조종부분
        if (cursors.right.isDown) {
            player.setVelocityX(530);
            if (cursors.down.isDown) {
                player.setVelocityY(430);
            } else if (cursors.up.isDown) {
                player.setVelocityY(-430);
            } else {
                player.setVelocityY(0);
            }
        } else if (cursors.down.isDown) {
            player.setVelocityY(430);
        } else if (cursors.up.isDown) {
            player.setVelocityY(-430);
        } else {
            player.setVelocityX(150);
            player.setVelocityY(0);
        }
    },
});

var diesound;

var Last = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function Last() {
        Phaser.Scene.call(this, {
            key: 'Last'
        });
    },
    preload: function () {
        this.load.image("tiles", "space_tileset.png");
        this.load.image('gameover', 'gameover.png');
        this.load.image('restart', 'restart.png');
        this.load.image('quit', 'quit.png');
        this.load.tilemapCSV("basicmap", "basicMap.csv");
        this.load.audio("die", ["diesound.wav"]);
    },
    create: function () {
        const basicmap = this.make.tilemap({
            key: "basicmap",
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset = basicmap.addTilesetImage("tiles");
        const layer = basicmap.createStaticLayer(0, tileset, 0, 0);
        this.add.image(825, 300, 'gameover');

        diesound = this.sound.add("die");
        diesound.play();

        var restart = this.add.image(200, 750, 'restart');
        restart.setInteractive();
        restart.once('pointerup', function () {
            life = 3;
            bullet = 0;
            this.scene.start('Choice');
        }, this);

        var quit = this.add.image(1450, 750, 'quit');
        quit.setInteractive();
        quit.once('pointerup', function () {
            this.scene.start('Menu');
        }, this);

        scoreText = this.add.text(700, 350, 'Your Score : ', {
            font: '50px Arial',
            fill: '#fff'
        }).setScrollFactor(0);
        scoreText.setText('Your Score : ' + ScoreResult);

    },
    update: function () {
        audio.pause();
        isPlaying1 = false;

        time = 0;
    }
});


var config = {
    type: Phaser.AUTO,
    width: 1650,
    height: 900,
    parent: 'phaser-example',
    //pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: [Menu, HowToPlay, Typing, Choice, Scene1, Scene2, Scene3, Last]
};

var game = new Phaser.Game(config);
