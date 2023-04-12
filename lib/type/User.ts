import { Rank } from '../rank/Rank'

export default interface User {
  uuid: string
  rank?: Rank
  shortId?: string
  name?: string
  region?: string
  province?: string
  schedule?: string
  houseLocation?: boolean
  anotherPlaceLocation?: boolean
  clubLocation?: boolean
  phoneCallAvailable?: boolean
  phoneNumber?: string
  whatsappAvailable?: boolean
  instagramAvailable?: boolean
  instagram?: string
  description?: string
  age?: number
  views?: number
  whatsappClicks?: number
  callClicks?: number
  verified?: boolean
  profilePhoto: string
  featuredPhotos: string[]
  type: string
  remainingBoosts: number
  boostAvailableIn?: number
  canUseFreeBoost?: boolean
  identityVerified?: boolean
  rankExpireTime?: number
  rankCanExpire?: boolean
  rankExpired?: boolean
  story?: string
  isActive: boolean
}
