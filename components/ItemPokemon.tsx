import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from '../styles/Home.module.css';
import axios from "axios";

type ItemProps = {
    item: any;
    index: number;
}

const ItemPokemon = ({item, index}: ItemProps) => {
    const id = ('000' + (index + 1)).slice(-3);
    const pokeName = item.name[0].toUpperCase() + item.name.slice(1);

    const [poke, setPoke] = useState({});
    const [err, setErr] = useState(false);

    useEffect(()=>{
        const loadPokemon = async ()=>{
            try{
                const res = await axios.get(item.url);
                setPoke(res.data.types);
                setErr(false);
            }catch(err){
                setErr(true);
            }
        }
        loadPokemon();
    },[item])

    const concat = (result:any)=>{
        let i;
        let str = [];
        for( i in result){
            str.push(result[i].type.name);
        }
        return str;
    }

    const pokeData = concat(poke);

    const typeSelect = (type:string)=>{
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

    return (
        <div className={styles.card}>
            <span className={styles.img_item} >
                <Image
                    alt={item.name}
                    width={400}
                    height={400}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`}
                />
            </span>
            <span className={styles.body_item}>
                <span>#{id}</span>
                <h2>{pokeName}</h2>
                <span className={styles.labels}>
                    {
                        pokeData.map((data:string, index:number) => (
                            <label 
                                className={styles.label}
                                style={{backgroundColor: typeSelect(data)}}
                            >
                                {data.toUpperCase()}
                            </label>
                        ))
                    }
                </span>
            </span>
        </div>
    );
};

export default ItemPokemon;
