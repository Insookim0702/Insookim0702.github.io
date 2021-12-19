import { useQuery } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { fetchMoviePlayList, iMovies } from '../api'
import { getBackgroundImg } from '../utils'
import { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import MovieDetail from '../components/MovieDetail'

const Container = styled.div<{ isDark: boolean }>`
  min-height: 200vh;
  color: ${props =>
    props.isDark ? props.theme.dark.txtColor : props.theme.light.txtColor};
`

const Loading = styled.div`
  font-size: 100px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Banner = styled(Loading)<{ img: string }>`
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
const Slider = styled.div`
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

function Home () {
  const { isLoading, data } = useQuery<iMovies>('movies', fetchMoviePlayList)
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const history = useHistory()
  const matchMovieDetail = useRouteMatch<{ movieId: string }>('/movie/:movieId')
  const clickedMovie = data?.results.find(
    movie => movie.id === Number(matchMovieDetail?.params.movieId)
  )
  const offset = 6
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

  function showMovieDetail (movieId: number) {
    history.push(`/movie/${String(movieId)}`)
  }
  function toggleLeaving () {
    console.log(123)
  }

  return (
    <Container isDark={true}>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Banner
            onClick={() => {
              if (leaving) return
              setLeaving(true)
              nextList()
            }}
            img={getBackgroundImg(data?.results[0].backdrop_path)}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>

          <Slider>
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
                {data?.results
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
          </Slider>
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
