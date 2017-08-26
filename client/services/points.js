export async function createPoint(point) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const response = await fetch('/points', {
    method: 'POST',
    body: JSON.stringify(point),
    credentials: 'same-origin',
    headers
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export async function removePoint(id) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const response = await fetch('/points/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

export async function getPoint(id) {
  const response = await fetch('/points/' + id, {
    credentials: 'same-origin'
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export async function updatePoint(id, data) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const response = await fetch('/points/' + id, {
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify(data),
    headers
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}
