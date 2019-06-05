class Shooter {
    constructor(){
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.force = 0;
        this.force_x = 0;
        this.force_y = 0;
        this.shooting=false;
        this.c_shooting=false;
        this.touchKey=false;
    }

    update() {
		/* Circular shooter */
		if((!this.shooting) && (keyIsPressed) && (key == "o") && (!this.c_shooting) && (!this.touchKey)) {
			this.c_shooting = true;
			this.touchKey = true;
			this.R = floor(random(255));
			this.G = floor(random(255));
			this.B = floor(random(255));
			this.force = 0;
			this.force_x = 0;
			this.force_y = 0;

			if (abs(mouseX - windowWidth/2) < abs(mouseY - windowHeight/2)) {
				this.x1 = windowWidth/2;
				this.y1 = mouseY;
				this.y2 = mouseY;
				this.force = sqrt(10000/(abs((windowHeight/2) - mouseY)));
				this.force_x = this.force;
				this.x2 = this.x1 - (10 * this.force_x);

			} else {
				this.x1 = mouseX;
				this.x2 = mouseX;
				this.y1 = windowHeight/2;
				this.force = sqrt(10000/(abs((windowWidth/2) - mouseX)));
				this.force_y = this.force;
				this.y2 = this.y1 - (10 * this.force_y);
			}
		}
		if((!this.shooting) && (keyIsPressed) && (key == "o") && (this.c_shooting) && (!this.touchKey)) {
			this.touchKey = true;
			if(this.x1 == windowWidth/2) {
				this.force_x = -this.force_x;
				this.x2 = this.x1 - (10 * this.force_x);
			} else if (this.y1 == windowHeight/2) {
				this.force_y = -this.force_y;
				this.y2 = this.y1 - (10 * this.force_y);
			}
		}

		if((!this.shooting) && (keyIsPressed)  && (keyCode == ENTER) && (this.c_shooting) && (!this.touchKey)) {
			this.c_shooting = false;
			this.touchKey = true;
			player = new Player(this.x1, this.y1,this.force_x,this.force_y,this.R,this.G,this.B,20);
		}

		if((!this.shooting) && (keyIsPressed)  && (keyCode == ESCAPE) && (this.c_shooting) && (!this.touchKey)) {
			this.c_shooting = false;
			this.touchKey = true;
		}

		if (!keyIsPressed) {
			this.touchKey = false;
		}

		/* Mouse shooter */
		if((!this.shooting) && (mouseIsPressed) && (!this.c_shooting)) {
			this.shooting = true;
			this.x1 = mouseX;
			this.y1 = mouseY;
			this.R = floor(random(255));
			this.G = floor(random(255));
			this.B = floor(random(255));
		}

		if (this.shooting && mouseIsPressed) {
			this.x2 = mouseX;
			this.y2 = mouseY;
			this.force = int(dist(this.x1, this.y1, this.x2, this.y2))/10;
		}

		if (!mouseIsPressed && this.shooting) {
			var alpha = 0;
			var x_dir = 0;
			var y_dir = 0;

			if (this.force > 1) {
				if (this.x1 != this.x2) {
					alpha = atan(abs((this.y2 - this.y1)) / abs((this.x2 - this.x1)));
					this.force_x = this.force * cos(alpha);
					this.force_y = this.force * sin(alpha);
				} else {
					this.force_x = 0;
					this.force_y = this.force;
				}	

				if (this.x2 < this.x1) {
					if(this.y2 < this.y1) {
						x_dir = 1;
						y_dir = 1;
					} else {
						x_dir = 1;
						y_dir = -1;
					}
				} else {
					if(this.y2 < this.y1) {
						x_dir = -1;
						y_dir = 1;
					} else {
						x_dir = -1;
						y_dir = -1;
					}
				}
				player = new Player(this.x2, this.y2, (x_dir * this.force_x),(y_dir * this.force_y),this.R,this.G,this.B,20);
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
