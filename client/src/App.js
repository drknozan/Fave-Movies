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
import Alert from "./components/Alert";
import WatchList from "./pages/WatchList";
import ProtectedRoute from "./utils/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import NotFound from "./pages/NotFound";
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
            <Route path="/discover" element={<Discover />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watchlist" element={<ProtectedRoute> <WatchList /> </ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Alert />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;