import axios from "axios";
import { useEffect, useState } from "react";
import ItemsType from "../components/ItemsType";
import Layout from "../components/Layout";
import styles from '../styles/Types.module.css';

export default function Type(props: any) {
  const [types, setTypes] = useState(props.initialPokemonTypes);

  const typeSelected = types.results[0].name[0].toUpperCase() + types.results[0].name.substr(1);
  const [typeSelect, setTypeSelect] = useState(typeSelected);

  const [poke, setPoke] = useState();

  useEffect(()=>{
    const loadPokemon = async ()=>{
        try{
            const res = await axios.get(`https://pokeapi.co/api/v2/type/${typeSelect.toLowerCase()}`);
            setPoke(res.data.pokemon);
        }catch(err){
            let message = 'Unknown Error'
            if (err instanceof Error) message = err.message
            console.log(err);
        }
    }
    loadPokemon();
  },[typeSelect]); 
  
  console.log(poke);
  return (
    <Layout>
      <div className={styles.body_types}>
        <div className={styles.sidebar}>
          <h4>Pokemon Type</h4>
          <ul>
            {
              types.results.map((type: any, index: number) => (
                <li 
                  className={styles.list_type}
                  key={index}
                  onClick={() => setTypeSelect(type.name)}
                  style={(typeSelect.toLowerCase() == type.name ? {fontWeight:"bold", color:"#E6AB09"} : {})}
                >
                  {
                    type.name[0].toUpperCase() + type.name.substr(1)
                  }  
                </li>
              ))
            }
          </ul>
        </div>

        <div className={styles.contents}>
          <h2>{`Pokemon with Type ${typeSelect[0].toUpperCase() + typeSelect.substr(1)}`}</h2>
          <ItemsType key={typeSelect} data={poke} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  try {
    const result = await axios.get("https://pokeapi.co/api/v2/type");
    const initialPokemonTypes = result.data;
    return {
        props: {
          initialPokemonTypes
        }
    }
  } catch (error) {
    return {
        props: {}
    }
  }
}