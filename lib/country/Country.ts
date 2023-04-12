export default interface Country {
  name: string
  id: string
}

export namespace Countries {
  export const Uruguay: Country = { name: 'Uruguay', id: 'uy' }
  export const Brasil: Country = { name: 'Brasil', id: 'br' }
  export const Argentina: Country = { name: 'Argentina', id: 'ar' }
  export const Unknown: Country = { name: 'Unknown', id: '00' }
}

export interface AvailableCountry {
  name: string
  flag: string
  code: string
  dialCode: string
}
