# QueerWalk.ca: A Pytheas Application

Pytheas is a React application that implements a guided walking tour, using Leaflet to visualize a map and Open Route Service to generate walking directions. The work was originally done through a grant funded by the Canadian Urban Institute to create a walking tour of the McDougall Corridor, a historic Black neighbourhood in Windsor, Ontario, and expanded for this implementation in partnership with Walter Cassidy of the Windsor Essex Rainbow Alliance (WERA). You may find that visiting queerwalk.ca gives you some insight into the ways this code can be used in your own project.

Pytheas provides the following functionality:

- A landing page providing background information and links to the content and tour experiences
- A guided walking tour with;
    - User location tracking
    - Routing between markers
    - A toggleable "completed" state for markers, allowing users to revisit a partially-completed tour
- A content experience collecting all point of interest pages for users outside the tour area 
- Point of interest details which can embed descriptive text, a map, and a wide range of media types with unlimited inclusion as per your requirements. This route is used by both the tour and content experiences
- Support for multiple tour implementations
- End-user documentation and information

To implement Pytheas for your own tour you will need to take several steps.

## Implementing a Pytheas tour

### Source data

Data about the tour is stored in multiple places in the application.

#### /public/data/bounds.json

The bounding boxes for the tours are defined here. Each top-level object represents a tour type, with the values inside representing the limits of the tour area for each cardinal direction. The value of the "north" and "south" keys should be set to the northern and southern latitude limits of the tour area, and the "east" and "west" keys should be set to the eastern and western longitude limits of the tour area. All coordinate values should be expressed as decimal numbers. It is a good idea to "pad" the tour area to allow people at a reasonable distance to see the walking tour and directions. Users outside the bounding box will be directed to the content page. You can add or remove tour type objects per your requirements, but there must always be at least one "full" tour type present.

#### /public/data/markers.geojson

The master list of markers is contained in this file, which is a [geoJSON](https://geojson.org/) FeatureCollection. Refer to the linked documentation for more information about the geoJSON format. The properties of each feature are used in the following ways:
- *sequence* is used to order the tour points of interest, from lowest to highest
- *name* is used as the title for the point of interest card and details
- *imageAlt* is used to generate alt text for the point of interest image
- *address* is surfaced on cards and details to display the address of the point of interest
- *status* is currently not surfaced in the application
- *longitude* is the longitude of the point of interest, expressed as a decimal
- *latitude* is the latitude of the point of interest, expressed as a decimal
- *extra* is used as a flag to identify whether the point of interest is part of the tour or identified as an "extra"
- *id* is the unique identifier for the point of interest
- *image* is the image to be displayed on point of interest marker cards 

Note that the latitude and longitude of the point of interest must also be specified as an array within the value of the *coordinates* key.

#### /public/markers/*.json

Each of these JSON files contains detailed information about a point of interest, used to display point of interest details. The keys in the JSON dictionary are used as follows:
- *id* is the unique identifier for the point of interest, which should match the *id* for this point of interest in *markers.geojson*
- *url* is a collection of relevant metadata for each piece of media to be displayed for this point of interest.
    - *path* points to the file destination of the media that is to be displayed
    - *type* specifies what media type the object holds
    - *imageAlt* is the alternative text that will accompany the given piece of media
- *description* is the text to be displayed for this point of interest
- *image* is the detail image to be displayed for this point of interest

### Tour stop media

This application has support for images and videos for each stop on the tour.

#### /src/components/Details.tsx

Based on the *type* given in each marker JSON file, the media will be sorted as either video, images, or a combination of both:

- If there is more than one image object in the url field, the Details component will create an image carousel using Express Labs' [pure-react-carousel](https://express-labs.github.io/pure-react-carousel/), otherwise the single image will be rendered as is.
- If there is a video in the url field, the Details component will create a video component using [react-player](https://www.npmjs.com/package/react-player).
- Any combination of both will display the video above and the image (or images) immediately below.

### Multiple Tour Type Implementation

To implement more than one tour type within your application, you will need to edit and add to the source code depending on your requirements.

#### /src/services.ts

For each new tour type, you will have to create a new function that fetches a different set of bounds within bounds.json. To achieve this, you will need to copy and rename fetchBoundingBox() to correspond with your desired tour type. Within the function, add all of your tour types into the decontructed .json object and add the desired tour name as a prefix to each cardinal direction in the LatLngBounds query. See fetchWalkingBounds() in the source code for a demonstration.

For each new tour type, you will also have to add the new marker sequence to the fetchOrder() function. If the sequence of the preferred tour type follows the exact sequence of a portion of the full tour, you can add a new case to the nested switch function that takes a slice of the original order. Tour case names must match the corresponding tour object name within bounds.json or else problems will persist. If the sequence is at odds with the full tour sequence, you can establish a manually curated array of tour stops that can be mapped over inside of the switch function. Examples of both methods are displayed in the source code.

#### /src/atoms.ts

Once your bounding box functions are complete, you must add them to the boundingBoxQueryAtom in order for Pytheas to access the right bounds. Within the nested switch function, add a new case for your tour that points to the appropriate function and query key. These tour case names must also match the corresponding tour object name within bounds.json or else problems will persist. 

### Theme and display details
Set the application's colour scheme in */src/theme.ts*, and place the SVG image you want to serve as a logo for the tour in /public/Main_Logo.svg.

### Open Route Service Credentials
The application supports using your own ORS routing server (if you want maximum control over routing), or the Open Route Service itself. If you choose to use the Open Route Service you will need to register at [https://openrouteservice.org/] to get an API key. The following environment variables will need to be set:
- VITE_ORS_API_KEY is the API key you receive on registration
- VITE_ORS_API_ENDPOINT is the URL for the routing server you will use. For Open Route Service, use https://api.openrouteservice.org

Do this by creating an .env file in the root folder of your project. For more information check out the [Vite documentation](https://vitejs.dev/guide/env-and-mode.html).

## Development

> WARNING: As of right now, the core code **is not** hosted on a npm-like repository. Therefore, to installed the core code, a `tgz` file of the packaged code needs to be manually installed. Right now, that file is expected to be present in the project root.

To test your project locally, install the latest Node.js and NPM from the [official source](https://nodejs.org/en/download/current/) and execute this command:

    $ npm run dev