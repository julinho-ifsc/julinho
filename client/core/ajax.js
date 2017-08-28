async function request(method, url, data) {
  const options = {
    method,
    credentials: 'same-origin'
  }

  if (method !== 'DELETE') {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    options.headers = headers
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  if (response.status === 204) {
    return
  }
  return response.json()
}

export function post(url, data) {
  return request('POST', url, data)
}

export function remove(url) {
  return request('DELETE', url)
}

export function get(url) {
  return request('GET', url)
}

export function put(url, data) {
  return request('PUT', url, data)
}
