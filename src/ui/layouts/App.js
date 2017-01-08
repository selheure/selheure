import React    from 'react'
import Main     from './Main'
import Header   from './Header'
import Footer   from './Footer'

const App = ({ children }) => (
  <div>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
)

export default App
