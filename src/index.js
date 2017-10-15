import './styles/style.scss'

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-bar')
const user = document.getElementById('user')
const loadBtn = document.getElementById('load-btn')
const loader = document.querySelector('.loader')

const resetPage = () => {
  user.innerHTML = ''
  hiddenLoader()
  hiddenButton()
}

const showLoader = () => {
  loader.style.visibility = 'visible'
}

const hiddenLoader = () => {
  loader.style.visibility = 'hidden'
}

const showButton = () => {
  loadBtn.style.visibility = 'visible'
}

const hiddenButton = () => {
  loadBtn.style.visibility = 'hidden'
}

searchBtn.addEventListener('click', evt => {
  renderUsers()
})

document.body.addEventListener('keydown', evt => {
  if (evt.keyCode === 13) {
    renderUsers()
  }
})

const render404 = () => {
  let warn = document.createElement('p')
  warn.innerText = 'Not Found'
  warn.classList = 'warn'
  user.appendChild(warn)
}

const normalizeUsers = (users = []) =>
  users.map(mainData => {
    return {
      login: mainData.login,
      avatar_url: mainData.avatar_url,
      html_url: mainData.html_url
    }
  })

const renderUsers = () => {
  resetPage()
  showLoader()
  const value = searchInput.value
  getUsers(value)
    .then(rawData => {
      if (rawData.total_count === 0) {
        resetPage()
        render404()
      }
      const users = rawData.items
      normalizeUsers(users).map(userData => {
        hiddenLoader()
        renderUserData(userData)
      })

      if (rawData.total_count >= 24) {
        showButton()
      }
    })
    .catch(err => {
      hiddenLoader()
      console.log('err', err)
    })
}

const renderUserData = userData => {
  let container = document.createElement('div')
  let span = document.createElement('span')
  span.innerText = userData.login
  container.classList = 'container'
  let p = document.createElement('p')
  p.innerText = userData.login

  let a = document.createElement('a')
  a.setAttribute('href', userData.html_url)
  a.setAttribute('target', '_blank')
  let img = document.createElement('img')
  let url = userData.avatar_url
  img.src = url
  a.appendChild(img)
  container.appendChild(span)
  container.appendChild(p)
  container.appendChild(a)
  user.appendChild(container)
}

loadBtn.addEventListener('click', evt => {
  showLoader()
  const value = searchInput.value
  getNextUserPage(value)
    .then(rawData => {
      const data = rawData.items
      const getData = data
        .map(mainData => {
          return {
            login: mainData.login,
            avatar_url: mainData.avatar_url
          }
        })
        .map(userData => {
          hiddenLoader()
          renderUserData(userData)
        })
    })
    .catch(err => {
      hiddenLoader()
      console.log('err', err)
    })
})

const HOST = 'https://api.github.com'

const get = (url, query) => {
  return fetch(HOST + url + '?' + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status >= 300) {
      alert('Oops! There is something wrong.')
      throw new Error('request failed')
    }
    return res.json()
  })
}

const getUsersByPage = (inputText, page) => {
  return get(
    '/search/users',
    `q=${inputText}+type:user+in:login&per_page=24&page=${page}`
  )
}

const getUsers = inputText => getUsersByPage(inputText, 1)

let currentPage = 1
const getNextUserPage = inputText => {
  currentPage = currentPage + 1
  const nextPage = currentPage
  return getUsersByPage(inputText, nextPage)
}

