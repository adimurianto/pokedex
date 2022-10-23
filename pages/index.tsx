import Layout from "../components/Layout";
import { useRef, useState } from "react";
import styles from '../styles/Home.module.css';
import ItemPokemon from "../components/ItemPokemon";
import axios from "axios";
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import Image from "next/image";

export let page_data = 0;
export const length_item = 9;

export default function Home(props: any) {
  const [pokemon, setPokemon] = useState(props.initialPokemon);
  const [page, setPage] = useState(0);
  const [offset, setOffet] = useState(0);
  const [itemlength, setLength] = useState(length_item);
  const { t, i18n } = useTranslation();
  const PokedexRef:any = useRef(null);
  page_data = page;
  
  const gotoPokedex = () => {
    window.scrollTo({
      top: PokedexRef.current.offsetTop,
      behavior: "smooth",
    });
  }

  const fetchPokemon = async (url:string, next:boolean) => {
    let nextPokemon = {};

    try {
      const result = await axios.get(url);
      nextPokemon = result.data;
    } catch (error) {
      nextPokemon = {}
    }

    setOffet(next ? offset + itemlength : offset - itemlength);
    setPokemon(nextPokemon);
  }

  const changePerPage = async (count: any) => {
    const num_length = parseInt(count);
    setLength(num_length);
    let newPokemon = {};

    try {
      const url = "https://pokeapi.co/api/v2/pokemon/?limit="+num_length+"&offset=0";
      const result = await axios.get(url);
      newPokemon = result.data;
    } catch (error) {
      newPokemon = {}
    }

    setOffet(0);
    setPokemon(newPokemon);
  }

  return (
    <Layout>
      <article className={styles.frame_banner}>
        <section className={styles.banner}>
          <h1>{t("banner_first")}</h1>
          <h4>{t("banner_seconds")}</h4>
          <button onClick={() => gotoPokedex()}>{t("banner_btn")}</button>
        </section>
        <section className={styles.banner}>
          <Image 
              src={require("../assets/banner.png")} 
              className={styles.logo} 
              alt="logo"
              width="100%"
              height="100%"
          />
        </section>
      </article>

      <article className={styles.container}>
        <div className={styles.cards_header} ref={PokedexRef}>
          <strong><h1>PokèDex</h1></strong> 
          <span>{t("cards_head_desc")}</span><br/>
          <span>{pokemon.count} Pokemon</span>
        </div>

        <div className={styles.cards_body} >
          {
            pokemon.results.map((monster:any, index:number) => (
              <ItemPokemon key={index + offset} item={monster} index={index + offset}/>
            ))
          }
        </div>

        <div className={styles.pagination}>
          <span>Per Page :</span>
          <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changePerPage(event.target.value)} className={styles.selection}>
            <option value="9">9</option>
            <option value="15">15</option>
            <option value="21">21</option>
          </select>
          
          <button disabled={!pokemon.previous} className="disabled:bg-gray-500 px-3 py-1 bg-slate-900" onClick={() => fetchPokemon(pokemon.previous, false)}>
            Prev
          </button>
          <button disabled={!pokemon.next} className="disabled:bg-gray-500 px-3 py-1 bg-slate-900" onClick={() => fetchPokemon(pokemon.next, true)}>
            Next
          </button>
          <span>Total Data : {pokemon.count}</span>
        </div>
      </article>

    </Layout>
  )
}

export async function getStaticProps(context: any) {
  try {
    const result = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit="+length_item+"&offset="+page_data);
    const initialPokemon = result.data;
    return {
        props: {
          initialPokemon
        }
    }
  } catch (error) {
    return {
        props: {}
    }
  }
}