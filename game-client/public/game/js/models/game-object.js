class GameObject {

    constructor(params) {

        this.hp = params.hp;
        this.sp = params.sp;
        this.maxHp = params.maxHp;
        this.maxSp = params.maxSp;
        this.offsetTop = params.offsetTop;
        this.offsetLeft = params.offsetLeft;

        this.moveStrength = params.moveStrength;
        this.status = {};
        this.status.die    = false; // Мертвый или живой (только для "живых" объектов)
        this.status.pickUp = false; // Взять и положить в инвентарь
        this.name = params.name;

        console.log('params FROM game-object');
        console.log(params);

    }
    
    // передвижение в направлении N S W E NE NW SE SW
    move(params) {
        socket.emit('move', {
            offsetLeft  : params.offsetLeft,
            offsetTop   : params.offsetTop,
            direction   : params.direction,
            index       : this.name
        });
    }
}