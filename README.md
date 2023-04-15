# Pytheas

Pytheas is a React application that implements a guided walking tour, using Leaflet to visualize a map and Open Route Service to generate walking directions. The work was originally done through a grant funded by the Canadian Urban Institute to create a walking tour of the McDougall Corridor, a historic Black neighbourhood in Windsor, Ontario. You may find that visiting mcdougallcorridor.ca gives you some insight into the ways this code can be used in your own project.

Pytheas provides the following functionality:

- A landing page providing background information and links to the content and tour experiences
- A guided walking tour with;
    - User location tracking
    - Routing between markers
    - A toggleable "completed" state for markers, allowing users to revisit a partially-completed tour
- A content experience collecting all point of interest pages for users outside the tour area 
- Point of interest details which can embed a YouTube video, descriptive text and a map. This route is used by both the tour and content experiences
- End-user documentation and information

As an example, the application uses the locations of the Seven Wonders of the Ancient World. The Open Route Service will not provide directions if the route distance is greater than 6,000,000 meters, so if you're not in within 6,000 kilometers of a particular location routing will not work. Use local data (see below) for testing.

To implement Pytheas for your own tour you will need to take several steps.

## Implementing a Pytheas tour

### Source data

Data about the tour is stored in multiple places in the application.

#### /public/data/bounds.json

The bounding box for the tour is defined here. The value of the "north" and "south" keys should be set to the northern and southern latitude limits of the tour area, and the "east" and "west" keys should be set to the eastern and western longitude limits of the tour area. All coordinate values should be expressed as decimal numbers. It is a good idea to "pad" the tour area to allow people at a reasonable distance to see the walking tour and directions. Users outside the bounding box will be directed to the content page.

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
- *url* is the relevant YouTube URL for this point of interest
- *description* is the text to be displayed for this point of interest
- *image* is the detail image to be displayed for this point of interest

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

# Attribution

Placeholder background image courtesy of Miguel Angel (https://www.vecteezy.com/members/miguelap)