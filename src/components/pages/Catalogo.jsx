import React from 'react'
import Product from '../organisms/Product';
import First from '../organisms/First';
import Footer from '../organisms/Footer';

export default function Catalogo() {
  return (
    <>
      <First />
      <div id="products">

        <div>
          <h1>Catálogo de productos</h1>
          <p>Explora nuestra selección de productos frescos y de calidad.</p>
        </div>

        <div className='product-list'>

          <Product
          code="1"
          image="/img/pimenton-rojo.png"
          name="Pimentón rojo"
          description="Pimentón fresco y crujiente, ideal para ensaladas"
          price="1200" />
        <Product
          code="2"
          image="/img/pimenton-amarillo.png"
          name="Pimentón amarillo"
          description="Pimentón fresco y crujiente, ideal para ensaladas"
          price="900" />
        <Product
          code="3"
          image="/img/pimenton-verde.png"
          name="Pimentón verde"
          description="Pimentón fresco y crujiente, ideal para ensaladas"
          price="500" />
        <Product
          code="4"
          image="/img/lechuga-hidroponica.png"
          name="Lechuga hidropónica"
          description="Lechuga fresca y crujiente para ensaladas saludables"
          price="800" />
        <Product
          code="5"
          image="/img/betarraga.png"
          name="Betarraga"
          description="Betarraga fresca y dulce, perfecta para ensaladas"
          price="700" />
        <Product
          code="6"
          image="/img/Pimientos.jpeg"
          name="Pepino"
          description="Pepinos frescos y crujientes, perfectos para ensaladas"
          price="850" />
        </div>
        

      </div>
      <Footer />


    </>)
}