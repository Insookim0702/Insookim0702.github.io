import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    red: string
    dark: {
      veryDark: string
      darker: string
      lighter: string
    }
    light: {
      darker: string
      lighter: string
    }
  }
}
