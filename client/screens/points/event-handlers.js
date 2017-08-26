import {EDIT_POINT, CREATE_POINT} from './actions'

export const handleSubmit = (emitter, tableElement) => event => {
  event.preventDefault()

  const data = {
    name: event.target.name.value,
    rfid: event.target.rfid.value
  }

  event.target.reset()

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')
    emitter.emit(EDIT_POINT, {
      id,
      data,
      pointElement: tableElement.querySelector(`[data-id="${id}"]`)
    })
    return
  }

  emitter.emit(CREATE_POINT, {
    data
  })
}

export const handleReset = event => {
  if (!event.target.hasAttribute('data-id')) {
    return
  }
  event.target.removeAttribute('data-id')
}
