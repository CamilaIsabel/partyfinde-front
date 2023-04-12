import { defineConfig } from 'windicss/helpers'
import StyledColor, { Colors, StyledColors } from './lib/misc/StyledColor'

const rankColors = Object.values(Colors)
  .flatMap((colorStyle) => getAllClasesFromStyle(colorStyle))
  .filter(onlyUnique)

function onlyUnique(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index
}

function getAllClasesFromStyle(colors: StyledColors) {
  let lightClasses: string[] = []
  let baseClasses: string[] = []
  let darkClasses: string[] = []

  if (colors.light) lightClasses = getClassesFromColor(colors.light)
  if (colors.base) baseClasses = getClassesFromColor(colors.base)
  if (colors.dark) darkClasses = getClassesFromColor(colors.dark)

  return lightClasses.concat(baseClasses).concat(darkClasses)
}

function getClassesFromColor(color: StyledColor) {
  return [
    getBackgroundClassFromColor(color),
    getForegroundClassFromColor(color)
  ]
}

function getBackgroundClassFromColor(color: StyledColor) {
  return color.backgroundColor
}

function getForegroundClassFromColor(color: StyledColor) {
  return color.textColor
}

export default defineConfig({
  safelist: rankColors,
  theme: {
    extend: {
      colors: {
        'buy-premium': '#1F2025',
        gold: '#FABD48'
      },
      boxShadow: {
        '8xl': '0 0 17px 0 rgba(var(--tw-shadow-color), 1)',
        '5xl': '0 0 16px 5px rgba(var(--tw-shadow-color), 0.3)',
        '4xl': '0 0 12px 4px rgba(var(--tw-shadow-color), 0.2)',
        '7xl': '0px 0px 33px rgba(var(--tw-shadow-color), 0.75)',
        '6xl': '0px 0px 28px rgba(var(--tw-shadow-color), 0.45)'
      },
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing'
      }
    }
  },
  attributify: true
})
