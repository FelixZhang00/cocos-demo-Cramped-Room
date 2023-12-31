import DirectionSubStateMachine from '../../Base/DirectionSubStateMachine'
import StateMachine from '../../Base/StateMachine'
import { DIRECTION_ENUM } from '../../Enums'
import State from '../../Base/State'

const BASE_URL = 'texture/door/idle'

export default class IdleSubStateMachine extends DirectionSubStateMachine {
  constructor(fsm: StateMachine) {
    super(fsm)
    this.stateMachines.set(DIRECTION_ENUM.TOP, new State(fsm, `${BASE_URL}/top`))
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM, new State(fsm, `${BASE_URL}/top`))
    this.stateMachines.set(DIRECTION_ENUM.LEFT, new State(fsm, `${BASE_URL}/left`))
    this.stateMachines.set(DIRECTION_ENUM.RIGHT, new State(fsm, `${BASE_URL}/left`))
  }
}
