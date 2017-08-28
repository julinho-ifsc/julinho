import editButtonComponent from './edit-button'
import removeButtonComponent from './remove-button'

export default rowElement => emitter => ({id, name, rfid}) => {
  rowElement.setAttribute('data-id', id)

  const nameElement = rowElement.children[0]
  nameElement.textContent = name

  const rfidElement = rowElement.children[1]
  rfidElement.textContent = rfid

  const actionsElement = rowElement.children[2]

  const editElement = actionsElement.querySelector('.js-point-edit')
  editElement.textContent = 'Editar'
  editButtonComponent(emitter)(editElement)

  const removeElement = actionsElement.querySelector('.js-point-remove')
  removeElement.textContent = 'Remover'
  removeButtonComponent(emitter)(removeElement)

  return rowElement
}
