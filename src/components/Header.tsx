import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { motion, useAnimation, useViewportScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Nav = styled(motion.div)`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;
  z-index: 2;
`

const Wrap = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const Logo = styled.p`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  font-size: 40px;
  font-weight: 900;
  cursor: pointer;
  color: ${props => props.theme.red};
`

const LinkButton = styled(Link)`
  color: white;
  text-decoration: none;
`

const LinkBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin: 20px;
`
const NowBar = styled(motion.div)`
  width: 100%;
  height: 6px;
  background-color: ${props => props.theme.red};
  position: absolute;
  bottom: 0;
`

const Input = styled(motion.input)`
  transform-origin: right;
  background-color: transparent;
  border: none;
  width: 100%;
  border-bottom: 2px solid white;
  font-size: 20px;
  color: white;
  z-index: 1;
`
const RightWrap = styled(Wrap)`
  /* justify-content: flex-end; */
  margin-right: 120px;
`

const SearchBoxWrap = styled(motion.div)`
  /* background-color: transparent; */
  position: absolute;
  width: 200px;
  height: 30px;
  border: 1px solid gray;
  /* color: ${props => props.theme.red}; */
`
const SearchBtn = styled(motion.button)`
  z-index: 1;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  &:hover {
    scale: 1.2;
  }
`

interface IForm {
  keyword: string
}

function LeftCol () {
  const MatchMoviePage = useRouteMatch('/')
  const MatchMovieDetailPage = useRouteMatch('/movie/:movieId')
  const MatchTvPage = useRouteMatch('/tv')
  const MatchTvDetailPage = useRouteMatch('/tv/:tvId')
  const history = useHistory()
  function isMovie () {
    if (
      (MatchMoviePage || MatchMovieDetailPage) &&
      !MatchTvPage &&
      !MatchTvDetailPage
    ) {
      return true
    } else {
      return false
    }
  }
  return (
    <Wrap>
      <Logo onClick={() => history.push('/')}>Netflix</Logo>
      <LinkBox>
        <LinkButton to='/'>Home</LinkButton>
        {isMovie() ? <NowBar layoutId='nowBar'></NowBar> : null}
      </LinkBox>
      <LinkBox>
        <LinkButton to='/tv'>Tv Show</LinkButton>
        {!isMovie() ? <NowBar layoutId='nowBar'></NowBar> : null}
      </LinkBox>
    </Wrap>
  )
}
function RightCol () {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { register, handleSubmit } = useForm<IForm>()
  const history = useHistory()
  function onValid (data: IForm) {
    history.push(`/search?keyword=${data.keyword}`)
  }
  return (
    <RightWrap>
      {/* <SearchBoxWrap
        initial={{ opacity: 0 }}
        animate={{ opacity: isSearchOpen ? 1 : 0 }}
      ></SearchBoxWrap> */}
      <SearchBtn
        animate={{ x: isSearchOpen ? -7 : 150 }}
        transition={{ type: 'linear' }}
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        Search
      </SearchBtn>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          // variants={inputVariant}
          // initial={'start'}
          animate={{ scaleX: isSearchOpen ? 1 : 0 }}
          transition={{ type: 'linear' }}
          type='text'
          placeholder='search movie or tv show...'
          {...register('keyword', {
            required: 'input a keyword for searching.',
            minLength: { value: 2, message: 'input 2' }
          })}
        />
      </form>
    </RightWrap>
  )
}
function Header () {
  const { scrollY } = useViewportScroll()
  const navAnimation = useAnimation()
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start({ backgroundColor: 'rgba(0, 0, 0, 1)' })
      } else {
        navAnimation.start({
          backgroundColor: 'rgba(0, 0, 0, 0)'
        })
      }
    })
  }, [scrollY])
  return (
    <Nav animate={navAnimation}>
      <LeftCol />
      <RightCol />
    </Nav>
  )
}

export default Header
