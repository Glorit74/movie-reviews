// import React, { useState } from 'react';
// import Button from '@mui/material/Button';

const movie = ({movie}) => {

  return (
    <div>
        <div className="movies">
            <div>{movie.id}</div>
            <div>{movie.l}</div>
            <div>{movie.q}</div>
            <div>{movie.rank}</div>
            <div>{movie.y}</div>
        </div>
    </div>
  )
}

export default movie