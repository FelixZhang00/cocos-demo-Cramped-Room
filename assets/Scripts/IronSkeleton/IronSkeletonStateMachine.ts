import { _decorator, Animation } from 'cc'
import StateMachine, { getInitParamsNumber, getInitParamsTrigger } from '../../Base/StateMachine'
import { PARAMS_NAME_ENUM } from '../../Enums'
import IronIdleSubStateMachine from './IronIdleSubStateMachine'
import IronDeathSubStateMachine from './IronDeathSubStateMachine'
const { ccclass } = _decorator

@ccclass('IronSkeletonStateMachine')
export class IronSkeletonStateMachine extends StateMachine {
  async init() {
    this.animationComponent = this.node.addComponent(Animation)

    this.initParams()
    this.initStateMachines()
    this.initAnimationEvent()

    await Promise.all(this.waitingList)
  }

  initAnimationEvent() {}

  initParams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger())
    this.params.set(PARAMS_NAME_ENUM.DEATH, getInitParamsTrigger())
    this.params.set(PARAMS_NAME_ENUM.DIRECTION, getInitParamsNumber())
  }

  initStateMachines() {
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new IronIdleSubStateMachine(this))
    this.stateMachines.set(PARAMS_NAME_ENUM.DEATH, new IronDeathSubStateMachine(this))
  }

  /***
   * 根据当前所在状态（currentState）和参数（params）决定怎么切换状态机
   */
  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
      case this.stateMachines.get(PARAMS_NAME_ENUM.DEATH):
        if (this.params.get(PARAMS_NAME_ENUM.DEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.DEATH)
        } else if (this.params.get(PARAMS_NAME_ENUM.IDLE).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE)
        } else {
          this.currentState = this.currentState
        }
        break
      default:
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE)
        break
    }
  }
}
