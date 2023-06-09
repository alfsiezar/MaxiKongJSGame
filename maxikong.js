
class Maxikong {
    constructor() {
        this.position = new Vector2(110, 162);
        
        this.image = graphicAssets.kong.image;
        this.halfWidth = this.image.width / 2;
        this.halfHeight = this.image.height / 2;

        this.barrels = [];

        this.timer = 0;
        this.timeToSpawn = 5;
    }

    Update(deltaTime) {
        this.timer += deltaTime;
        if(this.timer >= this.timeToSpawn){
            this.Barrels();
            this.timer = 0;
        }
        // if(Input.IsKeyDown(KEY_F)){
        //     this.Barrels();
        // }

        for (let i = this.barrels.length - 1; i >= 0; --i){
            if(this.barrels[i].toRemove == true || gameend){
                world.DestroyBody(this.barrels[i].body);
                this.barrels.splice(i, 1);
            }
            else this.barrels[i].Update(deltaTime);
        }
        gameend = false;
    }

    Draw(ctx){
        this.barrels.forEach(barrel => barrel.Draw(ctx))

        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-this.rotation);
        ctx.scale(2, 2);
        ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

        ctx.restore();
    }

    Barrels() {
        let newBarrel = null;
        newBarrel = new Barriles();
        this.barrels.push(newBarrel);
    }
}
