class Firework {
    constructor(pos, acc, colour, wobble) {
        if (pos) {
            this.size = SMALLSIZE;
            this.pos = pos;
            this.canExplode = false;
            this.acc = acc.setMag(random(0, 2));
            this.fuse = random(SMALLMINFUSE, SMALLMAXFUSE);
            this.colour = colour;
            if (wobble) {
                this.wobble = true;
            }
        } else {
            this.size = BIGSIZE;
            this.pos = createVector(random(width), height);
            this.canExplode = true;
            this.acc = createVector(map(this.pos.x, 0, width, 2, -2), random(-2, -5));
            this.fuse = map(this.acc.y, -2, -4, BIGMINFUSE, BIGMAXFUSE);
            this.colour = color(random(255), random(255), random(255));
            if (random() < 0.1) {
                this.wobble = true;
            }
        }
        this.vel = createVector(0, 0);
        this.done = false;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (this.wobble) {
            this.pos.add(createVector(random(-2, 2), random(-2, 2)));
        }
        this.acc.set(0, 0);
        this.fuse--;
        if (this.fuse <= 0) {
            this.done = true;
        }
    }

    explode() {
        let p = floor(random(MINSMALL, MAXSMALL));
        for (let i = 0; i < p; i++) {
            fireworks.push(new Firework(this.pos.copy(), p5.Vector.fromAngle(TWO_PI / p * i), this.colour, this.wobble));
        }
    }

    show() {
        stroke(this.colour);
        fill(this.colour);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}