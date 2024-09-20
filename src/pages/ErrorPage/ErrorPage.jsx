import React from 'react';
import './ErrorPage.css'; 
import MetaData from '../../components/ui/MetaData/MetaData';

const ErrorPage = () => {
  return (
    <div className='notfound-page'>
      <MetaData title={'404-NOT FOUND'} />
<div className="notfound-container">
      <div className="notfound-404">
        <span className="digit">4</span>
        <span className="plate">
          <span className="food-icon" role="img" aria-label="food">🍕</span>
        </span>
        <span className="digit">4</span>
      </div>
      <h2 className="notfound-subtitle">Oops! You're Lost</h2>
      <p className="notfound-text">
        Looks like the page you are trying to access is not available. Grab a pizza instead and head back to the homepage.
      </p>
    </div>
    </div>
  );
};

export default ErrorPage;
