
import { _decorator, Component, Node } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH, TileMapManager } from '../Tile/TileMapManager';
import { createUINode } from '../Utils';
import Levels, { ILevel } from '../../Levels';
import DataManager from '../Runtime/DataManager';
import EventManager from '../Runtime/EventManager';
import { ENTITY_TYPE_ENUM, EVENT_ENUM } from '../../Enums';
import { PlayerManager } from '../Player/PlayerManager';
import { BurstManager } from '../Brust/BurstManager';
import { DoorManager } from '../Door/DoorManager';
import { WoodenSkeletonManager } from '../WoodenSkeleton/WoodenSkeletonManager';
import { IronSkeletonManager } from '../IronSkeleton/IronSkeletonManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    level:ILevel
    stage:Node

    onLoad() {
        DataManager.Instance.levelIndex = 1

        EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.initLevel, this)
        EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
      }

      onDestroy() {
        EventManager.Instance.off(EVENT_ENUM.RESTART_LEVEL, this.initLevel)
        EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevel)

        EventManager.Instance.clear()
      }

    start () {
        console.log('BattleManager start');
        this.generageStage()
        this.initLevel()
    }
    async initLevel() {
        const level = Levels[`level${DataManager.Instance.levelIndex}`]
        if(level){
            this.clearLevel()
            this.level = level
            DataManager.Instance.mapInfo = this.level.mapInfo
            DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0
            DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0
            await Promise.all([
                this.generateTileMap(),
                this.generateBursts(),
                this.generateDoor(),
                this.generateEnemies()
            ])

            await this.generatePlayer()
        }
    }

    generageStage(){
        this.stage = createUINode()
        this.stage.setParent(this.node);
    }
    generateTileMap() {
        const tileMap = createUINode()
        tileMap.setParent(this.stage);
        const tileMapManager =  tileMap.addComponent(TileMapManager)
        tileMapManager.init()

        this.adaptPos()
    }
    async generatePlayer() {
        const node = createUINode()
        node.setParent(this.stage)
        const playerManager = node.addComponent(PlayerManager)

        await playerManager.init(this.level.player)
        DataManager.Instance.player = playerManager
        EventManager.Instance.emit(EVENT_ENUM.PLAYER_BORN, true)
      }
    async generateDoor() {
        const node = createUINode()
        node.setParent(this.stage)
        const doorManager = node.addComponent(DoorManager)
        await doorManager.init(this.level.door)
        DataManager.Instance.door = doorManager
    }

    async generateBursts() {
        const promises = []
        for (let i = 0; i < this.level.bursts.length; i++) {
          const burst = this.level.bursts[i]
          const node = createUINode()
          node.setParent(this.stage)
          const burstManager = node.addComponent(BurstManager)
          promises.push(burstManager.init(burst))
          DataManager.Instance.bursts.push(burstManager)
        }
        await Promise.all(promises)
      }

    async generateEnemies() {
        DataManager.Instance.enemies = []
        const promises = []
        for (let i = 0; i < this.level.enemies.length; i++) {
          const enemy = this.level.enemies[i]
          const node = createUINode()
          node.setParent(this.stage)
          const Manager = enemy.type === ENTITY_TYPE_ENUM.SKELETON_WOODEN ? WoodenSkeletonManager : IronSkeletonManager
          const manager = node.addComponent(Manager)
          promises.push(manager.init(enemy))
          DataManager.Instance.enemies.push(manager)
        }

        await Promise.all(promises)
      }

    adaptPos() {
        const {mapRowCount,mapColumnCount}=DataManager.Instance
        const disX = (TILE_WIDTH*mapRowCount)/2
        const disY = (TILE_HEIGHT*mapColumnCount)/2+50
        this.stage.setPosition(-disX,disY)
    }

    nextLevel(){
        DataManager.Instance.levelIndex++
        this.initLevel()
    }

    clearLevel(){
        this.stage.destroyAllChildren()
        DataManager.Instance.reset()
    }

}

