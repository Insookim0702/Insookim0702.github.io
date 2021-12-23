import styled from 'styled-components'
import { motion } from 'framer-motion'
import { getBackgroundImg } from '../utils'
import { iMovie } from '../api'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { PHome } from './Slider'
const Container = styled(motion.div)<{ img: string }>`
  background-color: gray;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  position: relative;
  height: 150px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`

const BoxVariants = {
  hover: {
    scale: 1.3,
    y: -40,
    transition: {
      type: 'tween',
      duration: 0.1,
      delay: 0.1
    }
  }
}

interface IContentData {
  contentData: iMovie
  sliderType: PHome['sliderType']
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.3
    }
  }
}
const Info = styled(motion.div)`
  background-color: ${props => props.theme.dark.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  padding: 10px 0;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`
function Box (pData: IContentData) {
  const history = useHistory()
  const isMatchTv = useRouteMatch('/tv')?.url === '/tv'
  const { contentData, sliderType } = pData
  function showContentDetail (contentId: number) {
    history.push(`/${isMatchTv ? 'tv' : 'movie'}/${String(contentId)}`)
  }
  return (
    <Container
      variants={BoxVariants}
      whileHover={'hover'}
      transition={{ type: 'tween' }}
      img={getBackgroundImg(contentData.backdrop_path, 'w500')}
      onClick={() => showContentDetail(contentData.id)}
      layoutId={`contents-${sliderType}-${contentData.id}`}
    >
      <Info variants={infoVariants}>
        <h4>{isMatchTv ? contentData.name : contentData.title}</h4>
      </Info>
    </Container>
  )
}

export default Box
