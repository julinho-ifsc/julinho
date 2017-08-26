import {createPoint, removePoint, getPoint, updatePoint} from '../services/points'

export default () => {
  const editButtons = [].slice.call(document.querySelectorAll('.js-point-edit'))
  const removeButtons = [].slice.call(document.querySelectorAll('.js-point-remove')
  )
  const formElement = document.getElementById('points-form')

  editButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.parentNode.parentNode.getAttribute('data-id')
      const point = await getPoint(id)

      formElement.setAttribute('data-id', point.id)
      formElement.name.value = point.name
      formElement.rfid.value = point.rfid
    })
  })

  removeButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.parentNode.parentNode.getAttribute('data-id')
      await removePoint(id)
      window.location.reload()
    })
  })

  formElement.addEventListener('submit', async event => {
    event.preventDefault()
    const data = {
      name: formElement.name.value,
      rfid: formElement.rfid.value
    }

    if (formElement.hasAttribute('data-id')) {
      await updatePoint(formElement.getAttribute('data-id'), data)
      window.location.reload()
    }

    await createPoint(data)
    window.location.reload()
  })

  formElement.addEventListener('reset', () => {
    if (!formElement.hasAttribute('data-id')) {
      return
    }
    formElement.removeAttribute('data-id')
  })
}
