import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { fetchSearchList, iMovie, iMovies } from '../api'
import { getBackgroundImg } from '../utils'
import Adult from '../components/Adult'
import { Loading } from './Home'

const Container = styled.div`
  margin-top: 100px;
`

const CardWrap = styled.div`
  color: white;
  display: grid;
  grid-template-columns: 2fr 8fr;
  background-color: #130f40;
  margin: 10px;
  padding: 10px;
`

const Title = styled.div`
  font-size: 30px;
`

const OverView = styled.div``

const Img = styled.div<{ img: string }>`
  width: 100%;
  height: 200px;
  background-color: gray;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center;
`

const InfoBox = styled.div`
  padding: 0 10px;
`
const Info = styled.div`
  padding: 5px;
  display: flex;
`

const SectionTitle = styled.h1`
  color: white;
  font-size: 40px;
`
const NoData = styled(CardWrap)`
  grid-template-columns: 10fr;
  text-align: center;
  font-size: 30px;
`

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
interface iSlider {
  slider: iMovie
  contentType: string
}
function Card ({ slider, contentType }: iSlider) {
  return (
    <CardWrap>
      <Img img={getBackgroundImg(slider.backdrop_path)}></Img>
      <InfoBox>
        <Title>{contentType === 'tv' ? slider.name : slider.title}</Title>
        <Info>
          <div style={{ marginRight: '10px' }}>
            {`${contentType === 'tv' ? '' : slider.release_date} ⭐️ ${
              slider.vote_average
            }/10 `}
          </div>
          <Adult isAdult={slider.adult || false} />
        </Info>
        <OverView>{slider.overview}</OverView>
      </InfoBox>
    </CardWrap>
  )
}

function Search () {
  const location = useLocation()
  const keyword = new URLSearchParams(location.search)
  const [searchType, setSearchType] = useState('movie')

  const { isLoading: isLoadingMovie, data: movieData } = useQuery<iMovies>(
    `search-movie-${keyword}`,
    () => fetchSearchList('movie', keyword.get('keyword') || '')
  )

  const { isLoading: isLoadingTv, data: tvData } = useQuery<iMovies>(
    `search-tv-${keyword}`,
    () => fetchSearchList('tv', keyword.get('keyword') || '')
  )

  return (
    <Container>
      <Section>
        <div>
          <SectionTitle>Movie Search : {keyword.get('keyword')}</SectionTitle>
          {isLoadingMovie ? (
            <Loading>Loading...</Loading>
          ) : movieData && movieData.results.length > 0 ? (
            movieData?.results.map((slider, idx) => {
              return <Card slider={slider} contentType='movie' />
            })
          ) : (
            <NoData>No Data</NoData>
          )}
        </div>
        <div>
          <SectionTitle>Tv Search : {keyword.get('keyword')}</SectionTitle>
          {isLoadingTv ? (
            <Loading>Loading...</Loading>
          ) : tvData && tvData.results.length > 0 ? (
            tvData?.results.map((slider, idx) => {
              return <Card slider={slider} contentType='tv' />
            })
          ) : (
            <NoData>No Data</NoData>
          )}
        </div>
      </Section>
    </Container>
  )
}

export default Search
