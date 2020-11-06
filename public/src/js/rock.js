function randomleft() {
    // console.log("board i x max" + boardDivisions[i].X_MAX)
    // var x = Math.floor((Math.random() * boardDivisions[i].X_MAX));
    // return x;
    return Math.floor(Math.random() * (X_MAX - X_MIN) + X_MIN);
}

function randomtop() {
    var x = Math.floor(((Y_MIN + 70) + (Math.random() * (Y_MAX - Y_MIN - 200))));
    return x;
}

function randomvel() {
    var random = [];
    min = Math.ceil(rockMaxSpeed);
    max = Math.floor(rockMinSpeed);
    random[0] = Math.floor(Math.random() * (max - min + 1) + min);
    random[1] = Math.floor(Math.random() * ((-1 * max) - (-1 * min) + 1) + (-1 * min));
    posorneg = Math.floor(Math.random() * ((Math.floor(1)) - 0 + 1) + 0);
    // console.log(random[posorneg]);
    return random[posorneg];
}

function Rock(rockpic, left, top, vx, vy, id) {
    this.element = rockpic;
    this.x = left;
    this.y = top;
    this.dx = vx;
    this.dy = vy;
    this.id = id;
    this.element.style.visibility = "visible";

    var move;
    var that = this;
    this.initr = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.updatePositive();
    }

    var name = "warn" + this.id;
    if ($(name).length == 0) {
        // console.log($(name).length);
        name = document.createElement("div");
        board.appendChild(name);
        name.innerHTML = "!";
        name.style.width = "auto";
        name.style.height = "auto";
        name.style.fontSize = "2vw";
        name.style.color = "red";
        name.style.position = "absolute";
        name.style.visibility = "hidden";
        name.className = "blinking"
    }


    this.updatePositive = function() {
        move = setInterval(frame, 100);

        function frame() {
            //meteor boundaries
            // let i = 0;
            // while (i < noOfPlayers) {
            if (that.x >= X_MAX + 100 || that.x <= X_MIN - 100) {
                that.dx = that.dx * -1;
                that.element.style.visibility = "visible";
            }
            if (that.y >= Y_MAX - 60 || that.y <= Y_MIN - 200) {
                that.dy *= -1;
            }

            if (that.y <= Y_MIN) {
                name.style.visibility = "visible";
                name.style.left = that.element.offsetLeft + 'px';
            }

            if (that.y <= Y_MIN) {
                that.element.style.visibility = "visible";
            }
            if (that.y >= Y_MIN - 50) {
                name.style.visibility = "hidden";
            }
            // i++;
            // }
            that.x = that.x + that.dx;
            that.y = that.y + that.dy;
            that.element.style.left = that.x + 'px';
            that.element.style.top = that.y + 'px';
        }
    }
}

function addRocks() {
    // rocks[0] = document.querySelectorAll(".rock1");
    // rocks[1] = document.querySelectorAll(".rock2");

    rocks.forEach(rock => {
        // console.log(rockID);
        rockData[rockID] = { top: randomtop(), left: randomleft(), xvel: randomvel(), yvel: randomvel() };
        // console.log(rockData[rockID].top);
        var rock1 = new Rock(rock, rockData[rockID].left, rockData[rockID].top, rockData[rockID].xvel, rockData[rockID].yvel, rockID);
        rock1.initr();
        rockID++;
    });

}

function blinker() {
    $('.blinking').fadeOut(500);
    $('.blinking').fadeIn(500);
}
setInterval(blinker, 10);