import { Loader } from "@googlemaps/js-api-loader";
import { apiConstants } from '../constants/api'

let map: google.maps.Map;
let document: HTMLElement;

const additionalOptions = {};

const loader = new Loader({
    apiKey: apiConstants.api_maps,
    version: "weekly",
    ...additionalOptions,
});

// loader.load().then(() => {
//     map = new google.maps.Map(document.getElementsByTagName(), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//     });
// });

export { map };