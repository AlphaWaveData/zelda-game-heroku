// This is for Live or Testnet
web3 = new Web3(web3.currentProvider);
ethereum.enable();

// This is for testing on local blockchain
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));


var marketplaceAbi = [
  {
    "inputs": [
      {
        "internalType": "contract IERC1155",
        "name": "token",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "buyTokens",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "onERC1155Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
  
var tokenAbi = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "_ids",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "_values",
        "type": "uint256[]"
      }
    ],
    "name": "TransferBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "TransferSingle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_value",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "URI",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ERC1155_BATCH_RECEIVED",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ERC1155_RECEIVED",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_owners",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_ids",
        "type": "uint256[]"
      }
    ],
    "name": "balanceOfBatch",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_initialSupply",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "create",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creators",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_to",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_quantities",
        "type": "uint256[]"
      }
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "nonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "_ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_values",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "setURI",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "_interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
  
var token = new web3.eth.Contract(tokenAbi, "0xC117C279cCCBC8eB08932fb8e3Ca5Ae7681d9fE7");
var marketplace = new web3.eth.Contract(marketplaceAbi, "0xcCC7FEe03e8D3590aef811B096Bd2BB3A349b763");
  
function getUserItems(callback){
  web3.eth.getAccounts().then(accountArray => {
    var account = accountArray[0];

    // This is for testing on local blockchain
    // var account = "0x01a9523f8660e06510323bb137830243c0552ada";

    var tokenPromise1 = token.methods.balanceOf(account, 1).call();
    var tokenPromise2 = token.methods.balanceOf(account, 2).call();
    var tokenPromise3 = token.methods.balanceOf(account, 3).call();
    var tokenPromise4 = token.methods.balanceOf(account, 4).call();
    var tokenPromise5 = token.methods.balanceOf(account, 5).call();
    var tokenPromise6 = token.methods.balanceOf(account, 6).call();
    var tokenPromise7 = token.methods.balanceOf(account, 7).call();
    var tokenPromise8 = token.methods.balanceOf(account, 8).call();
    var tokenPromise9 = token.methods.balanceOf(account, 9).call();
    var tokenPromise10 = token.methods.balanceOf(account, 10).call();
    var tokenPromise11 = token.methods.balanceOf(account, 11).call();
    var tokenPromise12 = token.methods.balanceOf(account, 12).call();
    var tokenPromise13 = token.methods.balanceOf(account, 13).call();
    var tokenPromise14 = token.methods.balanceOf(account, 14).call();
    var tokenPromise15 = token.methods.balanceOf(account, 15).call();
    var tokenPromise16 = token.methods.balanceOf(account, 16).call();
    var tokenPromise17 = token.methods.balanceOf(account, 17).call();
    var tokenPromise18 = token.methods.balanceOf(account, 18).call();
    var tokenPromise19 = token.methods.balanceOf(account, 19).call();
    var tokenPromise20 = token.methods.balanceOf(account, 20).call();
    var tokenPromise21 = token.methods.balanceOf(account, 21).call();
    var tokenPromise22 = token.methods.balanceOf(account, 22).call();
    var tokenPromise23 = token.methods.balanceOf(account, 23).call();
    var tokenPromise24 = token.methods.balanceOf(account, 24).call();
    var tokenPromise25 = token.methods.balanceOf(account, 25).call();
    var tokenPromise26 = token.methods.balanceOf(account, 26).call();

    Promise.all([tokenPromise1, tokenPromise2, tokenPromise3,
                tokenPromise4, tokenPromise5, tokenPromise6,
                tokenPromise7, tokenPromise8, tokenPromise9,
                tokenPromise10, tokenPromise11, tokenPromise12,
                tokenPromise13, tokenPromise14, tokenPromise15,
                tokenPromise16, tokenPromise17, tokenPromise18,
                tokenPromise19, tokenPromise20, tokenPromise21,
                tokenPromise22, tokenPromise23, tokenPromise24,
                tokenPromise25, tokenPromise26]).then(values => {
      console.log(values);
      if(values[0] > 0)
        console.log("User has item 1");
      if(values[1] > 0)
        console.log("User has item 2");
      if(values[2] > 0)
        console.log("User has item 3");
      if(values[3] > 0)
        console.log("User has item 4");
      if(values[4] > 0)
        console.log("User has item 5");
      if(values[5] > 0)
        console.log("User has item 6");
      if(values[6] > 0)
        console.log("User has item 7");
      if(values[7] > 0)
        console.log("User has item 8");
      if(values[8] > 0)
        console.log("User has item 9");
      if(values[9] > 0)
        console.log("User has item 10");
      if(values[10] > 0)
        console.log("User has item 11");
      if(values[11] > 0)
        console.log("User has item 12");
      if(values[12] > 0)
        console.log("User has item 13");
      if(values[13] > 0)
        console.log("User has item 14");
      if(values[14] > 0)
        console.log("User has item 15");
      if(values[15] > 0)
        console.log("User has item 16");
      if(values[16] > 0)
        console.log("User has item 17");
      if(values[17] > 0)
        console.log("User has item 18");
      if(values[18] > 0)
        console.log("User has item 19");
      if(values[19] > 0)
        console.log("User has item 20");
      if(values[20] > 0)
        console.log("User has item 21");
      if(values[21] > 0)
        console.log("User has item 22");
      if(values[22] > 0)
        console.log("User has item 23");
      if(values[23] > 0)
        console.log("User has item 24");
      if(values[24] > 0)
        console.log("User has item 25");
      if(values[25] > 0)
        console.log("User has item 26");

      callback();

    });
  });
}

function buy(id){

  web3.eth.getAccounts().then(accountArray => {
    var options = {
      from: accountArray[0],
      value: 0
    };

    // This is for testing on local blockchain
    // var options = {
    //     from: "0x01a9523f8660e06510323bb137830243c0552ada",
    //     value: 0
    // };

    if(id == 1)
        options.value = 100000000000000;
    else if(id == 2)
        options.value = 100000000000000;
    else if(id == 3)
        options.value = 100000000000000;
    else if(id == 4)
        options.value = 100000000000000;
    else if(id == 5)
        options.value = 100000000000000;
    else if(id == 6)
        options.value = 100000000000000;
    else if(id == 7)
        options.value = 100000000000000;
    else if(id == 8)
        options.value = 100000000000000;
    else if(id == 9)
        options.value = 100000000000000;
    else if(id == 10)
        options.value = 100000000000000;
    else if(id == 11)
        options.value = 100000000000000;
    else if(id == 12)
        options.value = 100000000000000;
    else if(id == 13)
        options.value = 100000000000000;
    else if(id == 14)
        options.value = 100000000000000;
    else if(id == 15)
        options.value = 100000000000000;
    else if(id == 16)
        options.value = 100000000000000;
    else if(id == 17)
        options.value = 100000000000000;
    else if(id == 18)
        options.value = 100000000000000;
    else if(id == 19)
        options.value = 100000000000000;
    else if(id == 20)
        options.value = 100000000000000;
    else if(id == 21)
        options.value = 100000000000000;
    else if(id == 22)
        options.value = 100000000000000;
    else if(id == 23)
        options.value = 100000000000000;
    else if(id == 24)
        options.value = 100000000000000;
    else if(id == 25)
        options.value = 100000000000000;
    else if(id == 26)
        options.value = 100000000000000;

    marketplace.methods.buyTokens(id).send(options)
    // .on('receipt', receipt => {
    //     alert("Transaction Complete");
    // });
  });

}


class Player {
    constructor(physics){
        this.weapon = physics.add.sprite(0, 0, 'swords');
        this.body   = physics.add.sprite(0, 0, 'dude');
        //this.player.weapon.setScale(0.8);
        //this.player.body.setScale(0.8);
        this.body.anim = 'down';
        this.body.setActive(false).setVisible(false);
    }
}

class Item {
    constructor(physics){
        var x = -1000;
        var y = -1000;
        this.itemType = null;
        this.body = physics.add.sprite(x, y, 'items');
        this.body.setActive(false).setVisible(false);
    }
    setType(newType){
        if(this.itemType!=newType){
            this.itemType = newType;
            this.body.anims.play('item-'+Number(newType).toString(),false);
        }
    }
}

class InventoryItem {
    constructor(physics,which){
        var x = 20+which*20;
        var y = 180;
        this.body = physics.add.sprite(x, y, 'items');
        this.setType(null);
    }
    setType(newType){
        if(newType !== null){
            this.body.itemType = newType;
            this.body.setActive(true).setVisible(true);
            this.body.anims.play('item-'+Number(this.body.itemType).toString(),false);
        }
        else{
            this.body.setActive(false).setVisible(false);
            this.body.itemType = null;
        }
    }
}

class Monster {
    constructor(physics){
        this.body = physics.add.sprite(0,0,'octorock');
        //this.body.setScale(0.8);
        this.body.anims.play('octorock-down',true);
        this.body.anim = 'down';
    }
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}

class Room1 extends Phaser.Scene {
    constructor(){
        super({ key: 'Room1', active: true })
    }

    preload()
    {
        this.load.image('tileset','assets/tileset.png')
        this.load.image('controller','assets/controller.png');
        this.load.tilemapCSV("level0", "assets/level00.csv");
        this.load.tilemapCSV("level1", "assets/level01.csv");
        this.load.tilemapCSV("level2", "assets/level2.csv");
        this.load.spritesheet('items', 'assets/items.png', { frameWidth: 8, frameHeight: 16 });
        this.load.spritesheet('swords', 'assets/swords.png', { frameWidth: 16, frameHeight: 7 });
        this.load.spritesheet('dude', 'assets/spritesheet.png', { frameWidth: 16, frameHeight: 18 });
        this.load.spritesheet('octorock', 'assets/octorock.png', { frameWidth: 16, frameHeight: 18 });

        loadWeb3();
    }

    create()
    {
        //console.log(window.Web3);
        this.socket = io();

        this.map = this.make.tilemap({ key: "level0", tileWidth: 8, tileHeight: 8 });
        this.map1 = this.make.tilemap({ key: "level0", tileWidth: 8, tileHeight: 8 });
        this.map2 = this.make.tilemap({ key: "level1", tileWidth: 8, tileHeight: 8 });
        this.tiles = this.map.addTilesetImage("tileset");
        this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);
    
        // create the countdown timer text
        this.timerText = this.add.text(220, 170, '', { font: '32px Courier Bold', fill: '#88ff88' });

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

        this.items = Array(10).fill().map( _ => new Item(this.physics) );
        this.inventoryItems = Array(10).fill().map( (_,i) => new InventoryItem(this.physics,i) );
        this.players = Array(100).fill().map( _ => new Player(this.physics) );
        this.monsters = Array(10).fill().map( _ => new Monster(this.physics) );

        this.cameras.main.setBounds(0,0,1000,1000);

        this.players.forEach( player => {
            this.physics.add.collider(player.body, this.layer);
        });
        this.monsters.forEach( monster => {
            this.physics.add.collider(monster.body, this.layer);
            this.players.forEach( player => {
                this.physics.add.collider(player.weapon,monster.body,this.monsterKill,null,this);
            });
        });
        this.map.setCollision([0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123])

        this.cursors = this.input.keyboard.createCursorKeys();
        this.x = 0;

        var _this = this; // used to inject this.player into this.socket.on's scope
        this.socket.on('playerUpdate', function(playerInfo) {
            _this.players.forEach( player => { // clean out all players
                player.body.setActive(false).setVisible(false);
                player.weapon.setActive(false).setVisible(false);
            });
            for( var p=0 ; p<playerInfo.length ; p++ ){
                _this.players[p].body.setActive(true).setVisible(true);
                _this.players[p].body.setPosition(playerInfo[p].body.x,playerInfo[p].body.y);
                _this.players[p].body.anim = playerInfo[p].body.anim;
                //_this.players[p].body.setTintFill(playerInfo[p].body.color);
                _this.players[p].weapon.setAngle(playerInfo[p].weapon.angle);
                _this.players[p].weapon.setPosition(playerInfo[p].weapon.x,playerInfo[p].weapon.y);
                _this.players[p].weapon.setActive(playerInfo[p].weapon.active).setVisible(playerInfo[p].weapon.active);
            }
        });
        this.socket.on('monsterUpdate', function(monsterInfo) {
            for( var m=0 ; m<monsterInfo.length ; m++ ){
                _this.monsters[m].body.setPosition(monsterInfo[m].x,monsterInfo[m].y);
                _this.monsters[m].body.anim = monsterInfo[m].anim;
            }
        });
        this.socket.on('itemUpdate', function(itemInfo) {
            for( var i=0 ; i<itemInfo.length ; i++ ){
                _this.items[i].body.setPosition(itemInfo[i].x,itemInfo[i].y);
                _this.items[i].body.setActive(itemInfo[i].active).setVisible(itemInfo[i].active);
                _this.items[i].setType(itemInfo[i].type);
            }
        });
        this.socket.on('inventoryUpdate', function(inventory){
            for( var i=0 ; i<_this.inventoryItems.length; i++ ){
                _this.inventoryItems[i].setType(null);
            }
            for( var i=0 ; i<inventory.length; i++ ){
                _this.inventoryItems[i].setType(inventory[i]);
            }
        });
        this.socket.on('timerUpdate', function(timerInfo) {
            if(timerInfo.timer>=0){
                _this.timerText.setText(timerInfo.timer);
            }
            else{
              console.log(_this.inventoryItems[0].body.itemType+1);
              buy(_this.inventoryItems[0].body.itemType+1);
              console.log(_this.inventoryItems[1].body.itemType+1);
              buy(_this.inventoryItems[1].body.itemType+1);
              console.log(_this.inventoryItems[2].body.itemType+1);
              buy(_this.inventoryItems[2].body.itemType+1);
              console.log(_this.inventoryItems[3].body.itemType+1);
              buy(_this.inventoryItems[3].body.itemType+1);
              console.log(_this.inventoryItems[4].body.itemType+1);
              buy(_this.inventoryItems[4].body.itemType+1);
              _this.timerText.setText("");
              _this.socket.off();
            }
            
        });
        // this.socket.on('done', function(done) {
        //     _this.players.map( player => {player.body.anim="stop";} )
        // }

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

        this.controller = this.makeController();

    }

    makeController(){
        this.input.addPointer(2);
        this.controller = Object();

        this.controllerImg = this.add.sprite(0,0,"controller");
        this.controllerImg.setOrigin(0,0);
        this.controllerImg.setScale(.32);
        this.controllerImg.y = 200;

        var noTouchColor = 0xff0000;
        var noTouchAlpha = 0;
        var touchColor = 0x0000ff;
        var touchAlpha = 1;

        var graphics = this.add.graphics({ fillStyle: { color: noTouchColor, alpha: noTouchAlpha } });
        var button_b = new Phaser.Geom.Circle(180, 278, 12);
        var button_a = new Phaser.Geom.Circle(215, 278, 12);
        var button_up    = new Phaser.Geom.Rectangle(35, 238, 18,18);
        var button_down  = new Phaser.Geom.Rectangle(35, 272, 18,18);
        var button_left  = new Phaser.Geom.Rectangle(17, 255, 18,18);
        var button_right = new Phaser.Geom.Rectangle(52, 255, 18,18);
        graphics.fillCircleShape(button_b);
        graphics.fillCircleShape(button_a);
        graphics.fillRectShape(button_up);
        graphics.fillRectShape(button_down);
        graphics.fillRectShape(button_left);
        graphics.fillRectShape(button_right);

        this.controller.update = function(input){

            graphics.clear();
            var button_b_pressed = ( ( button_b.contains(input.pointer1.x, input.pointer1.y) && input.pointer1.isDown ) || 
                                     ( button_b.contains(input.pointer2.x, input.pointer2.y) && input.pointer2.isDown ) )
            graphics.fillStyle( button_b_pressed ? touchColor : noTouchColor, 
                                button_b_pressed ? touchAlpha : noTouchAlpha );
            graphics.fillCircleShape( button_b );
            var button_a_pressed = ( ( button_a.contains(input.pointer1.x, input.pointer1.y) && input.pointer1.isDown ) || 
                                     ( button_a.contains(input.pointer2.x, input.pointer2.y) && input.pointer2.isDown ) )
            graphics.fillStyle( button_a_pressed ? touchColor : noTouchColor, 
                                button_a_pressed ? touchAlpha : noTouchAlpha );
            graphics.fillCircleShape( button_a );
            var button_up_pressed = ( ( button_up.contains(input.pointer1.x, input.pointer1.y) && input.pointer1.isDown ) ||  
                                      ( button_up.contains(input.pointer2.x, input.pointer2.y) && input.pointer2.isDown ) )
            graphics.fillStyle( button_up_pressed ? touchColor : noTouchColor,
                                button_up_pressed ? touchAlpha : noTouchAlpha );
            graphics.fillRectShape( button_up );
            var button_down_pressed = ( ( button_down.contains(input.pointer1.x, input.pointer1.y) && input.pointer1.isDown ) ||
                                        ( button_down.contains(input.pointer2.x, input.pointer2.y) && input.pointer2.isDown ) )
            graphics.fillStyle( button_down_pressed ? touchColor : noTouchColor,
                                button_down_pressed ? touchAlpha : noTouchAlpha );
            graphics.fillRectShape( button_down );
            var button_left_pressed = ( ( button_left.contains(input.pointer1.x, input.pointer1.y) && input.pointer1.isDown ) ||
                                        ( button_left.contains(input.pointer2.x, input.pointer2.y) && input.pointer2.isDown ) )
            graphics.fillStyle( button_left_pressed ? touchColor : noTouchColor,
                                button_left_pressed ? touchAlpha : noTouchAlpha );
            graphics.fillRectShape( button_left );
            var button_right_pressed = ( ( button_right.contains(input.pointer1.x, input.pointer1.y) && input.pointer1.isDown ) || 
                                         ( button_right.contains(input.pointer2.x, input.pointer2.y) && input.pointer2.isDown ) )
            graphics.fillStyle( button_right_pressed ? touchColor : noTouchColor,
                                button_right_pressed ? touchAlpha : noTouchAlpha );
            graphics.fillRectShape( button_right );

            return {a:button_a_pressed, b:button_b_pressed, down:button_down_pressed,
                    left:button_left_pressed, right:button_right_pressed, up:button_up_pressed};
        }

        return this.controller;
    }

    update(){

        var fingerPress = this.controller.update(this.input);

        if ( this.cursors.left.isDown  ||
             this.cursors.up.isDown    ||
             this.cursors.right.isDown ||
             this.cursors.down.isDown  ||
             this.cursors.space.isDown ||
             fingerPress.left  ||
             fingerPress.down  ||
             fingerPress.up    ||
             fingerPress.right ||
             fingerPress.a     ||
             fingerPress.b ) {
            this.socket.emit('playerInput', {
                'left'  : this.cursors.left.isDown  || fingerPress.left,
                'up'    : this.cursors.up.isDown    || fingerPress.up,
                'right' : this.cursors.right.isDown || fingerPress.right,
                'down'  : this.cursors.down.isDown  || fingerPress.down,
                'space' : this.cursors.space.isDown || fingerPress.a || fingerPress.b
            });
        }
        
        this.players.forEach( player => {
            if(player.body.anim === 'stop'){
                player.body.anims.stop(0);
            }
            else {
                player.body.anims.play(player.body.anim,true);
            }
        });

        this.monsters.forEach( monster => {
            if(monster.body.anim === 'stop'){
                monster.body.anims.stop(0);
            }
            else if(monster.body.anim === 'dead'){
                monster.body.setActive(false).setVisible(false);
            }
            else {
                monster.body.anims.play('octorock-'+monster.body.anim,true);
            }        
        });
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    roundPixels: true,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Room1]
};

var game;

getUserItems(function(){
  game = new Phaser.Game(config);
});

// var game = new Phaser.Game(config);