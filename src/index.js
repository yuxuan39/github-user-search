import './styles/style.scss'

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-bar')

searchBtn.addEventListener('click', evt => {
  const value = searchInput.value
  getUser(value)
    .then(rawData => {
      const data = rawData.items
      console.log(data[0])
      const getData = data.map(mainData => {
        return {
          avatar_url: mainData.avatar_url,
          following_url: mainData.following_url
        }
      })
      console.log(getData)
    })
    .catch(err => console.log('err', err))
})

const HOST = 'https://api.github.com/search/users'

const getUser = value => {
  return fetch(`${HOST}?q=${value}&per_page=50&page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}
