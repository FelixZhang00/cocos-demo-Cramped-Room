
import { _decorator, Component, Node } from 'cc';
import { ITile } from '../../Levels';
import Singleton  from '../../Base/Singleton'
const { ccclass, property } = _decorator;


export default class DataManager extends Singleton {

    static get Instance() {
      return super.GetInstance<DataManager>()
    }
    mapInfo : Array<Array<ITile>>
    mapRowCount:number = 0
    mapColumnCount:number = 0
    levelIndex:number = 1


    reset() {
     this.mapInfo = []
     this.mapColumnCount = 0
     this.mapRowCount = 0
    }
}
