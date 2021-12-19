import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { motion, useAnimation, useViewportScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

const Nav = styled(motion.div)`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 8fr 2fr;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
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
  border-bottom: 2px solid gray;
  color: white;
  z-index: 1;
`
const RightWrap = styled(Wrap)`
  justify-content: flex-end;
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
`
function LeftCol () {
  const homeMatch = useRouteMatch('/')
  const tvMatch = useRouteMatch('/tv')
  return (
    <Wrap>
      <Logo>Netflix</Logo>
      <LinkBox>
        <LinkButton to='/'>Home</LinkButton>
        {homeMatch ? <NowBar layoutId='nowBar'></NowBar> : null}
      </LinkBox>
      <LinkBox>
        <LinkButton to='/Tv'>Tv Show</LinkButton>
        {tvMatch ? <NowBar layoutId='nowBar'></NowBar> : null}
      </LinkBox>
    </Wrap>
  )
}
function RightCol () {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <RightWrap>
      <SearchBoxWrap
        initial={{ opacity: 0 }}
        animate={{ opacity: isSearchOpen ? 1 : 0 }}
      ></SearchBoxWrap>
      <SearchBtn
        animate={{ x: isSearchOpen ? 0 : 150 }}
        transition={{ type: 'linear' }}
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        Search
      </SearchBtn>
      <Input
        // variants={inputVariant}
        // initial={'start'}
        animate={{ scaleX: isSearchOpen ? 1 : 0 }}
        transition={{ type: 'linear' }}
        type='text'
        placeholder='search movie or tv show...'
      />
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
