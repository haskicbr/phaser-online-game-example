class Player extends GameObject {

    constructor(params) {

        params.moveStrength = 4;

        super(params);

        this.hp = params.hp;
        this.sp = params.sp;
        this.maxHp = params.maxHp;
        this.maxSp = params.maxSp;
        this.offsetTop = params.offsetTop;
        this.offsetLeft = params.offsetLeft;

        this.getParams = function () {
            return {
                hp: this.hp,
                sp: this.sp,
                maxHp: this.maxHp,
                maxSp: this.maxSp,
                offsetTop: this.offsetTop,
                offsetLeft: this.offsetLeft
            }
        };

        this.style = {font: "24px Arial", fill: "#a73939", align: "center"};
        this.barTextStyle = {font: "16px Arial", fill: "#ffffff", align: "center"};

        this.init = function () {

            this.sprite = game.add.sprite(this.offsetLeft, this.offsetTop, 'girl');
            this.sprite.name = params.name;
            this.sprite.inputEnabled = true;

            // BEGIN ANIMATION BLOCK //
            this.sprite.animations.add('MOVE_RIGHT', [0, 1, 2, 3, 4], 7, true);
            this.sprite.animations.add('MOVE_DOWN', [24, 25, 26, 27, 28], 7, true);
            this.sprite.animations.add('MOVE_LEFT', [48, 49, 50, 51, 52], 7, true);
            this.sprite.animations.add('MOVE_UP', [72, 73, 74, 75, 76], 7, true);
            // END ANIMATION BLOCK //
            var pa = this;

            this.sprite.events.onInputDown.add(function (e) {


                //this.say('click click click');
                //this.damage(10);
                //this.sprite.destroy();

                socket.emit('damage', {});

            }, this);

            this.sprite.events.onInputOver.add(function (e) {

            }, this);

            this.sprite.events.onInputUp.add(function (e) {

            }, this);

            this.sprite.events.onInputOut.add(function (e) {

            }, this);


            //this.sprite.animations.add('TEST', [0, 1, 2], 10, true);
            //this.sprite.scale.setTo(0.5, 0.5);

            game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            //this.sprite.body.velocity[0] = 0; this.sprite.body.velocity[1] = 0;
            /*
             ДОБАВЛЕНИЕ СВОИХ ПОЛИГОНОВ ДЛЯ ФИЗИКИ ИЗ ФАЙЛА
             this.sprite.body.clearShapes();
             this.sprite.body.loadPolygon('physicsData', 'fileName');
             //in the main.js
             game.load.physics('physicsData', '/2d/js/data.json');
             */
        };


        this.idle = function () {

        };


        this.die = function (message) {
            var t = game.add.text(600/*game.world.centerX*/, 600, message, this.style);
            t.fixedToCamera = true;
            //game.pause();
        };

        this.damage = function (damage) {
            this.hp -= damage;

            if (this.hp <= 0) {
                //
                this.status.die = true;
                //this.die(' you die :\'(');

                this.say('soorry i\'m die');


                //todo animation die
                //this.sprite.destroy();
                //delete this;
            }

            if (this.bar) {
                this.bar.update(this.getParams());
            }
        };

        this.tired = function (tired) {
            this.sp -= tired;

            if (this.sp <= 0) {
                this.sp = 0;
            }

            if (this.bar) {
                this.bar.update(this.getParams());
            }
        };

        this.say = function (message) {

            if (this.obstacleGroup) {

                console.clear();
                console.dir(this.obstacleGroup);
                this.obstacleGroup.destroy();
            }

            this.obstacleGroup = game.add.group();

            //this.sayWindow = game.add.graphics(0,0,this.obstacleGroup);
            //this.sayWindow.lineStyle(3, 0x222, 1);
            //this.sayWindow.beginFill(0x67cab3, 1);
            //
            //this.sayWindow.drawRect(this.sprite.x - this.sprite.width/2 - 50, this.sprite.y - this.sprite.height/2,200, 20);
            //this.sayWindow.endFill();
            ////this.sayWindow.fixedToCamera = true;
            ////
            //console.log(this.sprite.y);

            this.sayWindow = game.add.text(this.sprite.x - 90, this.sprite.y - this.sprite.height / 2, message, {
                font: "16px Arial",
                fill: "#ffffff",
                align: "center"
            }, this.obstacleGroup);
            //this.sayWindow.fixedToCamera = true;
        };

        //if (params.name == 'currentPlayer') {
        //    this.bar = new BAR(this.getParams());
        //}

        this.init();
    }

    animation(params) {

        if (typeof params.direction != 'undefined') {

            switch (params.direction) {
                case 'S' :
                    this.sprite.animations.play('MOVE_DOWN', 6);
                    break;
                case "N" :
                    this.sprite.animations.play('MOVE_UP', 6);
                    break;
                case "W" :
                    this.sprite.animations.play('MOVE_LEFT', 6);
                    break;
                case "E" :
                    this.sprite.animations.play('MOVE_RIGHT', 6);
                    break;
            }

            this.stopAnimation(100);
        }
    }

    stopAnimation(ms) {

        var sprite = this.sprite;

        if (typeof (this.stopAnimationTimer) != 'undefined') {
            clearInterval(this.stopAnimationTimer);
        }

        this.stopAnimationTimer = setTimeout(function () {

            sprite.animations.stop();
            console.log('clear animation');
        }, ms);

        console.log('inti stop animation');
    }

    move(params) {

        super.move(params);

        this.animation(params);
    }

}



