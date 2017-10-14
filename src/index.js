import './styles/style.scss'

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-bar')
const user = document.getElementById('user')
const loadBtn = document.getElementById('load-btn')
const loader = document.querySelector('.loader')

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
  loader.style.visibility = 'visible'
  const value = searchInput.value
  getUsers(value)
    .then(rawData => {
      if (rawData.total_count === 0) {
        loadBtn.style.visibility = 'hidden'
        loader.style.visibility = 'hidden'
        console.log('not found')
        let warn = document.createElement('p')
        warn.innerText = 'Not Found'
        warn.classList = 'warn'
        user.appendChild(warn)
      }
      if (rawData.total_count >= 24) {
        setTimeout(function() {
          loadBtn.style.visibility = 'visible'
        }, 1200)
      }
      const data = rawData.items
      const getData = data
        .map(mainData => {
          return {
            login: mainData.login,
            avatar_url: mainData.avatar_url,
            html_url: mainData.html_url
          }
        })
        .map(aUser => {
          loader.style.visibility = 'hidden'
          renderAUser(aUser)
        })
      // userdata.innerText = 'getData[0].login'
      // photo.innerHTML = '<a href="#"><img src="mdn-logo-sm.png" alt="MDN"></a>'
    })
    .catch(err => {
      loader.style.visibility = 'none'
      console.log('err', err)
    })
}

const renderAUser = aUser => {
  let container = document.createElement('div')
  container.classList = 'container'
  let p = document.createElement('p')
  p.innerText = aUser.login

  let a = document.createElement('a')
  a.setAttribute('href', aUser.html_url)
  a.setAttribute('target', '_blank')
  let img = document.createElement('img')
  let url = aUser.avatar_url
  img.src = url
  a.appendChild(img)
  container.appendChild(p)
  container.appendChild(a)
  user.appendChild(container)
}

loadBtn.addEventListener('click', evt => {
  loader.style.visibility = 'visible'
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
          loader.style.visibility = 'hidden'
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
    .catch(err => {
      loader.style.visibility = 'hidden'
      console.log('err', err)
    })
})

const HOST = 'https://api.github.com/search/users'

const getUsers = value => {
  const url = `${HOST}?q=${value}+type:user+in:login&per_page=24&page=1`
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status >= 300) {
      alert('Oops! There is something wrong.')
    }
    return res.json()
  })
}

let renderPage = 1

const nextUserPage = value => {
  renderPage = renderPage + 1
  console.log(renderPage)
  return fetch(`${HOST}?q=${value}&per_page=24&page=${renderPage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
}
