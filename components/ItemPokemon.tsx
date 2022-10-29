import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from '../styles/Home.module.css';
import axios from "axios";
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import { typeSelect } from '../utils/typeSelect';
import { concatTypes } from '../utils/concatTypes';
import { Type } from '../types/Pokemon';

type ItemProps = {
    item: {name:'', url:''};
    index: number;
}

interface TypePokemonPageProps {
    types: Type
}

const ItemPokemon = ({item, index}: ItemProps, {types}: TypePokemonPageProps) => {
    const id = ('000' + (index + 1)).slice(-3);
    const { t, i18n } = useTranslation();
    const pokeName = item.name[0].toUpperCase() + item.name.slice(1);

    const [poke, setPoke] = useState(types);
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

    const pokeData = concatTypes(poke);

    const detailPage = () => {
        Router.push({
            pathname: t("link")+'/detail', query: { name: pokeName, id: index+1 }
        });
    }

    return (
        <div className={styles.card} onClick={() => detailPage()}>
            <span className={styles.img_item} >
                <Image
                    alt={item.name}
                    width={400}
                    height={400}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
                />
            </span>
            <span className={styles.body_item}>
                <span>#{id}</span>
                <h2>{pokeName}</h2>
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
            </span>
        </div>
    );
}; 

export default ItemPokemon;
