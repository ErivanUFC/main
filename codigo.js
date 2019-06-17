updateIntrodution = function(){
    background(180,0,200);

    this.renderPlanets();
    this.renderAstrounaut();
    this.rocket.draw();

    this.astronaut.ang -= 0.004;
    this.astronaut.pos = createVector(
        this.planets[0].pos.x + cos( this.astronaut.ang - 3.18/2 ) * ( this.planets[0].radius + 15 ),
        this.planets[0].pos.y + sin( this.astronaut.ang - 3.18/2 ) * ( this.planets[0].radius + 15 )
    );
    
    if( this.astronaut.ang < 0 ) this.update = updatePainel;
}

updatePainel = function(){
    background(180,0,200);
 
    this.renderPlanets();
    this.renderAstrounaut();
    this.rocket.draw();

    this.painel.draw();
    ///console.log(this.painel);
}

updateInitial = function(){
    background(180,0,200);
    if (!mouseIsPressed && this.shoot.shooting) this.update = updateLaunch;

    this.renderPlanets();
    this.renderShooter();
    this.renderAstrounaut();
    this.rocket.draw();
}

updateLaunch = function(){
    background(180,0,200);
    this.renderPlanets();
    this.renderShooter();
    this.renderAstrounaut();
    this.renderRocket();
    this.rocket.drawTraj();

    for (var i = 1; i < this.planets.length ; i++) {
        //console.log( planets[i].pos.dist( rocket.pos ) );
        //text( planets[i].pos.dist( rocket.pos ), planets[i].pos.x + 200, planets[i].pos.y )
        //text( planets[i].radius + 40, planets[i].pos.x + 200, planets[i].pos.y + 40 )
        if( this.planets[i].pos.dist( this.rocket.pos ) < this.planets[i].radius + this.rocket.radius + this.distance_minus_planet ){
            this.rocket.planet = this.planets[i];
            this.rocket.dist = this.planets[i].pos.dist( this.rocket.pos );
            //this.rocket.orbitAng = atan2( this.planets[i].pos.dist( this.rocket.pos ).y, this.planets[i].pos.dist( this.rocket.pos ).x )
            this.update = updateOrbit;
        }
    }
}

updateOrbit = function(){
    background(180,0,200);
    this.renderPlanets();
    this.renderShooter();
    this.renderAstrounaut();
    this.rocket.draw();
    this.rocket.drawTraj();

    let x = this.rocket.planet.pos.x + cos(this.rocket.orbitAng) * this.rocket.dist;
    let y = this.rocket.planet.pos.y + sin(this.rocket.orbitAng) * this.rocket.dist;
    this.rocket.pos = createVector( x, y ); 
    this.rocket.orbitAng -= 0.01; //( this.rocket.vel.x + this.rocket.vel.y )/200;
    
    console.log(this.rocket.orbitAng);
    if( this.rocket.orbitAng < -3)
        this.update = updateMap;
}

updateMap = function(){
    background(180,0,200);
    this.renderPlanets();
    this.renderAstrounaut();
    this.rocket.draw();
    this.map.draw();
}

class Infografico
{
    constructor(){
        this.planets = [];
        this.planets.push( new Planet(746, 534, 65,  0) ); //900
        this.planets.push( new Planet(200, 200, 50, 50) );
        this.planets.push( new Planet(420, 400, 75, 75) ); //200
        this.planets.push( new Planet(746, 134, 65, 65) ); //900
        this.planets.push( new Planet(946, 334, 75, 75) ); //X*/

        let cnv = createCanvas(windowWidth/( windowWidth * 0.5 ));
        cnv.id('mycanvas');

        let x = this.planets[0].pos.x + cos( 45) * ( this.planets[0].radius + 15 );
        let y = this.planets[0].pos.y + sin(-45) * ( this.planets[0].radius + 15 );
        this.astronautSpr =  loadImage('assets/astronaut.png');
         
        this.astronaut = new Player( x, y, 0, 0, 255, 255, 30, 15, false, this.astronautSpr );
        this.astronaut.orbit = function(body){};
        this.astronaut.newton = function(body){};
        this.astronaut.ang = 6.28/8;
        
        this.rocket = new Player(746, 534-65-20, 0, 0, 0, 255, 255, 20, true);
        
        this.shoot = new Shooter( this.rocket );

        this.space = loadImage('assets/space.jpg');

        this.distance_minus_planet = 50;

        this.painel = new Painel( 10, 10, 400, 400);
        
        this.map = new Map( null , 10, 10, 400, 400);
    }

    renderShooter(){
        /* Render shooter */
        this.shoot.update();
        this.shoot.draw();
    }

    renderPlanets(){
        for (var i = 0; i < this.planets.length ; i++) {
            this.planets[i].draw();
        }
    }

    renderAstrounaut(){
        for (var i = 0; i < this.planets.length; i++) {
            this.astronaut.orbit( this.planets[i] );
        }
        this.astronaut.newton();
        this.astronaut.draw();
    }

    renderRocket(){
        for (var i = 0; i < this.planets.length ; i++) {
            this.rocket.orbit( this.planets[i] );
        }
        this.rocket.newton();
        this.rocket.draw();
    }

    update(){
        this.update = updateIntrodution;
    }
}

function setup(){
    infografico = new Infografico();

    a = loadImage('./assets/rocket.png', img => {
        img.loadPixels();
        img.pontos = a.imageData.data;
        img.updatePixels();
    });
}

function sizeFactor(){
    return windowWidth/1200;
}

function draw(){
    scale( sizeFactor() );
    background(180,0,200);
    //infografico.update();

    var p =  sizeFactor();
    if ( a.pontos != undefined && mouseX < 0 + a.width * p && mouseY < 0 + a.height * p ){
        
        if( a.pontos[ ( int( mouseX/p ) + int( mouseY/p ) * a.width ) * 4 + 3 ] != 0 ){
            fill(0,255,0);
            rect( 0, 0, a.width, a.height );
        }
    }

    image(a, 0, 0)
}

function windowResized() {
    resizeCanvas( windowWidth, windowWidth * 0.5);
}

function mouseReleased(){
    if( infografico.painel )
        if( infografico.painel.button )
            infografico.painel.button.released = true;

    if( infografico.map )
        if( infografico.map.button )
            infografico.map.button.released = true;
}