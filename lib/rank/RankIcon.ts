import fireIcon from '@/assets/icons/fire.svg'
import crownIcon from '@/assets/icons/crown.svg'

export default class RankIcon {
  readonly iconSrc?: string
  readonly iconClass?: string

  constructor(iconSrc: string = '', iconClass: string = '') {
    this.iconSrc = iconSrc
    this.iconClass = iconClass
  }
}

export namespace RankIcons {
  export const NO_ICON = new RankIcon()
  export const GOLD = new RankIcon(fireIcon, 'gold-icon')
  export const DIAMOND = new RankIcon(crownIcon, 'diamond-icon')
}
