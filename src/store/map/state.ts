export type Point = {
  lat: number;
  lng: number;
};

export type UniquePoint = Point & {
  id: string;
};

export interface MapStateInterface {
  points: UniquePoint[];
  center: Point;
}

function state(): MapStateInterface {
  return {
    points: [],
    center: {
      lat: 45.69173591,
      lng: 9.23902452,
    },
  };
}

export default state;
