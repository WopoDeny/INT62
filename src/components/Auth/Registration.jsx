import { motion } from 'framer-motion';
import './Registration.css';

function Registration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="registration-page"
    >
      <div className="registration-container">
        <h1 className="registration-title">Регистрация</h1>
        <form className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input id="name" type="text" placeholder="Введите ваше имя" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Введите ваш email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" placeholder="Введите ваш пароль" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input id="confirmPassword" type="password" placeholder="Подтвердите ваш пароль" />
          </div>
          <button type="submit" className="submit-button">
            Зарегистрироваться
          </button>
        </form>
        <p className="login-link">
          Уже есть аккаунт? <a href="/login">Войдите</a>
        </p>
        <p className="home-page">
          <a href="/">Главная страница</a>
        </p>
      </div>
    </motion.div>
  );
}

export default Registration;