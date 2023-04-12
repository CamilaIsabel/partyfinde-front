import uruguayFlag from '@/assets/flags/uruguay.svg'
import argentinaFlag from '@/assets/flags/argentina.svg'
import brasilFlag from '@/assets/flags/brasil.svg'
import Country, { Countries } from './Country'

export class Flag {
  readonly image: string
  readonly country: Country

  constructor(image: string, country: Country) {
    this.image = image
    this.country = country
  }

  get name(): string {
    return this.country.name
  }

  get id(): string {
    return this.country.id
  }
}

const UruguayFlag = new Flag(uruguayFlag, Countries.Uruguay)
const ArgentinaFlag = new Flag(argentinaFlag, Countries.Argentina)
const BrasilFlag = new Flag(brasilFlag, Countries.Brasil)

export default new Map<String, Flag>([
  ['uruguay', UruguayFlag],
  ['argentina', ArgentinaFlag],
  ['brasil', BrasilFlag]
])

export const UnknownFlag = new Flag(uruguayFlag, Countries.Unknown)
