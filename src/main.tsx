import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "the-new-css-reset/css/reset.css"
import "./ui/styles/globals.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
