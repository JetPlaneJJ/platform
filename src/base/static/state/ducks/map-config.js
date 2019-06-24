import PropTypes from "prop-types";

// PropTypes:

export const offlineConfigPropType = PropTypes.shape({
  southWest: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  northEast: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
});

// Selectors:
export const mapConfigSelector = state => {
  return state.mapConfig;
};
export const defaultMapViewportSelector = state => {
  return state.mapConfig.defaultMapViewport;
};
export const offlineConfigSelector = state => {
  return state.mapConfig.offlineBoundingBox;
};
export const geocodeAddressBarEnabledSelector = state =>
  state.mapConfig.geocodingBarEnabled;

// Actions:
const LOAD = "map-config/LOAD";

// Action creators:
export function loadMapConfig(config) {
  return { type: LOAD, payload: config };
}

export const mapConfigPropType = PropTypes.shape({
  geolocationEnabled: PropTypes.bool,
  geocodingBarEnabled: PropTypes.bool,
  geocodingEngine: PropTypes.string,
  geocodeFieldLabel: PropTypes.string,
  geocodeHint: PropTypes.arrayOf(PropTypes.number),
  geocodeBoundingBox: PropTypes.arrayOf(PropTypes.number),
  offlineBoundingBox: offlineConfigPropType,
  scrollZoomAroundCenter: PropTypes.bool,
  defaultMapViewport: PropTypes.object.isRequired,
}).isRequired;

// Reducers:
const INITIAL_STATE = {
  geocodingBarEnabled: false,
  scrollZoomAroundCenter: false,
  defaultMapViewport: {
    zoom: 10,
    latitude: 0,
    longitude: 0,
    maxZoom: 18,
    minZoom: 1,
    pitch: 15,
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        ...action.payload,
        defaultMapViewport: {
          ...state.defaultMapViewport,
          ...action.payload.mapViewport,
        },
      };
    default:
      return state;
  }
}
