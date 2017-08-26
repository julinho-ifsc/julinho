export async function createPoint(point) {
  try {
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

    const data = await response.json()
    return data
  } catch (err) {
  }
}

export async function removePoint(id) {
  try {
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

    const data = await response.json()
    return data
  } catch (err) {
  }
}

export async function getPoint(id) {
  try {
    const response = await fetch('/points/' + id, {
      credentials: 'same-origin'
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return await response.json()
  } catch (err) {
  }
}

export async function updatePoint(id, data) {
  try {
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

    return await response.json()
  } catch (err) {
  }
}
