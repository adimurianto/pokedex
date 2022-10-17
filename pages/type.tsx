import Layout from "../components/Layout";

export default function Type(initialPokemon: any) {
    return (
      <Layout>
        <h1>Type</h1>
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