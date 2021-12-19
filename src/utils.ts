const GET_IMG_URL = 'https://image.tmdb.org/t/p'
export function getBackgroundImg (img = '', size = 'original') {
  return `${GET_IMG_URL}/${size}/${img}`
}
