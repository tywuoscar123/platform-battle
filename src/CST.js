/**
 * Control information and config for the game
 */
export var CST = {
    SCENES: {
        MENU: "MENU",
        LEVELS: "LEVELS",
        SETTINGS: "SETTINGS",
        SKILLTREE: "SKILLTREE",
        DEVILSKILLS: "DEVILSKILLS",
        HEROSKILLS: "HEROSKILLS",
        GAME: "GAME",
        LEVEL1: "LEVEL1",
        LEVEL2: "LEVEL2",
        LEVEL3: "LEVEL3",
        LEVEL4: "LEVEL4",
        LEVEL5: "LEVEL5",
        LEVEL6: "LEVEL6",
        LEVEL7: "LEVEL7",
        PAUSE: "PAUSE",
        END: "END"
    },
    CONFIG: {
        gravity: 500,
        GameX: 1280,
        GameY: 640,
        TIMER: 60*1000,
        TileSize: 16,
        GroundY: 640 - 16,
        AirDensity: 1.22,
        PixelPerMeter: 20,
        NumLevels: 7,
        MaxSkillLevel: 10
    }
}