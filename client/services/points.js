import * as ajax from '../core/ajax'

export function createPoint(point) {
  return ajax.post('/points', point)
}

export function removePoint(id) {
  return ajax.remove('/points/' + id)
}

export async function getPoint(id) {
  return ajax.get('/points/' + id)
}

export async function updatePoint(id, data) {
  return ajax.put('/points/' + id, data)
}
