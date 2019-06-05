class Player {
    constructor( x, y, accx, accy, R, G, B, radius ){
        this.radius = radius || 10;
        this.traj = [];
        this.count = 0;
        this.R = R || 0;
        this.G = G || 0;
        this.B = B || 0;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(accx, accy);
        this.mass = 10;
        this.Gravity = 1;
    }

	draw() {
		/* Draw planet */
		push();
		noStroke();
		fill(this.R,this.G,this.B,250);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		ellipse(0, 0, this.radius*2, this.radius*2); 
		pop();

		/* Draw trajectory */
		if (255 == this.count ) {
			for (var i = 0; i < this.count-1; i++) {
				this.traj[i] = this.traj[i+1];
			}
			this.traj[this.count-1] = createVector(this.pos.x,this.pos.y);
		} else {
			this.traj[this.count] = createVector(this.pos.x,this.pos.y);
			this.count++;
		}
		for (var i =0; i < this.traj.length; i++) {
			fill(this.R,this.G,this.B,i);
			noStroke();
			ellipse(this.traj[i].x, this.traj[i].y, 2, 2);
			//ellipse(this.traj[i].x, this.traj[i].y, 2, 2);
		}
	}

    applyForce(force) {
		this.acc.add(force);
	}

	newton() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

    orbit(body) {
		var gravity_force = 0; 
		var gravity_force_x = 0; 
		var gravity_force_y = 0; 
		var x_dir = 0;
		var y_dir = 0;
		var alpha =  0;

		/* Gravitational force */
		var g_dist = dist(this.pos.x,this.pos.y,body.pos.x,body.pos.y)
		gravity_force = ((this.Gravity * this.mass * body.mass)/(sq(g_dist)));
		if (body.pos.x != this.pos.x) {
			alpha = atan(abs((body.pos.y - this.pos.y)) / abs((body.pos.x - this.pos.x)));
			gravity_force_x = gravity_force * cos(alpha);
			gravity_force_y = gravity_force * sin(alpha);
		} else {
			gravity_force_x = 0;
			gravity_force_y = gravity_force;
		}	

		/* Gravitational force direction */
		if (this.pos.x < body.pos.x) {
			if(this.pos.y < body.pos.y) {
				x_dir = 1;
				y_dir = 1;
			} else {
				x_dir = 1;
				y_dir = -1;
			}
		} else {
			if(this.pos.y < body.pos.y) {
				x_dir = -1;
				y_dir = 1;
			} else {
				x_dir = -1;
				y_dir = -1;
			}
		}

		/* Apply gravitational force */
		this.applyForce(createVector((x_dir * gravity_force_x), (y_dir * gravity_force_y)));
	}

}