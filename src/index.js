import './styles/style.scss'

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-bar')
// const username = document.getElementById('username')
// const photo = document.getElementById('photo')
// const following = document.getElementById('following')
const user = document.getElementById('user')
const loadBtn = document.getElementById('load-btn')

const clearUsers = () => {
  user.innerHTML = ''
}

searchBtn.addEventListener('click', evt => {
  renderUsers()
})

document.body.addEventListener('keydown', evt => {
  if (evt.keyCode === 13) {
    renderUsers()
  }
})

const renderUsers = () => {
  clearUsers()

  const value = searchInput.value
  getUsers(value)
    .then(rawData => {
      const data = rawData.items
      const getData = data
        .map(mainData => {
          return {
            login: mainData.login,
            avatar_url: mainData.avatar_url
          }
        })
        .map(aUser => {
          renderAUser(aUser)
        })
      loadBtn.style.visibility = 'visible'
      // userdata.innerText = 'getData[0].login'
      // photo.innerHTML = '<a href="#"><img src="mdn-logo-sm.png" alt="MDN"></a>'
    })
    .catch(err => console.log('err', err))
}

const renderAUser = aUser => {
  let container = document.createElement('div')
  container.classList = 'container'
  let p = document.createElement('p')
  p.innerText = aUser.login

  let img = document.createElement('img')
  let url = aUser.avatar_url
  img.src = url
  container.appendChild(p)
  container.appendChild(img)
  user.appendChild(container)
}

loadBtn.addEventListener('click', evt => {
  const value = searchInput.value
  nextUserPage(value)
    .then(rawData => {
      const data = rawData.items
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

const getUsers = value => {
  const url = `${HOST}?q=${value}+type:user+in:login&per_page=48&page=1`
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}

let renderPage = 1

const nextUserPage = value => {
  renderPage = renderPage + 1
  console.log(renderPage)
  return fetch(`${HOST}?q=${value}&per_page=48&page=${renderPage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}
