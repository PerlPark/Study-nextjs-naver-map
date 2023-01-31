/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';
import useMap from '@/hooks/useMap';
import type { IUseMap } from '@/hooks/useMap/types';
import Script from 'next/script';

const Map = (props: IUseMap) => {
  useMap(props);

  return (
    <div>
      <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=feovhco8pm"
        strategy="beforeInteractive"
      ></Script>
      <div id="map" style={{ width: 375, height: 600 }}></div>
    </div>
  );
};

export default Map;
