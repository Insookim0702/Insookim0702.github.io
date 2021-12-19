import { AnimatePresence, motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { fetchDetail, iMovie } from '../api'

const Overlay = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
`

const Modal = styled(motion.div)`
  background-color: black;
  border-radius: 10px;
  width: ${window.innerWidth < 600 ? '100%' : '60%'};
  height: 90%;
  overflow-y: scroll;
`

interface IGenres {
  id: number
  name: string
}
interface IProductionCompany {
  id: number
  logo_path: string
}

interface IProductionContries {
  iso_3166_1: string
  name: string
}
interface IDetail {
  adult: boolean
  budget: number
  genres: IGenres[]
  homepage: string
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: IProductionCompany[]
  production_countries: IProductionContries[]
  release_date: string
  runtime: number
  status: string
  tagline: string
  video: boolean
  vote_average: number
  vote_count: number
}

const Info = styled.div`
  position: relative;
  top: -80px;
  padding: 0 40px;
`
const Loading = styled.div`
  font-size: 20px;
`
const CorverImg = styled.div<{ bgImg: string }>`
  width: 100%;
  height: 40%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)),
    url(${props => props.bgImg});
  background-size: cover;
  background-position: center center;
`

const MovieTitle = styled.h1`
  font-size: 50px;
`

const MovieInfoWrap = styled.div`
  display: flex;
  max-width: 300px;
  padding: 10px 0;
  span {
    margin-right: 10px;
  }
`

const Adult = styled.div`
  width: 20px;
  height: 20px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  border-radius: 10px;
  background-color: #ff4757;
`
const Student = styled(Adult)`
  background-color: #f79f1f;
`

function caclShowTime (time: number) {
  return `${Math.floor(time / 60)}시간 ${time % 60}분`
}

interface IMovieInfo {
  layoutId: string
  title: string
  bgImg: string
  id: string
}

function MovieDetail ({ layoutId, title, bgImg, id }: IMovieInfo) {
  const history = useHistory()
  const { isLoading, data: detail } = useQuery<IDetail>('detail', () =>
    fetchDetail(id)
  )
  function onClickOverlay () {
    history.push('/')
  }

  return (
    <AnimatePresence>
      <Overlay
        onClick={onClickOverlay}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Modal layoutId={layoutId}>
          <CorverImg bgImg={bgImg} />

          {isLoading ? (
            <Loading>Loading...</Loading>
          ) : (
            <Info>
              <MovieTitle>{title}</MovieTitle>
              <MovieInfoWrap>
                <span>⭐️ {detail?.vote_average}</span>
                <span>{detail?.release_date.substring(0, 4)}</span>
                <span>
                  {detail?.adult ? (
                    <Adult>
                      <p>19</p>
                    </Adult>
                  ) : (
                    <Student>
                      <p>15</p>
                    </Student>
                  )}
                </span>

                <span>{caclShowTime(Number(detail?.runtime))}</span>
              </MovieInfoWrap>
              <h1>{detail?.overview}</h1>
            </Info>
          )}
        </Modal>
      </Overlay>
    </AnimatePresence>
  )
}

export default MovieDetail
