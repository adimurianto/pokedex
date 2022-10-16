import Layout from "../components/Layout";
import { useState } from "react";
import styles from '../styles/Home.module.css'
import ItemPokemon from "../components/ItemPokemon";

export let page_data = 0;
export const length_item = 9;

export default function Home(props: any) {
  const [pokemon, setPokemon] = useState(props.initialPokemon);
  const [page, setPage] = useState(0);
  const num_data = page * length_item;
  page_data = page;

  return (
    <Layout>
      <article>
        <h1>PokèDexmon</h1>
      </article>

      <article className={styles.container} >
        <div className={styles.cards_header}>
          <strong><h1>PokèDex</h1></strong>
          <span>All Generation Totalling</span><br/>
          <span>{pokemon.count} Pokemon</span>
        </div>

        <div className={styles.cards_body} >
          {
            pokemon.results.map((monster:any, index:any) => (
              <ItemPokemon item={monster} index={++index + num_data}/>
            ))
          }
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit="+length_item+"&offset="+page_data);
  const initialPokemon = await response.json();

  return {
    props: {
      initialPokemon
    }
  }
}