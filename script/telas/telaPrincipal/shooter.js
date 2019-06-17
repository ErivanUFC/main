class Shooter {
    constructor( rocket ){
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.force = 0;
        this.force_axes = createVector();
        this.shooting=false;
        this.c_shooting=false;
		this.touchKey=false;
		this.rocket = rocket;
    }

    update() {
		/* Mouse shooter */
		if((!this.shooting) && (mouseIsPressed) && (!this.c_shooting)) {
			this.shooting = true;
			this.x1 = this.rocket.pos.x;
			this.y1 = this.rocket.pos.y;
			this.R = floor(random(255));
			this.G = floor(random(255));
			this.B = floor(random(255));
		}

		if (this.shooting && mouseIsPressed) {
			this.x2 = mouseX;
			this.y2 = mouseY;	
			
			this.rocket.pos.x = this.x2;
			this.rocket.pos.y = this.y2;
			this.rocket.ang = atan2(this.y1-this.y2,this.x1-this.x2) - 3.14/2;

			this.force = int(dist(this.x1, this.y1, this.x2, this.y2))/10;
		}

		if (!mouseIsPressed && this.shooting) {
			var alpha = 0;
			var direction = createVector();

			if (this.force > 1) {
				if (this.x1 != this.x2) {
					alpha = atan(abs((this.y2 - this.y1)) / abs((this.x2 - this.x1)));
					this.force_axes.x = this.force * cos(alpha);
					this.force_axes.y = this.force * sin(alpha);
				} else {
					this.force_axes.x = 0;
					this.force_axes.y = this.force;
				}	

				if (this.x2 < this.x1) {
					if(this.y2 < this.y1) 	direction = createVector( 1, 1);
					else 				  	direction = createVector( 1,-1);
				} else {
					if(this.y2 < this.y1) 	direction = createVector(-1, 1);
					else 				  	direction = createVector(-1,-1);
				}
				console.log("forca");
				this.rocket = new Player(this.x2, this.y2, (direction.x * this.force_axes.x),(direction.y * this.force_axes.y), this.R, this.G, this.B, 20, false);
				infografico.rocket = this.rocket;
			}
			this.shooting = false;
		}
	}

	draw() {
        if ((this.shooting) || (this.c_shooting)) {
            /* Draw the line and the arraow */
            stroke(0);
            line(this.x1-5,this.y1, this.x1+5, this.y1);
            line(this.x1,this.y1-5, this.x1, this.y1+5);
                line(this.x1, this.y1, this.x2, this.y2);

            /* Draw the futur planet */
            noStroke();
            fill(this.R,this.G,this.B);
            ellipse(this.x2, this.y2, 20, 20);

            push();
            	fill(0);
            	translate( (this.x1+this.x2)/2, (this.y1+this.y2)/2 );
            	if (this.x2 > this.x1) {
                	rotate( atan2(this.y2-this.y1,this.x2-this.x1) );
            	} else {
                	rotate( atan2(this.y1-this.y2,this.x1-this.x2) );
           		}
            	text(nfc(this.force,1,1), 0, -5);
            pop();
        }
	}
}
