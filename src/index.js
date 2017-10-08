import './styles/style.scss'

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-bar')
// const username = document.getElementById('username')
// const photo = document.getElementById('photo')
// const following = document.getElementById('following')
const user = document.getElementById('user')

searchBtn.addEventListener('click', evt => {
  const value = searchInput.value
  getUser(value)
    .then(rawData => {
      const data = rawData.items
      // console.log(data[0])
      const getData = data
        .map(mainData => {
          return {
            login: mainData.login,
            avatar_url: mainData.avatar_url
          }
        })
        .map(data => {
          let container = document.createElement('div')
          container.classList = 'container'
          let p = document.createElement('p')
          p.innerText = data.login
          
          let img = document.createElement('img')
          let url = data.avatar_url
          img.src = url
          container.appendChild(p)
          container.appendChild(img)
          user.appendChild(container)
        })

      // userdata.innerText = 'getData[0].login'
      // photo.innerHTML = '<a href="#"><img src="mdn-logo-sm.png" alt="MDN"></a>'
    })
    .catch(err => console.log('err', err))
})

const HOST = 'https://api.github.com/search/users'

const getUser = value => {
  return fetch(`${HOST}?q=${value}&per_page=48&page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}
