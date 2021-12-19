import { createGlobalStyle, ThemeProvider } from 'styled-components'
import RouterComponent from './RouterComponent'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from 'react-query'

const GlobalStyle = createGlobalStyle<{ isDark: boolean }>`
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, 
ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, 
li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, 
footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; } /* HTML5 display-role reset for older browsers */ article, aside, details, figcaption, figure, footer, 
header, hgroup, menu, nav, section { display: block; } 
body { line-height: 1; background-color: ${props =>
  props.isDark ? props.theme.dark.darker : props.theme.dark.darker} } 
ol, ul { list-style: none; } 
blockquote, q { quotes: none; } 
blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; } 
table { border-collapse: collapse; border-spacing: 0; }

`

function App () {
  const queryClient = new QueryClient()
  const isDark = true
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle isDark={isDark} />
          <RouterComponent />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
