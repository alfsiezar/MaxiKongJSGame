
class Vicen{
    constructor() {
        
        this.position = new Vector2(50, 54);

        this.body = null;
        
        this.jumpForce = 11;
        this.force = .5;
        this.maxVelocity = 2;

        this.image = graphicAssets.mario.image;
        this.halfWidth = this.image.width / 2;
        this.halfHeight = this.image.height / 2;
    }

    Start(){
        this.body = CreateBox(world, this.position.x / scale, this.position.y / scale, .15, .25, {fixedRotation: true, restitution: 0.5, linearDamping: 1, type : b2Body.b2_dynamicBody});
        this.body.SetUserData("vicentito");
    }

    Update(deltaTime) {
        this.position.x = this.body.GetPosition().x * scale;
        this.position.y = canvas.height - (this.body.GetPosition().y * scale);
        this.rotation = this.body.GetAngle();

        if(Input.IsKeyDown(KEY_W) || Input.IsKeyDown(KEY_SPACE) || Input.IsKeyDown(KEY_UP)){
            this.body.ApplyForce(new b2Vec2(0, this.jumpForce), this.body.GetWorldCenter());
        }
        //Vicen movement
        let movementVector = new b2Vec2(0, 0);
        if(Input.IsKeyPressed(KEY_A) || Input.IsKeyPressed(KEY_LEFT)){
            //movementVector.x -= 1;
            this.body.ApplyForce(new b2Vec2(-this.force, 0), this.body.GetWorldCenter());
            //SetTransform(this.force * deltaTime);
            //ApplyForce(new b2Vec2(-this.force, 0), this.body.GetWorldCenter());
        }
        
        if(Input.IsKeyPressed(KEY_D) || Input.IsKeyPressed(KEY_RIGHT)){
            //movementVector.x += 1;
            this.body.ApplyForce(new b2Vec2(this.force, 0), this.body.GetWorldCenter());
            //SetTransform(-this.force * deltaTime);
            //ApplyForce(new b2Vec2(this.force, 0), this.body.GetWorldCenter());
        }

        if(gameend) this.body.SetPosition(new b2Vec2(.5, .54));
    }

    Draw(ctx) 
    {
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-this.rotation);
        ctx.scale(1, 1);
        ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

        ctx.restore();
    }
}