import mitt from 'mitt'
import {
  REMOVE_POINT,
  FILL_FORM_POINT,
  EDIT_POINT,
  CREATE_POINT,
  createPoint,
  removePoint,
  fillFormPoint,
  editPoint
} from './actions'
import removeButtonComponent from './components/remove-button'
import editButtonComponent from './components/edit-button'
import {toArray} from '../../core/utils'
import {handleReset, handleSubmit} from './event-handlers'

export default () => {
  const emitter = mitt()

  const formElement = document.getElementById('points-form')
  const tableElement = document.getElementById('points-table')

  const editButtons = toArray(document.querySelectorAll('.js-point-edit'))
  const removeButtons = toArray(document.querySelectorAll('.js-point-remove'))

  editButtons.forEach(editButtonComponent(emitter))
  removeButtons.forEach(removeButtonComponent(emitter))

  emitter.on(REMOVE_POINT, removePoint())
  emitter.on(FILL_FORM_POINT, fillFormPoint(formElement))
  emitter.on(EDIT_POINT, editPoint(emitter))
  emitter.on(CREATE_POINT, createPoint(emitter, tableElement))

  formElement.addEventListener('submit', handleSubmit(emitter, tableElement))
  formElement.addEventListener('reset', handleReset)
}
