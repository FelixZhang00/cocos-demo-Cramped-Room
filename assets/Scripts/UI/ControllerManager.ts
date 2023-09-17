
import { _decorator, Component, Node } from 'cc';
import EventManager from '../Runtime/EventManager';
import { EVENT_ENUM } from '../../Enums';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ControllerManager
 * DateTime = Sat Sep 16 2023 19:52:01 GMT+0800 (中国标准时间)
 * Author = felixboy666
 * FileBasename = ControllerManager.ts
 * FileBasenameNoExtension = ControllerManager
 * URL = db://assets/Scripts/UI/ControllerManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('ControllerManager')
export class ControllerManager extends Component {
    handleCtrl(){
        console.log('handleCtrl')
        EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL)
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
