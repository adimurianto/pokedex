export const typeSelect = (type:string)=>{
    switch(type){
        case 'normal':
            return "#a6a877";
            break;
        case 'grass':
            return "#77c850";
            break;
        case 'ground':
            return "#dfbf68";
            break;
        case 'fighting':
            return "#bf3028";
            break;
        case 'rock':
            return "#b8a137";
            break;
        case 'steel':
            return "#b9b7cf";
            break;
        case 'fire':
            return "#ee7f30";
            break;
        case 'electric':
            return "#f7cf30";
            break;
        case 'flying':
            return "#a98ff0";
            break;
        case 'psychic':
            return "#f85687";
            break;
        case 'bug':
            return "#a8b720";
            break;
        case 'dragon':
            return "#6f38f6";
            break;
        case 'water':
            return "#678fee";
            break;
        case 'ice':
            return "#98d5d6";
            break;
        case 'poison':
            return "#a03fa0";
            break;
        case 'dark':
            return "#725847";
            break;
        case 'ghost':
            return "#6e5896";
            break;
        case 'fairy':
            return "#feaec7";
            break;
    }
}