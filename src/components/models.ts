export interface Dictionary<Type> {
  [key: string]: Type;
}

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
