import React from 'react';
import 'aframe';

const ARTagComponent = ({ arTagUrl, arDescription }) => {
  return (
    <a-entity
      position="0 1.6 -2"
      rotation="0 0 0"
      scale="0.4 0.4 0.4"
      gltf-model={arTagUrl}
      animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
      shadow="receive: true"
      text={`value: ${arDescription}; align: center; width: 7; color: black; wrapCount: 20`}
    ></a-entity>
  );
};

export default ARTagComponent;
