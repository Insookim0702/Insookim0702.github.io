import { useLocation } from 'react-router-dom'

function Search () {
  const location = useLocation()
  const keyword = new URLSearchParams(location.search)
  console.log(keyword.get('keyword'))

  return <></>
}

export default Search
