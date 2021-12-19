import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchMoviePlayList, iMovies } from '../api'
import { getBackgroundImg } from '../utils'
import { useHistory, useRouteMatch } from 'react-router'
import MovieDetail from '../components/ContentDetail'
import Banner from '../components/Banner'
import Slider from '../components/Slider'
import { AnimatePresence } from 'framer-motion'

export const Container = styled.div<{ isDark: boolean }>`
  min-height: 200vh;
  color: ${props =>
    props.isDark ? props.theme.dark.txtColor : props.theme.light.txtColor};
`

export const Loading = styled.div`
  font-size: 100px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Home () {
  const sliderList = ['popular', 'now_playing', 'upcoming']
  const { isLoading, data } = useQuery<iMovies>('movie-popular', () =>
    fetchMoviePlayList('popular')
  )
  const matchMovieDetail = useRouteMatch<{ movieId: string }>('/movie/:movieId')
  const clickedMovie = data?.results.find(
    movie => movie.id === Number(matchMovieDetail?.params.movieId)
  )

  return (
    <Container isDark={true}>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          {data ? (
            <>
              <Banner data={data.results[0]} />
              {sliderList.map((slider, idx) => {
                return <Slider key={idx} type={slider} />
              })}
            </>
          ) : null}
          {matchMovieDetail && clickedMovie ? (
            <MovieDetail
              id={String(clickedMovie?.id)}
              layoutId={`movie-${matchMovieDetail?.params.movieId}`}
              title={clickedMovie?.title + ''}
              bgImg={getBackgroundImg(clickedMovie?.backdrop_path, 'w500')}
            />
          ) : null}
        </>
      )}
    </Container>
  )
}

export default Home
