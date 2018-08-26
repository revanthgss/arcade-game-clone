// Enemies our player must avoid
class Enemy {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.speed=Math.random()*250+300;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if(this.x>505){
            this.x=-150;
            this.speed=Math.random()*250+300;
        }
        this.x+=this.speed*dt;
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //Check for collisions with the player
    checkCollisions(player) {
        if(Math.abs(this.x-player.x)<75&&Math.abs(this.y-player.y)<=5)
            player.reset();
    }
}
//Our Player class
class Player {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.sprite='images/char-boy.png';
    }
    //Update the position of player
    update() {
        this.x+=0;
        this.y+=0;
    }
    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //moves the player according to user input
    handleInput(key) {
        switch(key){
            case 'left':
                if(this.x>-2)
                    this.x-=101;
                break;
            case 'right':
                if(this.x<402)
                    this.x+=101;
                break;
            case 'down':
                if(this.y<400)
                    this.y+=83;
                break;
            case 'up':
                if(this.y<=68)
                    displayModal();
                this.y-=83;
                break;
        }
    }
    //Resets the player to initial position
    reset() {
        this.x = 200;
        this.y = 400;
    }
}

let player = new Player(200,400);
allEnemies=[];
for(let i=0;i<3;i++){
    let enemy = new Enemy(-50,-20+83*(i+1));
    allEnemies.push(enemy);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

displayModal = () => {
    document.querySelector('.modal').style.display = 'block';
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(document.querySelector('.modal').style.display != 'block')
        player.handleInput(allowedKeys[e.keyCode]);
});

let button = document.querySelector('.button');

button.addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
    player.reset();
});