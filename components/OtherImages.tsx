import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from '../styles/Detail.module.css';

type ItemProps = {
    key: number;
    link: string;
}

const OtherImages = ({key, link}: ItemProps) => {
    console.log(link);
    return (
        <div key={key} className={styles.list_img}>
            <Image
                src={link}
                alt={'img-'+key}
                width={100}
                height={100}
            />
        </div>
    );
}; 

export default OtherImages;
