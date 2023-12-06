import React, { useEffect, useState } from 'react'
import styled from "styled-components" //importacion de componentes para styling
import { Splide, SplideSlide } from '@splidejs/react-splide'; 
import '@splidejs/splide/dist/css/splide.min.css';
//carrusel es el splide componente -- splideslide es cada imagen individual

function Popular() {
//async para respetar los estados que debemos esperar

    const [popular, setPopular] = useState([]); //es arreglo de recetas

    useEffect(()=>{
       getPopular();
    },[]) //llama a get popular apenas el componente aparece (recarga)
    const getPopular = async() => {

        //useEffect --> cuando la pagina vuelva a ser cargada, el componente se recarga
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const data = await api.json();
        console.log(data.recipes);
        setPopular(data.recipes);
        //guardaremos el fetch en localstorage para que no se recargue seguido
    }
    
    //usaremos states para guardar la data --> ventaja --> cuando la variable cambia este tambien y es actualizado

  return( <div>
          <Wrapper>
           <h3>Popular Hicks</h3>
           <Splide options={{
              perPage: 4 ,
              arrows: false,
              pagination:false,
              drag: 'free',// Aquí se establece el valor de perPage en 4
              gap: '5vw'
         }}>
           {popular.map((recipe) => {
              return(
              <SplideSlide key={recipe.id}>
                  <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title}></img>
                  <Gradient></Gradient>
                  </Card>
                </SplideSlide>
                );
           })}
           </Splide>
          </Wrapper>
  </div>)
}

const Wrapper = styled.div`
  margin: 4rem 0rem; 
`;//margin horizontal y  vertical
//la liberia styled nos permite 

const Card = styled.div`
    min-height: 25rem;
    overflow: hidden; 
    border-radius: 2rem;
    position: relative; /*sus hijos las imagenes se posicionan respecto a este contenedor padre */
    img{
      width: 100%; /* Asegurando que la imagen ocupe todo el espacio disponible */
       height: 100%; /* Asegurando que la imagen ocupe todo el espacio disponible */
       object-fit: cover; /* Para ajustar la imagen dentro del contenedor manteniendo su relación de aspecto */
      border-radius: 2rem;
      position: absolute;
      left: 0;
    }
    p{
      position: absolute;
      z-index: 10; // encima de elementos con z index inferior
      left:50%;
      bottom: 0%; //posiciona al elemento en la parte inferior de su contenedor
      transform: translate(-50%,0%); //centra al elemnto en su contenedor
      color: white;
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      height: 40%;
      display: flex; //permite el text-align y justify de los elementos del contenedor p
      justify-content: center;
      align-items: center;

    }
`; //overflow --> cualquier contenido que sobrepase los límites de ese elemento se recorta y se oculta

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5))


`; 

export default Popular
