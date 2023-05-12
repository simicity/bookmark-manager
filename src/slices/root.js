import { combineReducers } from 'redux'

import formReducer from './form'
import selectedLabelsReducer from './selectedLabels'

const rootReducer = combineReducers({
  formSubmitted: formReducer,
  selectedLabels: selectedLabelsReducer,
})

export default rootReducer