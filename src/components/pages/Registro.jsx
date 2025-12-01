// src/components/pages/Registro.jsx
import "../../../src/App.css";
import First from "../organisms/First";
import Footer from "../organisms/Footer";
import RegisterForm from "../../RegisterForm";
import LoginForm from "../../LoginForm";

export default function Registro() {
  return (
    <>
      <First />
      <section id="registro">
        <h1>Accede a tu cuenta o crea una nueva</h1>

        <div className="auth-forms">
          <div className="auth-card">
            <h2>Iniciar sesión</h2>
            <LoginForm />
          </div>

          <div className="auth-card">
            <h2>Registrarse</h2>
            <RegisterForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
