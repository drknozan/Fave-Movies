import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Discover from "./pages/Discover";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <div className="flex bg-slate-800">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/search" element={<Search />} />
            <Route exact path="/discover" element={<Discover />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;