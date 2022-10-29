import React, { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import { IPokemon } from '../types/Pokemon';
import { concatTypes } from '../utils/concatTypes';
import styles from '../styles/Types.module.css';
import { typeSelect } from '../utils/typeSelect';

type ItemProps = {
    name: string;
    url: string;
}

interface PokemonPageProps {
    item: IPokemon,
}

const ItemList = ({name, url}: ItemProps, {item}: PokemonPageProps) => {
    const [poke, setPoke] = useState(item);

    const loadPokemon = async ()=>{
        try{
            const res = await axios.get(url);
            setPoke(res.data);
        }catch(err){
            let message = 'Unknown Error'
            if (err instanceof Error) message = err.message
            console.log(err);
        }
    }
    loadPokemon();

    const id = ('000' + poke?.id).slice(-3);
    const pokeData = concatTypes(poke?.types);

    return (
        <tr>
            <td>
                <Image
                    alt={name}
                    width={60}
                    height={60}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`}
                />
            </td>
            <td>
                <h4>{`#${id}`}</h4>
            </td>
            <td>
                <h4>{name[0].toUpperCase() + name.substring(1)}</h4>
            </td>
            <td>
                <span className={styles.labels}>
                    {
                        pokeData.map((data:string, index:number) => (
                            <label 
                                key={index}
                                className={styles.label}
                                style={{backgroundColor: typeSelect(data.toLowerCase())}}
                            >
                                { data }
                            </label>
                        ))
                    }
                </span>
            </td>
        </tr>
    );
}; 

export default ItemList;