const types = {
    names: ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass",
            "electric", "psychic", "ice", "dragon", "dark", "fairy"],
    startData: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    index: {"normal": 0, "fighting": 1, "flying": 2, "poison": 3, "ground": 4, "rock": 5, "bug": 6, "ghost": 7, "steel": 8,
    "fire": 9, "water": 10, "grass": 11, "electric": 12, "psychic": 13, "ice": 14, "dragon": 15,
    "dark": 16, "fairy": 17},
    icons: {"normal": 0, "fighting": 1, "flying": 2, "poison": 3, "ground": 4, "rock": 5, "bug": 6, "ghost": 7, "steel": 8,
    "fire": 9, "water": 10, "grass": 11, "electric": 12, "psychic": 13, "ice": 14, "dragon": 15,
    "dark": 16, "fairy": 17},
    strengths: {
    normal:   [2,2,2,2,2,1,2,0,1,2,2,2,2,2,2,2,2,2],
    fighting: [4,2,1,1,2,4,1,0,4,2,2,2,2,1,4,2,4,1],
    flying:   [2,4,2,2,2,1,4,2,1,2,2,4,1,2,2,2,2,2],
    poison:   [2,2,2,1,1,1,2,1,0,2,2,4,2,2,2,2,2,4],
    ground:   [2,2,0,4,2,4,1,2,4,4,2,1,4,2,2,2,2,2],
    rock:     [2,1,4,2,1,2,4,2,1,4,2,2,2,2,4,2,2,2],
    bug:      [2,1,1,1,2,2,2,1,1,1,2,4,2,4,2,2,4,1],
    ghost:    [0,2,2,2,2,2,2,4,2,2,2,2,2,4,2,2,1,2],
    steel:    [2,2,2,2,2,4,2,2,1,1,1,2,1,2,4,2,2,4],
    fire:     [2,2,2,2,2,1,4,2,4,1,1,4,2,2,4,1,2,2],
        //    [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8]  
         //   [n,f,f,p,g,r,b,g,s,f,w,g,e,p,i,d,d,f]
    water:    [2,2,2,2,4,4,2,2,2,4,1,1,2,2,2,1,2,2],
    grass:    [2,2,1,1,4,4,1,2,1,1,4,1,2,2,2,1,2,2],
    electric: [2,2,4,2,0,2,2,2,2,2,4,1,1,2,2,1,2,2],
    psychic:  [2,4,2,4,2,2,2,2,1,2,2,2,2,1,2,2,0,2],
    ice:      [2,2,4,2,4,2,2,2,1,1,1,4,2,2,1,4,2,2],
    dragon:   [2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,4,2,0],
    dark:     [2,1,2,2,2,2,2,4,2,2,2,2,2,4,2,2,1,1],
    fairy:    [2,4,2,1,2,2,2,2,1,1,2,2,2,2,2,4,4,2]}
} 

export default types;