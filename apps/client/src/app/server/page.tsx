export default async function About() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/squirtle');
  const data = await res.json();

  return <h1>{data.name}</h1>;
}
