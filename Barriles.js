
class Barriles{

    constructor(){
        this.radius = .12;
        this.position = new Vector2(190, 750);

        this.body = CreateCircle(world, this.position.x / scale, this.position.y / scale, this.radius);
        
        this.body.SetUserData(this);

        this.image = graphicAssets.barr.image;
        this.halfWidth = this.image.width / 2;
        this.halfHeight = this.image.height / 2;

        this.toRemove = false;
    }

    Update(deltaTime){
        this.position.x = this.body.GetPosition().x * scale;
        this.position.y = canvas.height - (this.body.GetPosition().y * scale);
        this.rotation = this.body.GetAngle();
    }

    Draw(ctx){
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-this.rotation);
        ctx.scale(1.5, 1.5);
        ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

        ctx.restore();
    }
}