'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function About() {
  const { data, error } = useSWR(
    'https://pokeapi.co/api/v2/pokemon/pikachu',
    fetcher
  )
  console.log(error, data)
  if (error) return 'Failed to load'
  if (!data) return 'Loading...'

  return <h1>{data.name}</h1>
}
