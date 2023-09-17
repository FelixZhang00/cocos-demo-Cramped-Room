
import { _decorator, Component, Node } from 'cc';
import { ITile } from '../../Levels';
import Singleton  from '../../Base/Singleton'
import { PlayerManager } from '../Player/PlayerManager';
import { TileManager } from '../Tile/TileManager';
import { EnemyManager } from '../../Base/EnemyManager';
import { BurstManager } from '../Brust/BurstManager';
import { DoorManager } from '../Door/DoorManager';
const { ccclass, property } = _decorator;

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton {

    static get Instance() {
      return super.GetInstance<DataManager>()
    }
    player: PlayerManager
    enemies: EnemyManager[]
    // spikes: SpikesManager[]
    bursts: BurstManager[]
    door: DoorManager
    // smokes: SmokeManager[]
    mapRowCount: number
    mapColumnCount: number
    levelIndex: number = 1
    mapInfo: Array<Array<ITile>> = [] //关卡的描述数据
    tileInfo: Array<Array<TileManager>> = [] //实例化出来的tileManager实例
    // records: IRecord[] //撤回数据za

    private constructor() {
      super()
      this.reset()
    }

    reset() {
      //地图信息
      this.mapInfo = []
      this.tileInfo = []
      this.mapRowCount = 0
      this.mapColumnCount = 0

      // //活动元素信息
      this.player = null
      this.enemies = []
    //   this.spikes = []
      this.bursts = []
      this.door = null
    //   this.smokes = []

    //   this.records = []
    }
}
