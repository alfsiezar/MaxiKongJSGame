
class Vicen{
    constructor() {
        
        this.position = new Vector2(50, 54);
        
        this.jumpForce = 11;
        this.force = .5;

        this.image = graphicAssets.mario.image;
        this.halfWidth = this.image.width / 2;
        this.halfHeight = this.image.height / 2;
        this.direction = -1;
    }

    Start(){
        this.body = CreateBox(world, this.position.x / scale, this.position.y / scale, .15, .25, {fixedRotation: true, restitution: 0.5, linearDamping: 1, type : b2Body.b2_dynamicBody});
        this.body.SetUserData("vicentito");
    }

    Update(deltaTime) {
        this.position.x = this.body.GetPosition().x * scale;
        this.position.y = canvas.height - (this.body.GetPosition().y * scale);
        this.rotation = this.body.GetAngle();

        if(doubleV >= 2) {
            doubleJ = true;
        }
        else if(doubleV == 0){
            doubleJ = false;
        }
        
        if((Input.IsKeyDown(KEY_W) || Input.IsKeyDown(KEY_SPACE) || Input.IsKeyDown(KEY_UP)) && doubleJ == false){
            this.body.ApplyForce(new b2Vec2(0, this.jumpForce), this.body.GetWorldCenter());
	        doubleV++;
        }

        //Vicen movement
        let movementVector = new b2Vec2(0, 0);
        if(Input.IsKeyPressed(KEY_A) || Input.IsKeyPressed(KEY_LEFT)){
            this.body.ApplyForce(new b2Vec2(-this.force, 0), this.body.GetWorldCenter());
            this.direction = 1;
        }
        
        if(Input.IsKeyPressed(KEY_D) || Input.IsKeyPressed(KEY_RIGHT)){
            this.body.ApplyForce(new b2Vec2(this.force, 0), this.body.GetWorldCenter());
            this.direction = -1;
        }

        if(gameend) this.body.SetPosition(new b2Vec2(.5, .54));
    }

    Draw(ctx) 
    {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-this.rotation);
        ctx.scale(this.direction, 1);
        ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

        ctx.restore();
    }
}