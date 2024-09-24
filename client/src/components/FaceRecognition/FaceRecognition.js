import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, name }) => {
  console.log('box', box);
  console.log('imageUrl', imageUrl);
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {/* i want to return the name of the celebrity */}
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          >
          <p className="bounding-box-caption f5 ">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
