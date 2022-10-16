import React from 'react';
import Head from "next/head";
import Image from "next/image";
import { NextPage } from 'next';
import styles from '../styles/Components.module.css'
import i18n from '../i18n'
import Link from 'next/link'
import { useRouter } from 'next/router'

type LayoutProps = {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Head>
                <title>PokeDex</title>
                <meta name="description" content="PokeDex App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <span className={styles.navbar_top}>
                <select name='language' className={styles.selectlang}>
                    <option value="en">English</option>
                    <option value="id">Indonesian</option>
                </select>
                </span>

                <nav className={styles.navbar}>
                <Image 
                    src={require("../assets/logo.png")} 
                    className={styles.logo} 
                    alt="logo"
                    width="72px"
                    height="28px"
                />

                <div className={styles.listmenu}>
                    <Link href={i18n.t("link")+'/'}>
                    <span className={router.asPath !== "/type" ? styles.menu_active : styles.menu}>Home</span>
                    </Link>
                    <Link href={i18n.t("link")+'/type'}>
                    <span className={router.asPath == "/type" ? styles.menu_active : styles.menu}>Pokemon Type</span>
                    </Link>
                </div>
                </nav>
            </header>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
