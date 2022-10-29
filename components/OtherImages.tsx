import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from '../styles/Detail.module.css';

type ItemProps = {
    link: string;
}

const OtherImages = ({link}: ItemProps) => {
    console.log(link);
    return (
        <div className={styles.list_img}>
            <Image
                src={link}
                alt="other images"
                width={100}
                height={100}
            />
        </div>
    );
}; 

export default OtherImages;
