import styled from 'styled-components'
import { useQuery } from 'react-query'
import { useRouteMatch } from 'react-router'
import { fetchTvList, iMovie, iMovies } from '../api'
import { Container, Loading } from './Home'
import Banner from '../components/Banner'
import Slider from '../components/Slider'
import MovieDetail from '../components/ContentDetail'
import { getBackgroundImg } from '../utils'

function Tv () {
  const sliderList = ['popular', 'airing_today', 'on_the_air']
  const { isLoading, data } = useQuery<iMovies>('tv-popular', () =>
    fetchTvList('popular')
  )

  const matchTvDetail = useRouteMatch<{ tvId: string }>('/tv/:tvId')
  const clickedTv = data?.results.find(
    tv => tv.id === Number(matchTvDetail?.params.tvId)
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
          {matchTvDetail && clickedTv ? (
            <MovieDetail
              id={String(clickedTv?.id)}
              layoutId={`movie-${matchTvDetail?.params.tvId}`}
              title={clickedTv?.title + ''}
              bgImg={getBackgroundImg(clickedTv?.backdrop_path, 'w500')}
            />
          ) : null}
        </>
      )}
    </Container>
  )
}

export default Tv
