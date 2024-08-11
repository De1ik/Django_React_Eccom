import React from 'react'

function Rating({values, color, amount = 0}) {

    const stars = () =>{
    
        return Array.from({length: 5}, (_, i) => (
            <i key={i} style={{color}} className={
                values >= 1+i 
                ? 'fas fa-star'
                : values >= 0.5 + i
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }/>    
        ));
    };



  return (
    <>
    <div className='ratingStars'>
        <span>{stars()} ({amount})</span>
    </div>
    </>
  )
}

export default Rating

