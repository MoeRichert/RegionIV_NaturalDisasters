//function to instantiate the Leaflet map
function createMap(){

    var mbAttr = 'Map created by: Moe R, Stephanie B, and Dwight F';
    
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGZpZWxkMjMiLCJhIjoiY2p4NThuaGYxMDB3bDQ4cXd0eWJiOGJoeSJ9.T94xCeDwJ268CmzfMPXdmw';

    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    dark  = L.tileLayer(mbUrl, {id: 'mapbox.dark',   attribution: mbAttr}),
    outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors',   attribution: mbAttr});
    
    var width = window.innerWidth * 0.3,
    height = 450; // defines map width
    
    //create the map*/
    var map = L.map('map', {
        center: [32.38, -84.00],//Coordinated to center the map for Midwestern States
        zoom: 5.5,
        layers:outdoors
    });
    
    	var baseLayers = {
		"Topographic": outdoors,
        "Grayscale": grayscale,
		"Darkscale": dark,
                
        };
    
/*        // define projection of map
        var projection = d3.geoAlbers()
            .center([-5.45, 30.87])
            .rotate([81.00, 0, 0])
            .parallels([29.27, 39.59])
            .scale(2371.72) //sets zoom scale
            .translate([width / 2 , height / 2]); 

        var path = d3.geoPath() //defines path variable that holds objects in map
            .projection(projection);*/
    
    
    //call getData function
    getData(map);
    
    L.control.layers(baseLayers).addTo(map);
}
function getData(map){
    //load the data
    
    $.ajax("data/States.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //call function to create proportional symbols
            createPropSymbols(response, map,attributes);
            //call funtion to create slider
            createSequenceControls(map, attributes);
            //call function to create legend
            //createLegend(map, attributes);
            
            }
    });

    //load the data
    $.ajax("data/Counties.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //call function to create proportional symbols
            createPropSymbols(response, map,attributes);
            //call funtion to create slider
        }
    });
};
//Step 3: build an attributes array from the data
function processData(data){
    //empty array to hold attributes
    var attributes = [];
    
    //properties of the first feature in the dataset
    var properties = data.features[0].properties;
    console.log(properties);
    return attributes;
};

//Step 3: Add circle markers for point features to the map
function createPropSymbols(data, map, attributes){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
        return pointToLayer(feature, latlng, attributes);
        }
    }).addTo(map);
};

$(document).ready(createMap);
