
import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH } from './TileMapManager';
const { ccclass, property } = _decorator;



@ccclass('TileManager')
export class TileManager extends Component {
     init(spriteFrame: SpriteFrame, i: number, j: number) {
        const uiTransform = this.getComponent(UITransform)
        const sprite = this.node.addComponent(Sprite)
        sprite.spriteFrame = spriteFrame
        uiTransform.setContentSize(TILE_WIDTH, TILE_HEIGHT)
        this.node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)
      }
}
