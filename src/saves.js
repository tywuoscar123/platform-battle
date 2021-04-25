/**
 * Data for Game Progress and game objects, which can change with gameplay
 */
export var SAVES = {
    SCORES:{
        devilScore: 100,
        heroScore: 100,
    },
    SPIKE: {
        SpikeCoolDown: 3*1000,
        SpikeDuration: 10*1000
    },
    BOMB: {
        BombCoolDown: 3*1000,
        BombDuration: 10*1000,
        BombSpeed: 250
    },
    BEARTRAP: {
        BearTrapCoolDown: 3*1000,
        BearTrapDuration: 10*1000,
        BearTrapFreezeTime: 3*1000
    },
    CANNON: {
        CannonCoolDown: 3*1000,
        CannonDuration: 10*1000,
        CannonSpeed: 200
    },
    PLAYER: {
        InitialHP: 100,
        InitialBullet: 10,
        GroundRunningForce: 1000,
        AirRunningForce: 100,
        JumpSpeed: 350,
        Mana: 100,
        MaxVx: 100,
        MaxVy: 1000,

        SkillOneCoolDown: 2 * 1000,
        SkillOneCost: 10,
        SkillOneMultiplier: 2,

        SkillTwoCoolDown: 2 * 1000,
        SkillTwoCost: 10,
        SkillTwoMultiplier: 3,

        SkillThreeCoolDown: 2 * 1000,
        SkillThreeCost: 30,

        SkillFourCoolDown: 2 * 1000,
        SkillFourCost: 40
    },
    PROGRESS: {
        GameLevel: 1
    }
}