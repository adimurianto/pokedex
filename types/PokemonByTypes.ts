export interface Item {
    name: string
    url: string
}

export interface pokemon {
    pokemon: Item
    slot: number
}

export interface PokemonByTypes {
    pokemon: pokemon[]
}