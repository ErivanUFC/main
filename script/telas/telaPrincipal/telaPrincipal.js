class TelaPrincipal extends Tela {
    constructor(){
        super();
        this.planets = [];
        this.planets.push( new Planet(420, 400, 75, 750) ); //200
        this.planets.push( new Planet(746, 134, 65, 650) ); //900
        this.planets.push( new Planet(746, 534, 65, 650) ); //900
        this.planets.push( new Planet(946, 334, 75, 750) ); //X

        console.log(this.planets);
    }

    update() {
        background(255);
        for ( var obj in this.planets )
            this.planets[ obj ].update();
        
        if(arrow != null){
            // console.log(players[i].arrow);
            for (var j = 0; j < planets.length ; j++) {
                arrow.orbit(planets[j]);
            }  
            arrow.newton();
            arrow.way();
        }
    }
}

var sun;
var planets = [] ;
var shoot;
var count = 0;
/*
function setup() {
	createCanvas(windowWidth, windowHeight);
	sun = new Sun(windowWidth/2, windowHeight/2);
	shoot = new Shooter();
}

function draw() {
	background(255);

	/* Check if a planet is out of bounds *//*
	var bound = 5000;
	var to_splice = [];
	for (var i = 0; i < planets.length ; i++) {
		if ((planets[i].pos.x > bound) ||
		    (planets[i].pos.x < (0-bound)) ||
		    (planets[i].pos.y > bound) ||
		    (planets[i].pos.y < (0-bound))) {
			append(to_splice, i);
		}
	}
	for (var i = 0; i < to_splice.length ; i++) {
		planets.splice(to_splice[i], 1);
	}

    /* Render planets *//*
	for (var i = 0; i < planets.length ; i++) {
		for (var j = 0; j < planets.length ; j++) {
			if( i != j) {
				planets[i].orbit(planets[j]);
			}
		}
		planets[i].orbit(sun);
		planets[i].newton();
		planets[i].draw();
	}
  
	/* Draw the sun *//*
	sun.draw();
	
	/* Render shooter *//*
	shoot.update();
	shoot.draw();
}*/