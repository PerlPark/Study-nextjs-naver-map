/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type IMap from '@/hooks/useMap/types';
import Script from 'next/script';

interface IMapComponent extends IMap {
  style?: React.CSSProperties;
}

const Map = ({ style }: IMapComponent) => {
  return (
    <div>
      <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=feovhco8pm&submodules=geocoder"
        strategy="beforeInteractive"
      ></Script>
      <div id="map" style={style}></div>
    </div>
  );
};

export default Map;
