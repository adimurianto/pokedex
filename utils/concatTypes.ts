export const concatTypes = (result:any)=>{
    let i;
    let str = [];
    for( i in result){
        const name = result[i].type.name[0].toUpperCase() + result[i].type.name.slice(1);
        str.push(name);
    }
    return str;
}