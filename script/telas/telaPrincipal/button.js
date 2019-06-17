class Button {
    constructor( sprite, x, y, width, height ) {
        this.pos = createVector(0, 0);
	    this.pos.x = x;
        this.pos.y = y;
        this.width = width;
        this.height = height;
        this.spr = sprite;
        this.released = false;
    }

	update() {
		image( this.spr, this.pos.x, this.pos.y ); 
        if( dist( mouseX, mouseY, this.pos.x, this.pos.y ) < 50 && this.released )
            infografico.update = updateInitial;
    
        this.released = false;
    }
}