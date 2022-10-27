import axios from "axios";
import { useState } from "react";
import Layout from "../components/Layout";
import styles from '../styles/Types.module.css';

export default function Type(props: any) {
  const [types, setTypes] = useState(props.initialPokemonTypes);
  const typeSelected = types.results[0].name[0].toUpperCase() + types.results[0].name.substr(1);
  const [typeSelect, setTypeSelect] = useState(typeSelected);
  
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
            <h2>{`Pokemon with Type ${typeSelect}`}</h2>
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