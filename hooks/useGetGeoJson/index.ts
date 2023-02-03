'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type GeoJsonType = GeoJSON.Feature<GeoJSON.Geometry>;

const useGetGeoJson = (url: string) => {
  const [geoJson, setGeoJson] = useState<GeoJsonType>();

  useEffect(() => {
    axios.get<GeoJsonType>(url).then((res) => setGeoJson(res.data));
  }, [url]);

  return geoJson;
};
export default useGetGeoJson;
