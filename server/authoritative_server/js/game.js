class Player {
    constructor(physics){
        var x = Phaser.Math.RND.between(40,216);
        var y = Phaser.Math.RND.between(41,135);
        this.color  = Phaser.Math.RND.between(0,16);
        this.weapon = physics.add.sprite(x, y, 'swords');
        this.body   = physics.add.sprite(x, y, 'dude');
        //this.player.weapon.setScale(0.8);
        //this.player.body.setScale(0.8);
        this.body.anim = 'down';
        this.body.player = this;
        this.weapon.player = this;
        this.lock = false;
        this.playerInput = {left:false,up:false,right:false,down:false,space:false};
        this.maxInventory = 5;
        this.inventory = [];
    }
}

class Item {
    constructor(physics,itemID,itemType=null){
        var x = -1000;
        var y = -1000;
        this.body = physics.add.sprite(x, y, 'items');
        this.body.setActive(false).setVisible(false);
        this.body.itemType = (itemType==null ? Phaser.Math.RND.between(0,23) : itemType);
        this.body.itemID = itemID;
        this.body.anims.play('item-'+Number(this.body.itemType).toString(),false);
    }
}

class Monster {
    constructor(physics,itemType){
        this.body = physics.add.sprite(
            Phaser.Math.RND.between(38,config.width-38),
            Phaser.Math.RND.between(38,config.height-38),
            'octorock'
        );
        //this.body.setScale(0.8);
        this.body.anims.play('octorock-down',true);
        this.body.anim = 'down';
        this.body.item = itemType;
    }
}

class Room1 extends Phaser.Scene {
    constructor(){
        super({ key: 'Room1', active: true })
    }

    preload(){
        this.load.image('tileset','assets/tileset.png')
        this.load.tilemapCSV("level0", "assets/level00.csv");
        this.load.tilemapCSV("level1", "assets/level01.csv");
        this.load.tilemapCSV("level2", "assets/level2.csv");
        this.load.spritesheet('items', 'assets/items.png', { frameWidth: 8, frameHeight: 16 });
        this.load.spritesheet('swords', 'assets/swords.png', { frameWidth: 16, frameHeight: 7 });
        this.load.spritesheet('dude', 'assets/spritesheet.png', { frameWidth: 16, frameHeight: 18 });
        this.load.spritesheet('octorock', 'assets/octorock.png', { frameWidth: 16, frameHeight: 18 });
    }

    create(){

        this.map = this.make.tilemap({ key: "level0", tileWidth: 8, tileHeight: 8 });
        this.map1 = this.make.tilemap({ key: "level0", tileWidth: 8, tileHeight: 8 });
        this.map2 = this.make.tilemap({ key: "level1", tileWidth: 8, tileHeight: 8 });
        this.tiles = this.map.addTilesetImage("tileset");
        this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);

        this.timer = 90+.9 // the +.9 is to ensure the first second doesn't tick too quickly

        // create animations for all four cardinal directions
        var cardinalTxt = ['down','right','up','left']
        for( var c=0 ; c < cardinalTxt.length ; c++ ){

            this.anims.create({
                key: cardinalTxt[c],
                frames: this.anims.generateFrameNumbers('dude', { start: c*2, end: c*2+1 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: cardinalTxt[c]+'Attack',
                frames: [{'key':'dude','frame':8+c,'duration':495},
                         {'key':'dude','frame':c*2,'duration':5}],
            });

        }
        this.anims.create({
            key: 'octorock-down',
            frames: this.anims.generateFrameNumbers('octorock',{start:0, end:1}),
            frameRate: 2,
            repeat: -1
        })
        this.anims.create({
            key: 'octorock-dying',
            frames: this.anims.generateFrameNumbers('octorock',{start:2, end:3}),
            frameRate: 6,
            repeat: 0
        })
        for( var i=0; i < 24; i++ ){
            this.anims.create({
                key: 'item-'+Number(i).toString(),
                frames: [{'key':'items','frame':i,'duration':1000}],
            });
        }

        this.players  = {};
        this.items = Array(10).fill().map( (_,i) => new Item(this.physics,i) );
        this.monsters = Array(10).fill().map( (_,i) => new Monster(this.physics,i) );

        this.monsters.forEach( monster => {
            this.physics.add.collider(monster.body, this.layer);
        });
        this.map.setCollision([0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123])

        this.x = 0;

        var _this = this; // used to inject this.player into io.on's scope
        io.on('connection', function(socket) {
            console.log('a user connected');

            _this.players[socket.id] = new Player(_this.physics)
            Object.values(_this.players).forEach( player => {
                _this.physics.add.collider(player.body, _this.layer);
                Object.values(_this.players).forEach( player2 => {
                    if(player!=player2){
                        _this.physics.add.collider(player.weapon,player2.body,_this.playerHit,null,_this);
                    }
                });
                _this.monsters.forEach( monster => {
                    _this.physics.add.collider(player.weapon,monster.body,_this.monsterKill,null,_this);
                });
                _this.items.forEach( item => {
                    _this.physics.add.overlap(player.body,item.body,_this.itemPickup,null,_this);
                });
            });

            socket.on('playerInput', function(inputData) {
                _this.players[socket.id].playerInput = inputData;
            });
            socket.on('disconnect', function() {
                players[socket.id].destroy();
                delete _this.players[socket.id];
                // global.gc();
            });
        });

        this.map.putTilesAt(this.map1.layers[0].data,0,0);
            
        // // top door
        // for(var x=13;x<19;x++){
        //     for(var y=0;y<4;y++){
        //         this.map.putTileAt(this.map2.layers[0].data[y][x].index,x,y,true);        
        //     }
        // }
        // // left door
        // for(var x=0;x<4;x++){
        //     for(var y=9;y<15;y++){
        //         this.map.putTileAt(this.map2.layers[0].data[y][x].index,x,y,true);        
        //     }
        // }
        // // right door
        // for(var x=28;x<32;x++){
        //     for(var y=9;y<15;y++){
        //         this.map.putTileAt(this.map2.layers[0].data[y][x].index,x,y,true);        
        //     }
        // }
        // // bottom door
        // for(var x=13;x<19;x++){
        //     for(var y=18;y<22;y++){
        //         this.map.putTileAt(this.map2.layers[0].data[y][x].index,x,y,true);        
        //     }
        // }

    }

    update(){

        if(this.timer>0){
            this.timer -= .03;

            Object.values(this.players).forEach( player => this.playerMove(player) );

            Object.keys(this.players).forEach( id => {
                io.to(`${id}`).emit("playerUpdate", Object.values(this.players).map( player => {
                    return {
                        body : {
                            x     : player.body.x,
                            y     : player.body.y,
                            anim  : player.anim,
                            color : player.color,
                        },
                        weapon : {
                            x      : player.weapon.x,
                            y      : player.weapon.y,
                            angle  : player.weapon.angle,
                            active : player.weapon.active,
                        },
                        inventory : player.inventory.map( itemID => this.items[itemID].itemType ),
                    }
                })); //TODO; use this instead, and filter() by dungeon room
            });
            Object.keys(this.players).forEach( id => {
                io.to(`${id}`).emit("inventoryUpdate", 
                    this.players[id].inventory.map( itemID => this.items[itemID].body.itemType )
                );
            });
            Object.values(this.players).forEach( player => {
                player.playerInput = {left:false,up:false,right:false,down:false,space:false}; // reset
            });

            io.emit("monsterUpdate", this.monsters.map( monster => {
                return {
                    x    : monster.body.x,
                    y    : monster.body.y,
                    anim : monster.body.anim,
                } 
            }));

            io.emit("itemUpdate", this.items.map( item => {
                return {
                    x      : item.body.x,
                    y      : item.body.y,
                    type   : item.body.itemType,
                    active : item.body.active,
                } 
            }));

            io.emit("timerUpdate", { timer: Math.floor(this.timer) } );

            Object.values(this.players).forEach( player => {
                this.physics.world.wrap(player.body);
            });
            // if this.player.body.x > config.width: // TODO: player going through doors

        // if (left !== this.leftKeyPressed || right !== this.rightKeyPressed || up !== this.upKeyPressed) {
        //   this.socket.emit('playerInput', { left: this.leftKeyPressed , right: this.rightKeyPressed, up: this.upKeyPressed });
        // }

        }
        else { // this.timer<=0
            this.timer = -1;
            io.emit("done", "done");
            Object.values(this.players).forEach( player => {
                player.body.setVelocityX(0);
                player.body.setVelocityY(0);
                player.body.anims.play('down', false);
                player.anim = 'stop';
                player.direction = 'down';
            }) ;
            this.monsters.map( monster => {this.monsterKill({active:true},monster.body);} );

            Object.keys(this.players).forEach( id => {
                io.to(`${id}`).emit("playerUpdate", Object.values(this.players).map( player => {
                    return {
                        body : {
                            x     : player.body.x,
                            y     : player.body.y,
                            anim  : player.anim,
                            color : player.color,
                        },
                        weapon : {
                            x      : player.weapon.x,
                            y      : player.weapon.y,
                            angle  : player.weapon.angle,
                            active : player.weapon.active,
                        },
                        inventory : player.inventory.map( itemID => this.items[itemID].itemType ),
                    }
                })); //TODO; use this instead, and filter() by dungeon room
            });

            io.emit("monsterUpdate", this.monsters.map( monster => {
                return {
                    x    : monster.body.x,
                    y    : monster.body.y,
                    anim : monster.body.anim,
                } 
            }));

        }

    }

    playerMove(player,speed=50){

        if(player.playerInput.space){
            if(!player.lock){
                player.body.setVelocityX(0);
                player.body.setVelocityY(0);
                player.lock = true;
                player.anim = player.direction+'Attack';
                player.body.anims.play(player.direction+'Attack', false)
                                .once('animationcomplete',function(anim,frame){
                                    if( anim.key.slice(anim.key.length-6,anim.key.length)=='Attack' ){
                                        player.anim = player.direction;
                                        player.lock=false;
                                    }
                                },this);
            }
        }
        else if(player.playerInput.left){
            if(!player.lock){
                player.body.setVelocityX(-speed);
                player.body.setVelocityY(0);
                player.body.anims.play('left', true);
                player.anim = player.direction = 'left';
            }
        }
        else if(player.playerInput.up){
            if(!player.lock){
                player.body.setVelocityX(0);
                player.body.setVelocityY(-speed);
                player.body.anims.play('up', true);
                player.anim = player.direction = 'up';
            }
        }
        else if(player.playerInput.right){
            if(!player.lock){
                player.body.setVelocityX(speed);
                player.body.setVelocityY(0);
                player.body.anims.play('right', true);
                player.anim = player.direction = 'right';
            }
        }
        else if(player.playerInput.down){
            if(!player.lock){
                player.body.setVelocityX(0);
                player.body.setVelocityY(speed);
                player.body.anims.play('down', true);
                player.anim = player.direction = 'down';
            }
        }
        else{
            if(!player.lock){
                player.body.setVelocityX(0);
                player.body.setVelocityY(0);
                player.body.anims.stop(0);
                player.anim = 'stop';
            }
        }

        if(player.anim=="rightAttack"){
            player.weapon.setActive(true).setVisible(true)
            player.weapon.x = player.body.x+10;
            player.weapon.y = player.body.y+2;
            player.weapon.setAngle(0)
            player.weapon.active = true;
            player.weapon.direction = "right"
        }
        else if(player.anim=="leftAttack"){
            player.weapon.setActive(true).setVisible(true)
            player.weapon.x = player.body.x-10;
            player.weapon.y = player.body.y+2;
            player.weapon.setAngle(180)
            player.weapon.active = true;
            player.weapon.direction = "left"
        }
        else if(player.anim=="upAttack"){
            player.weapon.setActive(true).setVisible(true)
            player.weapon.x = player.body.x;
            player.weapon.y = player.body.y-10;
            player.weapon.setAngle(270)
            player.weapon.active = true;
            player.weapon.direction = "up"
        }
        else if(player.anim=="downAttack"){
            player.weapon.setActive(true).setVisible(true)
            player.weapon.x = player.body.x;
            player.weapon.y = player.body.y+10;
            player.weapon.setAngle(90)
            player.weapon.active = true;
            player.weapon.direction = "down"
        }
        else{
            player.weapon.setActive(false).setVisible(false)
            player.weapon.active = false;
        }
    }

    playerHit(weapon,player_body){

        if(weapon.active){

            // player knockback
            if( weapon.direction == 'up' ){
                player_body.y -= 25;
            }
            else if( weapon.direction == 'down' ){
                player_body.y += 25;
            }
            else if( weapon.direction == 'left' ){
                player_body.x -= 25;
            }
            else if( weapon.direction == 'right' ){
                player_body.x += 25;
            }

            // drop an item
            if( player_body.player.inventory.length > 0 ){
                var item = player_body.player.inventory.pop();
                weapon.player.inventory.push(item);
                //this.items[item].body.x = player_body.x;
                //this.items[item].body.y = player_body.y;
                //this.items[item].body.setActive(true).setVisible(true);
            }
        }
    }

    monsterKill(weapon,monster_body){
        if(weapon.active){
            if(monster_body.anim != 'dead'){ // don't resurrect the dead!
                monster_body.anim = 'dying'; // commence dying for the client
            }
            monster_body.anims.play('octorock-dying',true)
                            .once('animationcomplete', (anim,frame) =>{
                                if(anim.key=='octorock-dying' & monster_body.active){
                                    
                                    // remover monster
                                    monster_body.setActive(false).setVisible(false);
                                    monster_body.anim = 'dead';

                                    // drop an item if you have one
                                    if(monster_body.item !== null){
                                        this.items[monster_body.item].body.x = monster_body.x;
                                        this.items[monster_body.item].body.y = monster_body.y;
                                        this.items[monster_body.item].body.setActive(true).setVisible(true);
                                    }
                                }
                            },this);
        }
    }

    itemPickup(player_body,item_body){
        if( player_body.player.inventory.length < player_body.player.maxInventory ){
            if( !player_body.player.inventory.includes( item_body.itemID ) ){
                player_body.player.inventory.push( item_body.itemID );
                item_body.x = -1000;
                item_body.y = -1000;
                item_body.setActive(false).setVisible(false);
            }
        }
    }
}

var config = {
    type: Phaser.HEADLESS,
    width: 256,
    height: 175,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Room1],
    autoFocus: false
  };

const game = new Phaser.Game(config);
window.gameLoaded();
