import * as services from '../../services/points'
import rowComponent from './components/row'

export const REMOVE_POINT = 'REMOVE_POINT'
export const EDIT_POINT = 'EDIT_POINT'
export const FILL_FORM_POINT = 'FILL_FORM_POINT'
export const CREATE_POINT = 'CREATE_POINT'

export const removePoint = () => async ({id, pointElement}) => {
  await services.removePoint(id)
  pointElement.parentNode.removeChild(pointElement)
}

export const editPoint = emitter => async ({id, pointElement, data}) => {
  const point = await services.updatePoint(id, data)
  const row = rowComponent(emitter)(point)
  pointElement.parentNode.replaceChild(row, pointElement)
}

export const createPoint = (emitter, tableElement) => async ({data}) => {
  const tbody = tableElement.querySelector('tbody')
  const rowElement = tbody.querySelector('tr').cloneNode(true)

  const point = await services.createPoint(data)
  rowComponent(rowElement)(emitter)(point)
  tbody.appendChild(rowElement)
}

export const fillFormPoint = formElement => async ({id}) => {
  const point = await services.getPoint(id)

  formElement.setAttribute('data-id', point.id)
  formElement.name.value = point.name
  formElement.rfid.value = point.rfid
}
