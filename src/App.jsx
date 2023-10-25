import { Routes, Route } from "react-router-dom";
import ListingPage from "../src/ListingPage" 
import EditPage from './Edit'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<ListingPage/>}/>
        <Route path='/edit/:id' element={<EditPage/>}/>
      </Routes>
    </div>
  )
}

export default App
