import {EDIT_POINT, CREATE_POINT} from './actions'
import {alert} from 'vanilla-dialogs'

export const handleSubmit = (emitter, tableElement) => event => {
  event.preventDefault()

  const data = {
    name: event.target.name.value,
    rfid: event.target.rfid.value
  }

  if (!data.name) {
    alert('Nome inválido')
    return
  }

  if (!data.rfid) {
    alert('Nome inválido')
    return
  }

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')
    emitter.emit(EDIT_POINT, {
      id,
      data,
      pointElement: tableElement.querySelector(`[data-id="${id}"]`)
    })
  } else {
    emitter.emit(CREATE_POINT, {
      data
    })
  }

  event.target.reset()
}

export const handleReset = event => {
  if (!event.target.hasAttribute('data-id')) {
    return
  }
  event.target.removeAttribute('data-id')
}
