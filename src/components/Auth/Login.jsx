import { motion } from 'framer-motion';
import './Login.css';

function Login() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="login-page"
    >
      <div className="login-container">
        <h1 className="login-title">Вход</h1>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Введите ваш email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" placeholder="Введите ваш пароль" required />
          </div>
          <button type="submit" className="submit-button">
            Войти
          </button>
        </form>
        <p className="registration-link">
          Нет аккаунта? <a href="/registration">Зарегистрироваться</a>
        </p>
        <p className="home-page">
          <a href="/">Главная страница</a>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;