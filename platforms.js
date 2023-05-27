
    class Platforms {
        constructor() {
            this.position = new Vector2(260, 220);
            this.image = graphicAssets.plats.image;
            this.halfWidth = this.image.width / 2;
            this.halfHeight = this.image.height / 2;


            this.brick = null;
            this.despawn = null;
            this.end = null;
        }

        Start() {
            this.Walls();
            this.Plats();
            this.Despawner();
            this.End();
        }

        Draw(ctx){
            ctx.save();

            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(-this.rotation);
            ctx.scale(2.5, 2);
            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

            ctx.restore();
            ctx.save();

            ctx.translate(260, 490);
            ctx.rotate(.048);
            ctx.scale(2.5, 2);
            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

            ctx.restore();
            ctx.save();

            ctx.translate(260, 750);
            ctx.rotate(.048);
            ctx.scale(2.5, 2);
            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

            ctx.restore();
            ctx.save();

            ctx.translate(385, 615);
            ctx.rotate(-.048);
            ctx.scale(2.5, 2);
            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

            ctx.restore();
            ctx.save();

            ctx.translate(385, 355);
            ctx.rotate(-.048);
            ctx.scale(2.5, 2);
            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

            ctx.restore();
            ctx.save();

            ctx.translate(325, 869);
            ctx.rotate(-.01);
            ctx.scale(3, 2);
            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

            ctx.restore();
            ctx.save();

            ctx.translate(300, 150);
            ctx.rotate(0);
            ctx.scale(.7, 2);
            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight);

            ctx.restore();
        }

        Walls(){
            // down wall
            CreateEdge(world, 3.2, 0, -3.2, 0, 3.2, 0, { type: b2Body.b2_staticBody });
            // left wall
            CreateEdge(world, 0, 2.4, 0, -2.4, 0, 8, { type: b2Body.b2_staticBody });
            // right wall
            CreateEdge(world, 6.4, 2.4, 0, -2.4, 0,8, { type: b2Body.b2_staticBody });
            // up wall
            CreateEdge(world, 3.2, 9, -3.2, 0, 3.2, 0, { type: b2Body.b2_staticBody });
        }

        Plats(){
            //Floor platform
            this.brick = CreateBox(world, 1, .3, 11, .2, { type: b2Body.b2_staticBody });
            this.brick.SetAngle(0.01);
            this.brick.SetUserData("plat");
            
            //End platform
            this.brick = CreateBox(world, 1.3, 6.8, 8, .2, { type: b2Body.b2_staticBody });
            this.brick.SetUserData("plat");
            //this.brick.SetAngle(-0.01)
            this.brick = CreateBox(world, 3, 7.5, 1.5, .2, { type: b2Body.b2_staticBody });
            this.brick.SetUserData("plat");

            //Throw platform
            this.brick = CreateBox(world, 1.8, 7, .05, .05, { type: b2Body.b2_staticBody });
            this.brick.SetAngle(-.5);
            this.brick.SetUserData("plat");

            //Middle platforms
            this.brick = CreateBox(world, 1, 1.6, 8.5, .19, { type: b2Body.b2_staticBody });
            this.brick.SetAngle(-0.05);
            this.brick.SetUserData("plat");
            this.brick = CreateBox(world, 5, 2.9, 7.5, .19, { type: b2Body.b2_staticBody });
            this.brick.SetAngle(0.05);
            this.brick.SetUserData("plat");
            this.brick = CreateBox(world, 1, 4.2, 8.5, .19, { type: b2Body.b2_staticBody });
            this.brick.SetAngle(-0.05);
            this.brick.SetUserData("plat");
            this.brick = CreateBox(world, 5, 5.5, 7.5, .19, { type: b2Body.b2_staticBody });
            this.brick.SetAngle(0.05);
            this.brick.SetUserData("plat");
        }

        Despawner(){
            this.despawn = CreateBox(world, .2, .52, .2, .2, { isSensor: true, type: b2Body.b2_staticBody });
            this.despawn.SetUserData("despawn");
        }

        End(){
            this.end = CreateBox(world, 3, 7.75, 1.4, .25, { isSensor: true, type: b2Body.b2_staticBody });
            this.end.SetUserData("end");
        }
    }