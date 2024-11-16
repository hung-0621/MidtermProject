import './App.css'
import Header from './component/Header'
import Content from './component/Content'
import Footer from './component/Footer'
import MouseTrail from "@scorder/react-mouse-trail";
import { MouseTrailConfig } from './data/MouseTrailConfig';

function App() {

  return (
    <>
      <div id='app'>
        <MouseTrail {...MouseTrailConfig} />
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
