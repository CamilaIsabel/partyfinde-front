import { Colors, StyledColors } from '../misc/StyledColor'
import RankIcon, { RankIcons } from './RankIcon'

export class Rank {
  readonly name: string
  readonly displayName: any
  readonly description: string
  readonly maxPhotos: number
  readonly slogan: any
  readonly icon: RankIcon
  readonly styledColors: StyledColors

  readonly price: number

  get isPremium() {
    return this.name !== 'default'
  }

  public isEqualOrHigherThan(rank: Rank) {
    return this.price >= rank.price
  }

  constructor(
    name: string,
    displayName: any = {},
    icon: RankIcon,
    maxPhotos: number,
    slogan: any = {},
    price: number = 0,
    styledColors: StyledColors = Colors.NONE,
    description: string = ''
  ) {
    this.name = name
    this.displayName = displayName
    this.description = description
    this.maxPhotos = maxPhotos
    this.slogan = slogan
    this.icon = icon
    this.styledColors = styledColors
    this.price = price
  }
}

export namespace Ranks {
  export const DEFAULT = new Rank(
    'default',
    { partyDisplayName: 'Parties in USA', eventDisplayName: 'Events in USA'},
    RankIcons.NO_ICON,
    8,
    {partySlogan: 'Find the best parties of your city', eventSlogan: 'Find the best events of your city'},
  )
  export const POPULAR = new Rank(
    'popular',
    { partyDisplayName: 'Popular', eventDisplayName: 'Popular'},
    RankIcons.NO_ICON,
    12,
    {partySlogan: 'Experience the emotion', eventSlogan: 'Experience the emotion'},
    80,
    Colors.POPULAR,
    'Increase your profile visibility and become a popular partyfinder member.'
  )
  export const GOLD = new Rank(
    'gold',
    { partyDisplayName: 'Gold', eventDisplayName: 'Gold'},
    RankIcons.GOLD,
    16,
    {partySlogan: 'The hottest parties in the gold section', eventSlogan: 'The hottest events in the gold section'},
    120,
    Colors.GOLD,
    'Raise your profile a step, with this rank your views will rise like foam.'
  )
  export const DIAMOND = new Rank(
    'diamond',
    { partyDisplayName: 'Diamond', eventDisplayName: 'Diamond'},
    RankIcons.DIAMOND,
    30,
    {partySlogan: 'High standing', eventSlogan: 'High standing'},
    200,
    Colors.DIAMOND,
    'Acquire our highest rank and get all the exclusive benefits.'
  )
}

export const getById = (id: string) => {
  if (!id) return Ranks.DEFAULT

  if (id.toLowerCase() === 'diamond') return Ranks.DIAMOND
  if (id.toLowerCase() === 'popular') return Ranks.POPULAR
  if (id.toLowerCase() === 'gold') return Ranks.GOLD

  return Ranks.DEFAULT
}
