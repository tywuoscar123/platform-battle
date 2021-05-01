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
        STORY: "STORY",
        TUTORIAL: "TUTORIAL",
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
        TIMER: 3*60*1000,
        TileSize: 16,
        GroundY: 640 - 16,
        AirDensity: 1.22,
        PixelPerMeter: 20,
        NumLevels: 7,
        MaxSkillLevel: 10,
        AUDIO: "on",
    },
    STORY:{
        Prologue: ['In a remote village, a descendant of an ancient hero lives his peaceful life there. Little does he know that there is a seal of an ancient devil hidden in the church which the hero defects 1000 years ago.\n',
        'One day, the village was covered in heavy clouds, the rain was pouring and thunder struck the church. The seal of the devil was broken, and it is going to conquer the world for revenge.\n',
        'Hero (Devil), it is time to get up, protect the world from the devil (destroy the world for your revenge)!\n'],

        Devil1: ['The Devil has successfully regained part of its power. With its magic force, the Devil has successfully destroyed part of the world. Hundreds of people have been killed in a brutal manner.\n',
        'Without strong rebellion, soon the major cities will fall into the hand of the Devil.\n'],

        Devil2: ['The Devil is learning the defense and tactics of the hero. With its increasing power and wisdom, the traps and defense from the hero become less effective.\n',
        'Now, most of the major cities has fallen into the hands of the devil, only the capital and some heavily guarded cities remain in the hand of the human.\n',
        'It is just a little more to go, the devil will soon finish his revenge and control the world. It will become a living hell for the human.\n'],

        DevilEnd: ['Now, the Devil has regained all his power. The magic attack from the devil obliterated all the traps and defense of the hero. None of the human forces has the power to launch an attack to stop the Devil.\n',
        'Within 3 days, the capital of the human world has fallen into the hand of the devil. All royal family members are killed and the corpse of the hero is hanging outside the castle.\n',
        'Seeing the defect of the hero and losing their leaders, all humans lose their hope and surrender to the Devil. Now, the devil has control of the entire world, and humans will live under fear until another hero emerges…...\n' ],

        Hero1: ['With the wisdom of the hero, the damage caused by the devil was kept minimal. Humans have successfully set up their defense to stop the devil from advancing.\n',
        'Still, the devil is absorbing mana from the atmosphere and recovering. If the hero is not careful, the world will fall into the hand of the devil.\n'],

        Hero2: ['With the help of a group of genius inventors, the hero has improved his traps to battle against the devil. The traps have become stronger and they are mass-produced.\n',
        'The hero has successfully launched an attack to stop the devil from invading and regain control of some major cities.\n',
        'It won’t be long until humans launch a full attack to send the devil back to hell.\n'],

        HeroEnd: ['With the hero’s successful attacks, the Devil has been weakened and cannot move for a period of time.\n',
        'The precious time allows the hero to gather all remaining armies and prepare for a full attack. It is time to strike.\n',
        'Hundreds of bombs and spikes are shoot into the sky, falling like rain on top of the devil. With its wounds, the devil can only create a magic barrier to block the attack, and it is running out of its mana.\n',
        'Seeing this chance, the hero rushes to the Devil and uses his sword to deal the final blow to the Devil. The Devil trys its last struggle, but it is too late. The hero uses his only magic to purify the Devi and end it once for all. Now, humans can live a peaceful life until another devil come to life…...\n']
    }
}