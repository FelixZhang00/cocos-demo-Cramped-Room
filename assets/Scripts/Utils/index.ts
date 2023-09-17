import { Layers, Node, SpriteFrame, UITransform, Vec2 } from 'cc'

const getUIMaskNumber = () => 1 << Layers.nameToLayer('UI_2D')

export const createUINode = (name: string = '') => {
  const node = new Node(name)
  node.layer = getUIMaskNumber()
  const transform = node.addComponent(UITransform)
  transform.anchorPoint = new Vec2(0, 1)
  return node
}


/***
 * 生成指定长度随机uuid
 * @param n
 */
export const randomByLength = (n: number) =>
  Array.from({ length: n }).reduce<string>((total: string) => total + Math.floor(Math.random() * 10), '')

/***
 * 生成指定范围随机数
 * @param start
 * @param end
 */
export const randomByRange = (start: number, end: number) => Math.floor(Math.random() * (end - start) + start)
