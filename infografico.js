var telaAtual;
var planets = [];

function setup(){
    let cnv = createCanvas(1200, 600);
    cnv.id('mycanvas');
    background(200);
    //telaAtual = new TelaPrincipal();
    planets.push( new Planet(746, 534, 65, 0) ); //900
    planets.push( new Planet(200, 200, 50, 50) );
    planets.push( new Planet(420, 400, 75, 75) ); //200
    planets.push( new Planet(746, 134, 65, 65) ); //900
    planets.push( new Planet(946, 334, 75, 75) ); //X
    shoot = new Shooter();
    
    player = new Player(746, 534-65-20, 0, 0, 0, 255, 255,20);
    player.orbit = function(body){};
    player.newton = function(body){};
}

var tiled = 400/10;

var robo = 
{ 
    x :  tiled * 14,
    y :  tiled * 8  
}

var player = null;

function draw(){
    //fill(255);
    //for(var i=0; i<20; i++ )
    //    for(var j=0; j<10; j++ )
    //        rect(tiled*i, tiled*j, tiled, tiled);

    //telaAtual.update();
    //fill(0);
    //rect(robo.x, robo.y, tiled, tiled);
    background(255);

    var bound = 5000;
	var to_splice = [];
	/*for (var i = 0; i < planets.length ; i++) {
		if ((planets[i].pos.x > bound) ||
		    (planets[i].pos.x < (0-bound)) ||
		    (planets[i].pos.y > bound) ||
		    (planets[i].pos.y < (0-bound))) {
			to_splice.add(i);
		}
	}
	for (var i = 0; i < to_splice.length ; i++) {
		planets.splice(to_splice[i], 1);
    }*/

	/* Render planets */
    if( player != null ) {
        for (var i = 1; i < planets.length ; i++) {
            //console.log( planets[i].pos.dist( player.pos ) );
            //text( planets[i].pos.dist( player.pos ), planets[i].pos.x + 200, planets[i].pos.y )
            //text( planets[i].radius + 40, planets[i].pos.x + 200, planets[i].pos.y + 40 )
            if( planets[i].pos.dist( player.pos ) < planets[i].radius + player.radius + 20 ){
                player.orbit = function(body){};
                player.newton = function(body){};

                if( planets[i].pos.dist( player.pos ) > planets[i].radius + player.radius ){
                    let vec1 = createVector( planets[i].pos.x, 
                                            planets[i].pos.y, 
                                            planets[i].pos.z );
                    
                    let vec2 = createVector( player.pos.x, 
                                            player.pos.y, 
                                            player.pos.z );
               
                    player.pos.sub( vec2.sub( vec1 ).mult( 0.01 ) );
                }
            }
        }

        for (var i = 0; i < planets.length ; i++) {
            player.orbit(planets[i]);
        }
        player.newton();
        player.draw();
    }
  
    /* Draw the sun */
    for (var i = 0; i < planets.length ; i++) {
        planets[i].draw();
    }
	
	/* Render shooter */
	shoot.update();
	shoot.draw();
}

