export type Point = {
  lat: number;
  lng: number;
};

export type HistoryPoint = {
  coords: Point;
  timestamp: number;
};

export type UniquePoint = Point & {
  id: string;
  history: HistoryPoint[];
};

export interface MapStateInterface {
  current: string | null;
  points: UniquePoint[];
  center: Point;
}

function state(): MapStateInterface {
  return {
    current: null,
    points: [],
    center: {
      lat: 45.69173591,
      lng: 9.23902452,
    },
  };
}

export default state;
