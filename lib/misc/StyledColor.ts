export default class StyledColor {
  readonly colorName?: string

  constructor(colorName: string, colorTone?: number) {
    let colorToneSuffix = ''
    if (colorTone) {
      colorToneSuffix = '-' + colorTone
    }
    this.colorName = colorName + colorToneSuffix
  }

  get backgroundColor() {
    return 'bg-' + this.colorName
  }

  get textColor() {
    return 'text-' + this.colorName
  }
}

const UnstyledColor = new StyledColor('white')

export class StyledColors {
  light: StyledColor
  base: StyledColor
  dark: StyledColor

  constructor(
    light: StyledColor = UnstyledColor,
    base: StyledColor = UnstyledColor,
    dark: StyledColor = UnstyledColor
  ) {
    this.light = light
    this.base = base
    this.dark = dark
  }
}

export namespace Colors {
  export const DIAMOND = new StyledColors(
    new StyledColor('blue', 300),
    new StyledColor('blue', 500),
    new StyledColor('blue', 700)
  )
  export const GOLD = new StyledColors(
    new StyledColor('yellow', 200),
    new StyledColor('gold'),
    new StyledColor('yellow', 700)
  )
  export const POPULAR = new StyledColors(
    new StyledColor('red', 300),
    new StyledColor('red', 500),
    new StyledColor('red', 700)
  )
  export const NONE = new StyledColors()
}
