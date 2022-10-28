import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from '../styles/Types.module.css';

type ItemProps = {
    key: string;
    data: any;
}

const ItemsType = ({key, data}: ItemProps) => {
    console.log(data);
    return (
        <div className={styles.cards}>
            <div className={styles.card_body}>
                {
                    data.slice(0, 20).map((item:any, index:number) => (
                        <div key={index}>
                            <p>
                                {item.pokemon.name}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}; 

export default ItemsType;