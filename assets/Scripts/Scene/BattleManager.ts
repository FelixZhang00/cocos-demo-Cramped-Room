
import { _decorator, Component, Node } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH, TileMapManager } from '../Tile/TileMapManager';
import { createUINode } from '../Utils';
import Levels, { ILevel } from '../../Levels';
import DataManager from '../Runtime/DataManager';
import EventManager from '../Runtime/EventManager';
import { EVENT_ENUM } from '../../Enums';
import { PlayerManager } from '../Player/PlayerManager';
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
        console.log("BattleManager start");
        this.generageStage()
        this.initLevel()
    }
    initLevel() {
        const level = Levels[`level${DataManager.Instance.levelIndex}`]
        if(level){
            this.clearLevel()
            this.level = level
            DataManager.Instance.mapInfo = this.level.mapInfo
            DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0
            DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0
            this.generateTileMap()
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

