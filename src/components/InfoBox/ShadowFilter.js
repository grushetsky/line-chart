import React from 'react';

import infoBox from '../../constants/InfoBox';

const ShadowFilter = () => (
  <filter id="shadow-filter">
    <feGaussianBlur in="SourceAlpha" stdDeviation={infoBox.shadow.blur} />
    <feOffset dx={infoBox.shadow.dx} dy={infoBox.shadow.dy} result="offsetblur" />
    <feComponentTransfer>
      <feFuncA type="linear" slope={infoBox.shadow.opacity} />
    </feComponentTransfer>
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

export default ShadowFilter;
