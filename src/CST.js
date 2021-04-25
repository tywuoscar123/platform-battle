/**
 * Control information and config for the game
 */
export const CST = {
    SCENES: {
        MENU: "MENU",
        GAME: "GAME",
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
        PixelPerMeter: 20
    }
}