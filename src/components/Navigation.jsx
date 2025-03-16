import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-full  h-12 fixed top-0 left-0 right-0 z-50"> {/* Фиксированная позиция и высота */}
      <div className="container mx-auto flex items-center justify-between h-full px-5"> {/* justify-between для выравнивания по краям */}
        {/* Кнопка меню (левый верхний угол) */}
        <div className="flex items-center">
          <Sidebar />
        </div>

        {/* Кнопки навигации (правый верхний угол) */}
        <div className="flex items-center gap-3"> {/* Группируем кнопки справа */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className="p-2 border-2 border-zinc-800 rounded-lg hover:bg-pink-600 text-white"
          >
            Главная
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/registration')}
            className="p-2 border-2 border-zinc-800 rounded-lg hover:bg-pink-600 text-white"
          >
            Регистрация
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/login')}
            className="p-2 border-2 border-zinc-800 rounded-lg hover:bg-pink-600 text-white"
          >
            Вход
          </motion.button>
        </div>
      </div>
    </nav>
  );
};