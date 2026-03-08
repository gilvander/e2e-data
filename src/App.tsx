import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ChatWidget from "./components/ChatWidget"
import Home from "./pages/Home"
import About from "./pages/About"
import Developers from "./pages/Developers"
import Help from "./pages/Help"
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<About />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
