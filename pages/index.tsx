import Layout from "../components/Layout";

export default function Home(initialPokemon: any) {
    console.log(initialPokemon);
    return (
      <Layout>
        <h1>Home</h1>
      </Layout>
    )
}

export async function getStaticProps(context: any) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const initialPokemon = await response.json();

    return {
        props: {
            initialPokemon
        }
    }
}