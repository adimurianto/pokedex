export const concatAbilities = (result:any)=>{
    let i;
    let str = [];
    for( i in result){
        const name = result[i].ability.name[0].toUpperCase() + result[i].ability.name.slice(1);
        str.push(name + (result[i].is_hidden == true ? '' : ' (hidden)'));
    }
    return str;
}