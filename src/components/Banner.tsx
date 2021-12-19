import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { iMovie, iTv } from '../api'
import { getBackgroundImg } from '../utils'

const Loading = styled.div`
  font-size: 100px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BannerWrapper = styled(Loading)<{ img: string }>`
  font-size: 30px;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
    url(${props => props.img});
  background-size: cover;
`

const Title = styled.h2`
  font-size: 70px;
  padding: 0 60px;
  margin-bottom: 20px;
`

const Overview = styled.p`
  font-size: 30px;
  padding: 0 60px;
  width: 64%;
`

interface IBannerInfo {
  data: iMovie
}
function Banner ({ data }: IBannerInfo) {
  const location = useRouteMatch('/tv')

  return (
    <BannerWrapper img={getBackgroundImg(data?.backdrop_path)}>
      <Title>{location?.isExact ? data?.name : data?.title}</Title>
      <Overview>{data?.overview}</Overview>
    </BannerWrapper>
  )
}

export default Banner
