import Nav from "./components/Nav"
import Main from "./components/Main"
import "./App.css"
import { useState, createContext ,useLayoutEffect} from "react"
import { ThemeProvider, createTheme, CssBaseline } from "@material-ui/core/"

const ThemeContext = createContext()

function App() {
  const [darkmode, setDarkMode] = useState(false)
  
  const clearStorage = () => {

    let session = sessionStorage.getItem("user")

    if (session == null) {
      window.location.reload()
      localStorage.removeItem("dataRealtime")
    }
    sessionStorage.setItem("user", 1)
  }
  window.addEventListener("load", clearStorage)


  const theme = createTheme({
    palette: {
      type: darkmode ? "dark" : "light",
    },
  })

  useLayoutEffect(() => {
    let _theme = JSON.parse(localStorage.getItem("theme"))
    setDarkMode(_theme)
  }, [])

  return (
    <ThemeContext.Provider value={{ darkmode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="App">
            <Nav />
            <Main />
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext }
export default App
