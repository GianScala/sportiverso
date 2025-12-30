import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Introduzione from './components/sezioni/sportiverso-introduzione/Introduzione'
import Valori from './components/sezioni/sportiverso-valori/Valori'
import Discipline from './components/sezioni/sportiverso-discipline/Discipline'

export default function Home() {
  return (
    <main>
      <Header />
      <Introduzione backgroundVideo="https://www.youtube.com/watch?v=uq7JPp0YJ4U" />
      <Valori />
      <Discipline />
      <Footer />
    </main>
  )
}