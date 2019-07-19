import { EasingFunction } from "react-map-gl";

export const UPDATE: string;

export type MapViewport = {
  minZoom: number;
  maxZoom: number;
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  transitionDuration?: number;
  // TODO: remove this from state
  transitionEasing?: EasingFunction;
};

export type MapViewportDiff = {
  minZoom?: number;
  maxZoom?: number;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  bearing?: number;
  pitch?: number;
  transitionDuration?: number;
};

declare type Action = {
  type: string;
  payload: any;
};

export const mapViewportSelector: (state: any) => MapViewport;

export const loadMapViewport: (mapViewportDiff: MapViewportDiff) => Action;
export const updateMapViewport: (
  mapViewportDiff: MapViewportDiff,
  scrollZoomAroundCenter?: boolean,
) => Action;

declare function mapViewportReducer(
  mapViewport: MapViewport,
  action: Action,
): MapViewport;
export default mapViewportReducer;
