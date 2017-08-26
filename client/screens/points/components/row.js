import editButtonComponent from './edit-button'
import removeButtonComponent from './remove-button'

export default emitter => ({id, name, rfid}) => {
  const tr = document.createElement('tr')
  tr.setAttribute('data-id', id)

  const nameElement = document.createElement('td')
  nameElement.textContent = name

  const rfidElement = document.createElement('td')
  rfidElement.textContent = rfid

  const actionsElement = document.createElement('td')

  const editElement = document.createElement('button')
  editElement.textContent = 'Editar'
  editButtonComponent(emitter)(editElement)

  const removeElement = document.createElement('button')
  removeElement.textContent = 'Remover'
  removeButtonComponent(emitter)(removeElement)

  actionsElement.appendChild(editElement)
  actionsElement.appendChild(removeElement)

  tr.appendChild(nameElement)
  tr.appendChild(rfidElement)
  tr.appendChild(actionsElement)

  return tr
}
