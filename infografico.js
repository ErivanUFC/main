var telaAtual;
var planets = [];
var painel = false;

function setup(){
    let cnv = createCanvas(1200, 600);
    cnv.id('mycanvas');
    //background(200);
    //telaAtual = new TelaPrincipal();
    planets.push( new Planet(746, 534, 65, 0) ); //900
    planets.push( new Planet(200, 200, 50, 50) );
    planets.push( new Planet(420, 400, 75, 75) ); //200
    planets.push( new Planet(746, 134, 65, 65) ); //900
    planets.push( new Planet(946, 334, 75, 75) ); //X
    shoot = null;// new Shooter();

    astronaut = new Player( planets[0].pos.x + cos(45) * ( planets[0].radius + 15 ), 
        planets[0].pos.y + sin(-45) * ( planets[0].radius + 15 ),   
        0,//cos( (rocket.pos.y-planets[i].pos.x)/ (rocket.pos.y-planets[i].pos.y) ), 
        0,//sin( (rocket.pos.y-planets[i].pos.x)/ (rocket.pos.y-planets[i].pos.y) ),  
        255, 
        255, 
        30, 
        15,
        false,
        loadImage('assets/astronaut.png')
        );
    astronaut.orbit = function(body){};
    astronaut.newton = function(body){};
    astronaut.ang = 6.28/8;

    rocket = new Player(746, 534-65-20, 0, 0, 0, 255, 255, 20, true);
    rocket.orbit = function(body){};
    rocket.newton = function(body){};

    space = loadImage('assets/space.jpg');
}

var tiled = 400/10;

var robo = 
{ 
    x :  tiled * 14,
    y :  tiled * 8  
}

var rocket = null;

var distance_minus_planet = 80;
var astronaut = null;

function draw(){
    //fill(255);
    //for(var i=0; i<20; i++ )
    //    for(var j=0; j<10; j++ )
    //        rect(tiled*i, tiled*j, tiled, tiled);

    //telaAtual.update();
    //fill(0);
    //rect(robo.x, robo.y, tiled, tiled);
    background(180,0,200);

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
  
    /* Draw the sun */
    for (var i = 0; i < planets.length ; i++) {
        planets[i].draw();
    }
    
    //if( astronaut.ang == null )
        //shoot = new Shooter();

    if( shoot != null )
    {
        /* Render shooter */
        shoot.update();
        shoot.draw();
    }
    
    if( astronaut != null ){
        if( shoot != null ){
            for (var i = 1; i < planets.length ; i++) {
                if( planets[i].pos.dist( astronaut.pos ) < planets[i].radius + astronaut.radius ){
                    astronaut.orbit = function(body){};
                    astronaut.newton = function(body){};
                    astronaut.stop = true;
                    astronaut.ang = atan2(astronaut.pos.y-planets[i].pos.y,
                                        astronaut.pos.x-planets[i].pos.x) + 3.14/2;

                    painel = 2;
                    shoot = null;
                }
            }
            for (var i = 0; i < planets.length ; i++) {
                astronaut.orbit(planets[i]);
            }
            astronaut.newton();
        }
        else{
            astronaut.ang -= 0.004;
            astronaut.pos = createVector(
                planets[0].pos.x + cos(astronaut.ang - 3.18/2) * ( planets[0].radius + 15 ),
                planets[0].pos.y + sin(astronaut.ang - 3.18/2) * ( planets[0].radius + 15 )
            );
            if( astronaut.ang < 0 ){
                painel = 1;
                astronaut = null;
            }
        }
        if( astronaut != null )
            astronaut.draw();
    }

    /* Render planets */
    if( rocket != null ) {
        for (var i = 1; i < planets.length ; i++) {
            //console.log( planets[i].pos.dist( rocket.pos ) );
            //text( planets[i].pos.dist( rocket.pos ), planets[i].pos.x + 200, planets[i].pos.y )
            //text( planets[i].radius + 40, planets[i].pos.x + 200, planets[i].pos.y + 40 )
            if( planets[i].pos.dist( rocket.pos ) < planets[i].radius + rocket.radius + distance_minus_planet ){
                //rocket.orbit = function(body){};
                //rocket.newton = function(body){};
                
                if( astronaut == null && !mouseIsPressed && !this.shooting ) 
                    astronaut = new Player( rocket.pos.x, 
                                            rocket.pos.y, 
                                            0,//cos( (rocket.pos.y-planets[i].pos.x)/ (rocket.pos.y-planets[i].pos.y) ), 
                                            0,//sin( (rocket.pos.y-planets[i].pos.x)/ (rocket.pos.y-planets[i].pos.y) ),  
                                            255, 
                                            255, 
                                            30, 
                                            15,
                                            false,
                                            loadImage('assets/astronaut.png')
                                            );
                    
                    /*setInterval(
                        function(){ 
                            rocket.spr = loadImage('assets/explosion.png');
                            rocket.spr_current = 1;
                            rocket.spr_cont = 12; 
                        },
                        500
                    )*/
                }

                /*if( planets[i].pos.dist( rocket.pos ) > planets[i].radius + rocket.radius ){
                    let vec1 = createVector( planets[i].pos.x, 
                                            planets[i].pos.y, 
                                            planets[i].pos.z );
                    
                    let vec2 = createVector( rocket.pos.x, 
                                            rocket.pos.y, 
                                            rocket.pos.z );
            
                    rocket.pos.sub( vec2.sub( vec1 ).mult( 0.01 ) );
                }*/
            //}
        }

        for (var i = 0; i < planets.length ; i++) {
            rocket.orbit(planets[i]);
        }
        rocket.newton();
        rocket.draw();

        if( painel == 1 ){
            rect(10,10,1190,590);
            fill(0);
            //stroke(0);
            text("painel de controle: informacoes sobre o media day e o infografico",40,40)
        }
        if( painel == 2 ){
            rect(10,10,1190,590);
            fill(0);
            //stroke(0);
            text("mapa do planeta",40,40)  
        }

        if( mouseIsPressed && painel != 0 ){
            painel = 0;
            shoot = new Shooter();
        }

    }
}
