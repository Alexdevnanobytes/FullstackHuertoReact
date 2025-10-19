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
          image="/img/Pimientos.jpeg"
          name="Pimentón rojo"
          description="Pimentón fresco y crujiente, ideal para ensaladas"
          price="1200" />
        <Product
          code="2"
          image="/img/zanahoria.jpg"
          name="Zanahoria"
          description="Zanahorias dulces y tiernas, perfectas para cocinar o crudas"
          price="900" />
        <Product
          code="3"
          image="/img/Pimientos.jpeg"
          name="Tomate"
          description="Tomates maduros, jugosos y llenos de sabor"
          price="1500" />
        <Product
          code="4"
          image="/img/Pimientos.jpeg"
          name="Lechuga"
          description="Lechuga fresca y crujiente para ensaladas saludables"
          price="800" />
        <Product
          code="5"
          image="/img/Pimientos.jpeg"
          name="Ají rojo"
          description="Ají picante, ideal para sazonar tus comidas"
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