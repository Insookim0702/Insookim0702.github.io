import { boolean } from 'yargs'

const API_KEY = 'd277e1b4016230df2827711ffe3c7c59'
const BASE_URL = 'https://api.themoviedb.org/3'

export interface iMovies {
  dates: { maximum: string; minimum: string }
  page: number
  results: iMovie[]
  total_pages: number
  total_results: number
}
export interface iMovie {
  adult: false
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
export function fetchMoviePlayList () {
  return fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then(resolve => resolve.json())
}

export function fetchDetail (movieId: string) {
  return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(
    resolve => resolve.json()
  )
}
