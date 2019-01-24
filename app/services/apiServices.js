import {serialize} from './helperServices'

const config = window._config
const myHeaders = new Headers()

var baseOptions = {
    mode: 'cors'
}

if (window.location.origin === 'http://localhost:3000') {
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
} else {
    myHeaders.append('X-Requested-With', 'XMLHttpRequest')
    baseOptions.credentials = 'include'
}

export async function get(url, params, argOptions = {}) {
    var apiUrl = config.urls.base + '/' + url + (
        params
        ? '?' + serialize(params)
        : '')

    baseOptions.headers = myHeaders
    baseOptions.method = 'GET'
    baseOptions.body = undefined

    var options = {
        ...baseOptions,
        ...argOptions
    }

    return await _promise(apiUrl, options)
}

export async function post(url, params, argOptions = {}) {
    var apiUrl = config.urls.base + '/' + url
    myHeaders.set('Content-Type', 'multipart/form-data. Use FormData object')

    baseOptions.method = 'POST'
    baseOptions.body = serialize(params)
    baseOptions.headers = myHeaders

    var options = {
        ...baseOptions,
        ...argOptions
    }

    return await _promise(apiUrl, options)
}

export async function delate(url, params, argOptions = {}) {
    var apiUrl = config.urls.base + '/' + url

    baseOptions.method = 'DELETE'
    baseOptions.body = serialize(params)

    var options = {
        ...baseOptions,
        ...argOptions
    }

    return await _promise(apiUrl, options)
}

export async function put(url, params, argOptions = {}) {
    var apiUrl = config.urls.base + '/' + url

    baseOptions.method = 'PUT'
    baseOptions.body = serialize(params)

    var options = {
        ...baseOptions,
        ...argOptions
    }

    return await _promise(apiUrl, options)
}

export async function head(url, params, argOptions = {}) {
  var apiUrl = config.urls.base + '/' + url
  baseOptions.method = 'HEAD'

  var options = {
    ...baseOptions,
    ...argOptions
  }

  return await _promise(apiUrl, options)
}

var _promise = (apiUrl, options) => {
    return new Promise((resolve, reject) => {
        var request = (apiUrl, options) => {
            var apiUrl = apiUrl;
            var options = options;
            var reqConfig = new Request(apiUrl, options);
            fetch(reqConfig).then(response => {
                if(reqConfig.method === "HEAD" && response.status === 200){
                    resolve(response)
                  }
                if (reqConfig.method === "GET" && response.status === 200 || reqConfig.method === "POST" && response.status === 201 || (reqConfig.method === "PUT" || reqConfig.method === "PATCH" || reqConfig.method === "DELETE") && response.status === 204) {
                    response.text().then(formattedData => {
                        formattedData
                            ? resolve(JSON.parse(formattedData))
                            : resolve()
                    })
                }
                if (response.status === 503) {
                    setTimeout(() => {
                        request(apiUrl, options)
                    }, response.headers.get('retry-after'))
                }
                if (response.status === 400) {
                    console.error('Response: ', response)
                    reject(response)
                }
                if (response.status === 401) {
                    window.location.href = window.location.origin + '/login'
                }
            }).catch((err) => {
                console.error('Fetch Error', err)
            })
        }
        request(apiUrl, options)
    })
}
