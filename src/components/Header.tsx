import styled from 'styled-components'

const Nav = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.dark.veryDark};
`
function LeftCol () {
  return <></>
}
function RightCol () {
  return <></>
}
function Header () {
  return (
    <Nav>
      <LeftCol />
      <RightCol />
    </Nav>
  )
}

export default Header
