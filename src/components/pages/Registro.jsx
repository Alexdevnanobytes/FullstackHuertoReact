import { useRef, useState } from 'react'
import "../../../src/App.css";
import First from '../organisms/First';
import Footer from '../organisms/Footer';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  const handleNombre = (e) => {
    const valor = e.target.value;
    setNombre(valor);
    setErrorMessage(valor.length < 3 ? 'Error, ingrese al menos 3 letras!.': '');
  }

  const handleEmail = (e) => {
    const valor = e.target.value;
    setEmail(valor);
    setErrorMessage(valor.includes("@")?'':'Error, ingrese un signo arroba!.');
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    const inputs = formRef.current.querySelectorAll('input');
    for(let elem of inputs){
      if(elem.classList.contains('error')){
        setErrorMessage("Error, revisa los campos en rojo!.");
        return;
      }
    }

    formRef.current.submit()
  }
  return (
    <>
      <First/>
      <section id="registro">
        <h1>Formulario de registro</h1>
      <form action="#" id="register-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" id="nombre" placeholder="Juan"
            className={nombre.length < 3 ? 'error' : ''} value={nombre} onChange={handleNombre}
          />
        </div>
        <div className="row">
          <label htmlFor="mail">E-mail</label>
          <input type="text" name="mail" id="mail" placeholder="juan@mail.com"
            className={email.includes('@')?'':'error'} value={email} onChange={handleEmail}
          />
        </div>
        <div className="row">
          <label htmlFor="edad">Edad</label>
          <input type="number" name="edad" id="edad" placeholder="19" className="" />
        </div>
        <div className="row">
          <label htmlFor="usuario">Usuario</label>
          <input type="text" name="usuario" id="usuario" placeholder="juanito" />
        </div>
        <div className="row">
          <label htmlFor="clave1">Clave</label>
          <input type="password" name="clave1" id="clave1" placeholder="clave123" />
        </div>
        <div className="row">
          <label htmlFor="clave2">Confirmar clave</label>
          <input type="password" name="clave2" id="clave2" placeholder="clave123" className="" />
        </div>
        <div className="row">
          <button type="reset">Limpiar</button>
          <button type="submit">Enviar</button>
        </div>
      </form>
      {errorMessage && <div id="errores">{errorMessage}</div>}
      </section>
      <Footer/>
    </>
  )
}