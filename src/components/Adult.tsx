import styled from 'styled-components'

const AdultBox = styled.div`
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
const Student = styled(AdultBox)`
  background-color: #f79f1f;
`
interface iAdult {
  isAdult: boolean
}

function Adult ({ isAdult }: iAdult) {
  return isAdult ? (
    <AdultBox>
      <p>19</p>
    </AdultBox>
  ) : (
    <Student>
      <p>15</p>
    </Student>
  )
}

export default Adult
