/**
 * Data for Game Progress and game objects, which can change with gameplay
 */
export var SAVES = {
    SCORES:{
        devilScore: 100,
        heroScore: 100,
    },
    SPIKE: { 
        SpikeLevel: 1,
        SpikeUpgradeCost: 10,
        SpikeCoolDown: 3*1000,
        SpikeDuration: 10*1000

    },
    BOMB: {
        BombLevel: 1,
        BombUpgradeCost: 10,
        BombCoolDown: 3*1000,
        BombDuration: 10*1000,
        BombSpeed: 250
    },
    BEARTRAP: {
        BearTrapLevel: 1,
        BearTrapUpgradeCost: 10,
        BearTrapCoolDown: 3*1000,
        BearTrapDuration: 10*1000,
        BearTrapFreezeTime: 3*1000
    },
    CANNON: {
        CannonLevel: 1,
        CannonUpgradeCost: 10,
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

        SuperJumpLevel: 1,
        SuperJumpCoolDown: 2 * 1000,
        SuperJumpCost: 10,
        SuperJumpMultiplier: 2,

        SuperSpeedLevel: 1,
        SuperSpeedCoolDown: 2 * 1000,
        SuperSpeedCost: 10,
        SuperSpeedMultiplier: 3,

        ReloadLevel: 1,
        ReloadCoolDown: 2 * 1000,
        ReloadCost: 30,

        HealLevel: 1,
        HealCoolDown: 2 * 1000,
        HealCost: 40

        /*SkillOneCoolDown: 2 * 1000,
        SkillOneCost: 10,
        SkillOneMultiplier: 2,

        SkillTwoCoolDown: 2 * 1000,
        SkillTwoCost: 10,
        SkillTwoMultiplier: 3,

        SkillThreeCoolDown: 2 * 1000,
        SkillThreeCost: 30,

        SkillFourCoolDown: 2 * 1000,
        SkillFourCost: 40*/
    },
    PROGRESS: {
        GameLevel: 1
    }
}