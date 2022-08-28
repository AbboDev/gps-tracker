import { Dictionary } from 'src/components/models';

export type Point = {
  lat: number;
  lng: number;
};

export type HistoryPoint = {
  coords: Point;
  timestamp: number;
};

export type UniquePoint = Point & {
  history: HistoryPoint[];
};

export interface MapStateInterface {
  points: Dictionary<UniquePoint>;
  center: Point;
}

function state(): MapStateInterface {
  return {
    points: {},
    center: {
      lat: 45.69173591,
      lng: 9.23902452,
    },
  };
}

export default state;
