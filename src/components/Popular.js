import React, { useEffect, useState } from 'react'
import styled from "styled-components" //importacion de componentes para styling

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
        
    }
    
    //usaremos states para guardar la data --> ventaja --> cuando la variable cambia este tambien y es actualizado

  return <div>
    {popular.map((recipe) => {
        return(
          <Wrapper>
           <h3>Popular Hicks</h3>
           {popular.map((recipe) => {
              return(<Card>
                <p>{recipe.title}</p>
                <img src={recipe.img}></img>
                </Card>);
           })}
          </Wrapper>
        )
    })}
  </div>
}

const Wrapper = styled.div`
  margin: 0rem 4rem; 
`;//margin horizontal y  vertical
//la liberia styled nos permite 

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
`; //

export default Popular
