import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Detail.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import { IPokemon, Sprites } from "../types/Pokemon";
import { typeSelect } from "../utils/typeSelect";
import { concatTypes } from "../utils/concatTypes";
import { concatAbilities } from "../utils/concatAbilities";
import OtherImages from "../components/OtherImages";

interface PokemonPageProps {
    pokemon: IPokemon,
}

export default function Detail<PokemonPageProps>(pokemon:any, sprites:any) {
    const { t, i18n } = useTranslation();
    const { query } = useRouter();
    const id = query.id;
    const name = query.name;

    const id_img = ('000' + (id)).slice(-3);
    const [poke, setPoke] = useState(pokemon);

    const otherImg:any = [];
    const [otherImages, setOtherImages] = useState(otherImg);

    const [err, setErr] = useState(false);

    useEffect(()=>{
        const loadPokemon = async ()=>{
            try{
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPoke(res.data);

                const resOtherImg = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${id}`);
                let images = resOtherImg.data.sprites;
                images = Object.values(images);
                setOtherImages(images);

                setErr(false);
            }catch(err){
                let message = 'Unknown Error'
                if (err instanceof Error) message = err.message
                console.log(err);
            }
        }
        loadPokemon();
    },[id]);

    const listType = concatTypes(poke.types);
    const listAbility = concatAbilities(poke.abilities);

    return (
      <Layout>
        <div className={styles.detail_body}>
            <div className={styles.img_poke}>
                <Image
                    alt={name?.toString()}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id_img}.png`}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className={styles.detail_desc} >
                <h2>{name}</h2>
                <div style={{display: 'flex', width: '100%'}}>
                    <span style={{width:'50%'}}><b>{t("desc_weight")} :</b> {poke.weight}</span>
                    <span style={{width: '50%'}}><b>{t("desc_height")} :</b> {poke.height}</span>
                </div>
                <div style={{display: 'flex', width: '100%'}}>
                    <b>Abilities :</b>
                    <ul style={{float: 'left', marginBlockStart: '0'}}>
                        {
                            listAbility.map((data:string, index:number) =>(
                                <li key={index}>{ data }</li>
                            ))
                        }
                    </ul>
                </div>
                <div style={{display: 'flex', width: '100%'}}>
                    <b>{t("desc_type")} :</b> 
                    <span className={styles.labels} style={{float: 'left', marginBlockStart: '0 !important'}}>
                        {
                            listType.map((data:string, index:number) => (
                                <label 
                                    key={index}
                                    className={styles.label}
                                    style={{backgroundColor: typeSelect(data.toLowerCase())}}
                                >
                                    { data }
                                </label>
                            ))
                        }
                    </span>
                </div>
            </div>
        </div>

        <div className={styles.other_images}>
            <h4>Other Images :</h4>
            <div className={styles.images}>
                {
                    otherImages.map((data:string, index:number) =>(
                        (data !== null ? <OtherImages key={index} link={data} /> : '')
                    ))
                }
            </div>
        </div>
      </Layout>
    )
}