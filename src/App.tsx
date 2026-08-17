import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import Skills from './components/Skills'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <Skills />
      <Footer />
    </main>
  )
}
