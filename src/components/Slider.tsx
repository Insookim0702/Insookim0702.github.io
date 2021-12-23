import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { fetchMoviePlayList, fetchTvList, iMovie, iMovies } from '../api'
import { getBackgroundImg } from '../utils'
import { useRouteMatch } from 'react-router'
import ContentDetail from '../components/ContentDetail'
import { useQuery } from 'react-query'
import Box from './Box'

export interface PHome {
  sliderType: string
}

const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
  height: 200px;
`

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  gap: 5px;
`
const LoadingSlide = styled.div`
  width: 100%;
  height: 150px;
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

const Title = styled.p`
  font-size: 40px;
  margin-left: 35px;
`

const LeftButton = styled(motion.button)`
  font-size: 40px;
  height: 100%;
  position: absolute;
  right: 0;
  background: linear-gradient(to right, transparent, black);
  color: white;
  cursor: pointer;
  z-index: 1;
  border: none;
`

const RightButton = styled(LeftButton)`
  left: 0;
  background: linear-gradient(to left, transparent, black);
`

const offset = 6
function Slider ({ sliderType }: PHome) {
  const isMatchTv = useRouteMatch('/tv')?.url === '/tv'
  const matchTvDetail = useRouteMatch<{ tvId: string }>('/tv/:tvId')
  const matchMovieDetail = useRouteMatch<{ movieId: string }>('/movie/:movieId')
  const [leaving, setLeaving] = useState(false)
  const [index, setIndex] = useState(0)
  const { isLoading, data } = useQuery<iMovies>(`tv-${sliderType}`, () =>
    isMatchTv ? fetchTvList(sliderType) : fetchMoviePlayList(sliderType)
  )

  const id = isMatchTv
    ? matchTvDetail?.params.tvId
    : matchMovieDetail?.params.movieId
  const clickedContent = data?.results.find(
    content => String(content.id) === id
  )

  function nextList () {
    const thisValueIsIndexStartValue1 = 1 // 1부터 시작
    if (data) {
      const dataLength = data?.results.length
      const maxIndex = Math.ceil(dataLength / offset)
      if (maxIndex <= index + thisValueIsIndexStartValue1) {
        setIndex(0)
        return
      }
      setIndex(prev => prev + 1)
    }
  }

  function prevList () {
    if (data) {
      const dataLength = data?.results.length
      const maxIndex = Math.ceil(dataLength / offset)
      if (index === 0) {
        setIndex(maxIndex - 1)
        return
      }
      setIndex(prev => prev - 1)
    }
  }

  return (
    <SliderWrapper>
      <Title>{sliderType}</Title>
      {isLoading && !data ? (
        <LoadingSlide>Loading...</LoadingSlide>
      ) : (
        <>
          <AnimatePresence
            initial={false}
            onExitComplete={() => setLeaving(false)}
          >
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
              <RightButton whileHover={{ fontSize: '50px' }} onClick={prevList}>
                &larr;
              </RightButton>
              {data?.results
                .slice(offset * index, offset * index + offset)
                .map(contentData => {
                  return (
                    <Box
                      key={contentData.id}
                      contentData={contentData}
                      sliderType={sliderType}
                    />
                  )
                })}
              <LeftButton whileHover={{ fontSize: '50px' }} onClick={nextList}>
                &rarr;
              </LeftButton>
            </Row>
            {(matchMovieDetail || matchTvDetail) && clickedContent ? (
              <ContentDetail
                id={String(clickedContent?.id)}
                layoutId={
                  isMatchTv
                    ? `${matchTvDetail?.params.tvId}`
                    : `${matchMovieDetail?.params.movieId}`
                }
                title={
                  isMatchTv
                    ? clickedContent?.name + ''
                    : clickedContent?.title + ''
                }
                bgImg={getBackgroundImg(clickedContent?.backdrop_path, 'w500')}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </SliderWrapper>
  )
}

export default Slider
