import Feats from './Feats'
import { Rank } from './Rank'

const rankFeats = new Map<String, Feats>()
rankFeats.set('popular', [
  'Appears in the Popular section',
  'Upload 12 photos',
  'Upload states 2 times a day',
])
rankFeats.set('gold', [
  'Appears in the Gold section',
  'Upload 16 photos',
  'Button to instagram',
  'Upload states 2 times a day',
])
rankFeats.set('diamond', [
  'Appears in the Diamond section',
  'Upload 30 photos',
  'Button to instagram',
  'Upload states 2 times a day',
])
export const getFeats = (rank: Rank): Feats => {
  return rankFeats.get(rank.name) ?? []
}
