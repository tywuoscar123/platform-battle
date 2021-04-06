import {CST} from "./CST";

export default class PhysicsCal {
    /*
    every sprite class need to set mass and drag coefficient before using this class
     */

    static calculateVelocityX(object, force){
        let Fx = force;
        Fx += PhysicsCal.calculateTotalExternalForceX(object);
        return (object.body.velocity.x/CST.CONFIG.PixelPerMeter) + (Fx / object.body.mass)/60;
    }
    static calculateVelocityY(object, force){
        let Fy = force
        Fy += PhysicsCal.calculateTotalExternalForceY(object);
        return (object.body.velocity.y/CST.CONFIG.PixelPerMeter) + (Fy / object.body.mass)/60;
    }

    static calculateTotalExternalForceX(object){
        let Fx = 0;
        //Fx += PhysicsCal.calculateDragX(object);
        Fx += PhysicsCal.calculateFriction(object);
        //console.log(Fx);
        return Fx;
    }

    static calculateFriction(object){
        if (object.body.velocity.x === 0 || !object.body.blocked.down){
            return 0;
        }

        let friction = object.body.mass * CST.CONFIG.gravity/CST.CONFIG.PixelPerMeter * 0.2;
        if (object.body.velocity.x > 0){
            friction = -friction;
        }
        //console.log(friction);
        return friction;
    }

    static calculateDragX(object){
        if (object.body.velocity.x === 0){
            return 0;
        }

        let area = (object.displayHeight/ CST.CONFIG.PixelPerMeter) * (object.displayWidth/CST.CONFIG.PixelPerMeter);
        let Vx = object.body.velocity.x / CST.CONFIG.PixelPerMeter;
        let drag =  0.5 * object.DragCoefficient * CST.CONFIG.AirDensity * area * Math.pow(Vx, 2);
        if (object.body.velocity.x > 0){
            drag = -drag;
        }
        //console.log(drag);
        return drag;
    }

    static calculateTotalExternalForceY(object){
        let Fy = 0;
        Fy += PhysicsCal.calculateGravitationalForce(object);
        //Fy += PhysicsCal.calculateDragY(object);
        return Fy;
    }

    static calculateGravitationalForce(object){
        return object.body.mass * CST.CONFIG.gravity/CST.CONFIG.PixelPerMeter;
    }

    static calculateDragY(object){
        if (object.body.velocity.y === 0){
            return 0;
        }

        let area = (object.displayHeight/ CST.CONFIG.PixelPerMeter) * (object.displayWidth/CST.CONFIG.PixelPerMeter);
        let Vy = object.body.velocity.y / CST.CONFIG.PixelPerMeter;
        let drag =  0.5 * object.DragCoefficient * CST.CONFIG.AirDensity * area * Math.pow(Vy, 2);
        if (object.body.velocity.y > 0){
            drag = -drag;
        }

        return drag;
    }
}