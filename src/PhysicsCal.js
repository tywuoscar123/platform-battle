import {CST} from "./CST";

export default class PhysicsCal {
    /*
    every sprite class need to set mass and drag coefficient before using this class
     */

    /**
     * Calculate final x velocity by applying gravity, friction and drag
     *
     * @param object - Game objects
     * @param force - Additional X direction force
     * @returns {number} new xVelocity of the object in m/s
     */
    static calculateVelocityX(object, force){
        let Fx = force;
        Fx += PhysicsCal.calculateTotalExternalForceX(object);
        //convert the velocity current velocity to m/s and add velocity according to acceleration
        //return new velocity in m/s
        return (object.body.velocity.x/CST.CONFIG.PixelPerMeter) + (Fx / object.body.mass)/60;
    }

    /**
     * Calculate the constant external force in x-axis acting on the object
     *
     * @param object - Game objects
     * @returns {number} constant external force acting on the object in x-axis in Newton
     */
    static calculateTotalExternalForceX(object){
        let Fx = 0;
        Fx += PhysicsCal.calculateDragX(object);
        Fx += PhysicsCal.calculateFriction(object);
        //console.log(Fx);
        return Fx;
    }

    /**
     * Calculate friction in x-axis
     *
     * @param object - Game objects
     * @returns {number} Friction in x-axis in Newton
     */
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


    /**
     * Calculate air drag in x-axis
     *
     * @param object - Game objects
     * @returns {number} air drag force in x-axis in Newton
     */
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

    /**
     * Calculate final y velocity by applying gravity, friction and drag
     *
     * @param object - Game objects
     * @param force - Additional Y direction force
     * @returns {number} new yVelocity of the object in m/s
     */
    static calculateVelocityY(object, force){
        let Fy = force
        Fy += PhysicsCal.calculateTotalExternalForceY(object);
        //convert the velocity current velocity to m/s and add velocity according to acceleration
        //return new velocity in m/s
        return (object.body.velocity.y/CST.CONFIG.PixelPerMeter) + (Fy / object.body.mass)/60;
    }

    /**
     * Calculate the constant external force in y-axis acting on the object
     *
     * @param object - Game objects
     * @returns {number} constant external force acting on the object in y-axis in Newton
     */
    static calculateTotalExternalForceY(object){
        let Fy = 0;
        Fy += PhysicsCal.calculateGravitationalForce(object);
        Fy += PhysicsCal.calculateDragY(object);
        return Fy;
    }

    /**
     * Calculate gravitational force acting on the object
     *
     * @param object - Game objects
     * @returns {number} gravitational force acting on the object in Newton
     */
    static calculateGravitationalForce(object){
        return object.body.mass * CST.CONFIG.gravity/CST.CONFIG.PixelPerMeter;
    }


    /**
     * Calculate air drag in y-axis
     *
     * @param object - Game objects
     * @returns {number} air drag force in y-axis in Newton
     */
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