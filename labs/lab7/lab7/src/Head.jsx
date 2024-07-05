import React from 'react';

const listImg = ["logo_dvfu.png", "logo_imct.png"];

function Head() {
  const logoImages = listImg.map((img, index) => (
    <div key={index}>
      <img src={`${process.env.PUBLIC_URL}/images/${img}`} alt="Logo" />
    </div>
  ));
  return <div className="head">{logoImages}</div>;
}

export default Head;
