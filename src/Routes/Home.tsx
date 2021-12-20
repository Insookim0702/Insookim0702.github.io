import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchMoviePlayList, iMovies } from '../api'
import Banner from '../components/Banner'
import Slider from '../components/Slider'

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
                return <Slider key={idx} sliderType={slider} />
              })}
            </>
          ) : null}
        </>
      )}
    </Container>
  )
}

export default Home
