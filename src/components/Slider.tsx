import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { fetchMoviePlayList, fetchTvList, iMovie, iMovies } from '../api'
import { getBackgroundImg } from '../utils'
import { useHistory, useLocation, useRouteMatch } from 'react-router'
import { useQuery } from 'react-query'
const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
`

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* position: absolute; */
  gap: 5px;
`
const LoadingSlide = styled.div`
  width: 100%;
  height: 150px;
`

const Box = styled(motion.div)<{ img: string }>`
  background-color: white;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center;
  height: 150px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${props => props.theme.dark.darker};
  opacity: 0;
  position: absolute;
  width: 91%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`

const BoxVariants = {
  hover: {
    scale: 1.3,
    y: -40,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.3
    }
  }
}

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10
  },
  visible: {
    x: 0
  },
  exit: {
    x: -window.outerWidth - 10
  }
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
const Title = styled.p`
  font-size: 40px;
`

const LeftButton = styled.button`
  font-size: 30px;
  position: absolute;
  height: 100%;
  color: white;
  border: none;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
`

interface PHome {
  type: string
}
function Slider ({ type }: PHome) {
  const isMatchTv = useRouteMatch('/tv')
  const contentType = isMatchTv ? 'tv' : 'movie'
  const { isLoading, data } = useQuery<iMovies>(`tv-${type}`, () =>
    isMatchTv?.isExact ? fetchTvList(type) : fetchMoviePlayList(type)
  )

  const [leaving, setLeaving] = useState(false)
  const [index, setIndex] = useState(0)
  const history = useHistory()
  const offset = 6
  function showContentDetail (movieId: number) {
    history.push(`/${contentType}/${String(movieId)}`)
  }
  function nextList () {
    const thisIndexIsBannerMovieIndex = -1
    const thisValueIsIndexStartValue1 = 1
    if (data) {
      const dataLength = data?.results.length
      const maxIndex = Math.ceil(
        (dataLength + thisIndexIsBannerMovieIndex) / offset
      )
      if (maxIndex <= index + thisValueIsIndexStartValue1) {
        setIndex(0)
        return
      }
      setIndex(prev => prev + 1)
    }
  }
  return (
    <SliderWrapper>
      <Title>{type}</Title>
      <AnimatePresence initial={false} onExitComplete={() => setLeaving(false)}>
        {isLoading && !data ? (
          <LoadingSlide>Loading...</LoadingSlide>
        ) : (
          <>
            <LeftButton onClick={nextList}>&larr;</LeftButton>
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              key={index}
              transition={{
                type: 'tween',
                duration: 1
              }}
            >
              {data?.results
                .slice(offset * index, offset * index + offset)
                .map(contentData => {
                  return (
                    <Box
                      key={contentData.id}
                      variants={BoxVariants}
                      whileHover='hover'
                      transition={{ type: 'tween' }}
                      img={getBackgroundImg(contentData.backdrop_path, 'w500')}
                      onClick={() => showContentDetail(contentData.id)}
                      layoutId={`movie-${type}-${contentData.id}`}
                    >
                      <Info variants={infoVariants}>
                        <h4>
                          {isMatchTv ? contentData.name : contentData.title}
                        </h4>
                      </Info>
                    </Box>
                  )
                })}
            </Row>
          </>
        )}
      </AnimatePresence>
    </SliderWrapper>
  )
}

export default Slider
