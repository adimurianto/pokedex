import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from '../styles/Types.module.css';
import ItemList from './ItemList';

type ItemProps = {
    data: any;
}

const ItemsType = ({data}: ItemProps) => {
    return (
        <div className={styles.cards}>
            <table className={styles.card_body}>
                {
                    (
                        data ?
                            data.pokemon.slice(0, 10).map((item:any, index:number) => (
                                <ItemList key={index} name={item.pokemon.name} url={item.pokemon.url} />
                            ))
                        :
                            ''
                    )
                }
            </table>
        </div>
    );
}; 

export default ItemsType;