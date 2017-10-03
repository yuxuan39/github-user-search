import './styles/style.scss'

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-bar')

searchBtn.addEventListener('click', evt => {
  const value = searchInput.value
  getUser(value).then(data => {
      console.log('data', data)
  })
  .catch(err => console.log('err', err))
})

const HOST = 'https://api.github.com/search/users'

const getUser = value => {
  return fetch(`${HOST}?q=${value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*'
    }
  }).then(res => {
    return res.json()
  })
}
