import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation'; 
import Registration from './components/Auth/Registration.jsx'; // Страница регистрации
import Login from './components/Auth/Login.jsx'; // Страница входа
import Page from './components/Auth/Page.jsx'; // Страница с курсами
import Rasd from './components/Auth/Rasd.jsx'; // Страница под разделы, не нужна

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Элементы, которые должны быть только на главной странице */}
      {location.pathname === '/' && (
        <>
          <div className='light x1'></div>
          <div className='light x2'></div>
          <div className='light x3'></div>
          <div className='light x4'></div>
          <div className='light x5'></div>
          <div className='light x6'></div>
          <div className='light x7'></div>
          <div className='light x8'></div>
          <div className='light x9'></div>
        </>
      )}

      {/* Основной контент главной страницы */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-custom text-zinc-200">
        <h1 className="text-4xl font-bold mb-6">Добро пожаловать!</h1>
        <p className="text-lg mb-8">Нажмите на кнопку, чтобы начать работу.</p>
        <button
          onClick={() => navigate('/registration')}
          className="relative group overflow-hidden px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-2xl"
        >
          <span className="absolute inset-0 bg-accent transition-transform transform translate-x-full group-hover:translate-x-0"></span>
          <span className="relative z-10">Начало работы</span>
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation /> {/* Добавляем Navigation перед Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/page" element={<Page />} />
          <Route path="/rasd" element={<Rasd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;