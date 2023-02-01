/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';
import useMap from '@/hooks/useMap';
import type IMap from '@/hooks/useMap/types';
import Script from 'next/script';

interface IMapComponent extends IMap {
  style?: React.CSSProperties;
}

const Map = ({ style, ...props }: IMapComponent) => {
  useMap(props);

  return (
    <div>
      <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=feovhco8pm"
        strategy="beforeInteractive"
      ></Script>
      <div id="map" style={style}></div>
    </div>
  );
};

export default Map;
