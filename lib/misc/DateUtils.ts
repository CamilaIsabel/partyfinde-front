import * as timeago from 'timeago.js'

export function toDateTime(secs: number) {
  const t = new Date(Date.UTC(1970, 0, 1)) // Epoch
  t.setUTCSeconds(secs)
  return t
}

const locale = function (_, index, __): [string, string] {
  return [
    ['a few moments ago', 'now'],
    ['a few moments ago', 'in a moment'],
    ['1 minute ago', 'in 1 minute'],
    ['%s minutes ago', 'in %s minutes'],
    ['1 hour ago', 'in 1 hour'],
    ['%s hours ago', 'in %s hours'],
    ['a day ago', 'in 1 day'],
    ['%s days ago', 'in %s days'],
    ['1 week ago', 'in 1 week'],
    ['%s weeks ago', 'in %s weeks'],
    ['1 month ago', 'in 1 month'],
    ['%s months ago', 'in %s months'],
    ['1 year ago', 'in 1 year'],
    ['%s years ago', 'in %s years'],
  ][index] as [string, string]
}
timeago.register('es_ES', locale)

export function timeAgo(datestring: any) {
  return timeago.format(datestring, 'es_ES')
}

export function secondsBetween(dateA?: Date | null, dateB?: Date | null) {
  if (!dateA || !dateB) return 0

  return (dateB.getTime() - dateA.getTime()) / 1000
}
