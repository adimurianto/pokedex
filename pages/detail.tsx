import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Detail.module.css";
import axios from "axios";

export default function Detail() {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const name = urlParams.get('name');

    const id_img = ('000' + (id)).slice(-3);

    const [poke, setPoke] = useState(
        {
            weight:"", 
            height:"",
            types: []
        }
    );

    const [err, setErr] = useState(false);

    useEffect(()=>{
        const loadPokemon = async ()=>{
            try{
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPoke(res.data);
                setErr(false);
            }catch(err){
                setErr(true);
            }
        }
        loadPokemon();
    },[id])

    const concat = (result:any)=>{
        let i;
        let str = [];
        for( i in result){
            str.push(result[i].type.name);
        }
        return str;
    }

    const pokeData = concat(poke.types);

    const typeSelect = (type:string)=>{
        switch(type){
            case 'normal':
                return "#a6a877";
                break;
            case 'grass':
                return "#77c850";
                break;
            case 'ground':
                return "#dfbf68";
                break;
            case 'fighting':
                return "#bf3028";
                break;
            case 'rock':
                return "#b8a137";
                break;
            case 'steel':
                return "#b9b7cf";
                break;
            case 'fire':
                return "#ee7f30";
                break;
            case 'electric':
                return "#f7cf30";
                break;
            case 'flying':
                return "#a98ff0";
                break;
            case 'psychic':
                return "#f85687";
                break;
            case 'bug':
                return "#a8b720";
                break;
            case 'dragon':
                return "#6f38f6";
                break;
            case 'water':
                return "#678fee";
                break;
            case 'ice':
                return "#98d5d6";
                break;
            case 'poison':
                return "#a03fa0";
                break;
            case 'dark':
                return "#725847";
                break;
            case 'ghost':
                return "#6e5896";
                break;
            case 'fairy':
                return "#feaec7";
                break;
        }
    }

    return (
      <Layout>
        <div className={styles.detail_body}>
            <div className={styles.img_poke}>
                <Image
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id_img}.png`}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className={styles.detail_desc} >
                <h2>{name}</h2>
                <p><b>Weight :</b> {poke.weight}</p>
                <p><b>Height :</b> {poke.height}</p>
                <p>
                    <b>Type :</b> 
                    <span className={styles.labels}>
                        {
                            pokeData.map((data:string, index:number) => (
                                <label 
                                    className={styles.label}
                                    style={{backgroundColor: typeSelect(data)}}
                                >
                                    {data.toUpperCase()}
                                </label>
                            ))
                        }
                    </span>
                </p>
            </div>
        </div>
      </Layout>
    )
}