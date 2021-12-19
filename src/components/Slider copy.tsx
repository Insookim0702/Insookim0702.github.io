import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { iMovie, iMovies } from '../api'
import { getBackgroundImg } from '../utils'
import { useHistory } from 'react-router'
const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
`

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  gap: 5px;
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

interface PHome {
  data: iMovie[]
}
function Slider ({ data }: PHome) {
  const [leaving, setLeaving] = useState(false)
  const [index, setIndex] = useState(0)
  const history = useHistory()
  const offset = 6
  function showMovieDetail (movieId: number) {
    history.push(`/movie/${String(movieId)}`)
  }
  function nextList () {
    const thisIndexIsBannerMovieIndex = -1
    const thisValueIsIndexStartValue1 = 1
    if (data) {
      const dataLength = data.length
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
      <AnimatePresence initial={false} onExitComplete={() => setLeaving(false)}>
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
          {data
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map(movie => {
              return (
                <Box
                  key={movie.id}
                  variants={BoxVariants}
                  whileHover='hover'
                  transition={{ type: 'tween' }}
                  img={getBackgroundImg(movie.backdrop_path, 'w500')}
                  onClick={() => showMovieDetail(movie.id)}
                  layoutId={`movie-${movie.id}`}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              )
            })}
        </Row>
      </AnimatePresence>
    </SliderWrapper>
  )
}

export default Slider
