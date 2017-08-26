import {FILL_FORM_POINT} from '../actions'

export default emitter => element => {
  element.addEventListener('click', () => {
    const id = element.parentNode.parentNode.getAttribute('data-id')

    emitter.emit(FILL_FORM_POINT, {
      id
    })
  })
}
