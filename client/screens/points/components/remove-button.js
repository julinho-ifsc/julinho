import {REMOVE_POINT} from '../actions'

export default emitter => element => {
  element.addEventListener('click', () => {
    const pointElement = element.parentNode.parentNode
    const id = pointElement.getAttribute('data-id')

    emitter.emit(REMOVE_POINT, {
      id,
      pointElement
    })
  })
}
