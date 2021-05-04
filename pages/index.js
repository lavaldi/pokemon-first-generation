import NextLink from 'next/link';
import Layout from '../components/layout'

export default function Home ({ allPokemon }) {
  return (
    <Layout title="Pokemon First Generation">
        <h1 className="text-4xl mb-8 text-center">
          Pokemon First Generation
        </h1>
        <ul className="space-y-2">
          {allPokemon.map((pokemon, index) => (
            <li key={index}>
              <NextLink href={`/pokemon?id=${index + 1}`}>
                <a className="border p-4 border-gray-100 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                  <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mr-3" />
                  <span className="mr-2 font-bold">{index + 1}</span>
                  {pokemon.name}
                </a>
              </NextLink>
            </li>
          ))}
        </ul>
    </Layout>
  )
}

// for SSG: Fetch data at build time.
// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps (context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()
    const allPokemon = results.map((result, index) => {
      const paddedIndex = ('00' + (index + 1)).slice(-3)
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        image
      }
    })
    return {
      props: { allPokemon }
    }
  } catch (error) {
    console.error(error)
  }
}
