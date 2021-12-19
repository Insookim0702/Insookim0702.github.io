import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { fetchSearchList, iMovies } from '../api'
import { getBackgroundImg } from '../utils'
import Adult from '../components/Adult'
import { Loading } from './Home'

const Container = styled.div`
  margin-top: 100px;
`

const Card = styled.div`
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

const NoData = styled(Card)`
  grid-template-columns: 10fr;
  text-align: center;
  font-size: 30px;
`

function Search () {
  const location = useLocation()
  const keyword = new URLSearchParams(location.search)
  const [searchType, setSearchType] = useState('movie')

  const { isLoading, data } = useQuery<iMovies>(
    `search-${searchType}-${keyword}`,
    () => fetchSearchList(searchType, keyword.get('keyword') || '')
  )

  return (
    <Container>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : data && data.results.length > 0 ? (
        data?.results.map((slider, idx) => {
          return (
            <Card>
              <Img img={getBackgroundImg(slider.backdrop_path)}></Img>
              <InfoBox>
                <Title>{slider.title}</Title>
                <Info>
                  <div style={{ marginRight: '10px' }}>
                    {`${slider.release_date} ⭐️ ${slider.vote_average}/10 `}
                  </div>

                  <Adult isAdult={slider.adult || false} />
                </Info>

                <OverView>{slider.overview}</OverView>
              </InfoBox>
            </Card>
          )
        })
      ) : (
        <NoData>No Data</NoData>
      )}
    </Container>
  )
}

export default Search
