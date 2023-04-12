const typeMapping = {
  E: 'events',
  P: 'parties',
}

export const toHumanType = (type: string) => {
  return typeMapping[type] || 'parties'
}
