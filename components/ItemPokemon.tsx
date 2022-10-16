import React from 'react';
import Image from "next/image";
import styles from '../styles/Home.module.css'

type ItemProps = {
    item: any;
    index: number;
}

const ItemPokemon = ({item, index}: ItemProps) => {
    const id = ('000' + (index + 1)).slice(-3);
    const pokeName = item.name[0].toUpperCase() + item.name.slice(1)

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
            </span>
        </div>
    );
};

export default ItemPokemon;
