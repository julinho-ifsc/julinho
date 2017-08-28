import {confirm, alert} from 'vanilla-dialogs'
import * as services from '../../services/points'
import rowComponent from './components/row'

export const REMOVE_POINT = 'REMOVE_POINT'
export const EDIT_POINT = 'EDIT_POINT'
export const FILL_FORM_POINT = 'FILL_FORM_POINT'
export const CREATE_POINT = 'CREATE_POINT'

export const removePoint = () => async ({id, pointElement}) => {
  const userAnswer = await confirm('Deseja realmente remover o ponto?', {
    cancelText: 'Não',
    confirmText: 'Sim'
  })

  if (userAnswer !== true) {
    return
  }

  try {
    await services.removePoint(id)
    pointElement.parentNode.removeChild(pointElement)
  } catch (err) {
    alert('Não foi possível remover o ponto')
  }
}

export const editPoint = emitter => async ({id, pointElement, data}) => {
  const userAnswer = await confirm('Deseja realmente alterar o ponto?', {
    cancelText: 'Não',
    confirmText: 'Sim'
  })

  if (userAnswer !== true) {
    return
  }

  try {
    const point = await services.updatePoint(id, data)
    const rowElement = pointElement.cloneNode(true)
    rowComponent(rowElement)(emitter)(point)
    pointElement.parentNode.replaceChild(rowElement, pointElement)
  } catch (err) {
    alert('Não foi possível alterar o ponto')
  }
}

export const createPoint = (emitter, tableElement) => async ({data}) => {
  const tbody = tableElement.querySelector('tbody')
  const rowElement = tbody.querySelector('tr').cloneNode(true)

  try {
    const point = await services.createPoint(data)
    rowComponent(rowElement)(emitter)(point)
    tbody.appendChild(rowElement)
  } catch (err) {
    alert('Não foi possível criar o ponto')
  }
}

export const fillFormPoint = formElement => async ({id}) => {
  try {
    const point = await services.getPoint(id)

    formElement.setAttribute('data-id', point.id)
    formElement.name.value = point.name
    formElement.rfid.value = point.rfid
  } catch (err) {
    alert('Não foi possível obter as informações do ponto')
  }
}
