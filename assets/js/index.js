let map = L.map('map', {
    center: [-6.2255830, 106.832699],
    zoom: 12,
    
});

/* Basemaps Layers */
let cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});

let cartoDark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


let baseMaps = [
    { 
        groupName : "Base Maps",
        expanded : false,
        layers    : {
            "OpenStreetMaps" :  osm,
            "Carto Light"  :  cartoLight,
            "Carto Dark"  :  cartoDark,
            "Google Street"  :  googleStreets,
            "ESRI Imagery"   :  Esri_WorldImagery
        }
    }							
];

let overlays = [ ];

let optionsControl = {
    container_width 	: "270px",
    container_maxHeight : "400px", 
    group_maxHeight     : "75px",
    exclusive       	: false
};

let layerControl = L.Control.styledLayerControl(baseMaps, overlays, optionsControl);
map.addControl(layerControl);

let antsColor = {
    "monas":"#ED5A62", 
    "scbd":"#978A7A",
    "sij":"#A1D8B8",
    "gbk":"#a04703",
    "itc":"#526E1A",
    "tmn_banteng":"#BFC0C4",
    "sih_siy_sif":"#FFCB2A",
    "sia":"#BFC0C2",
    "staycation":"#FCAE3F",
    "tmn_cattleya":"#58A940",
    "sid_sih_siy_sif":"#003D7E"
};

let antsPulseColor = {
    "monas":"#01A1AF", 
    "scbd":"#FFE82A",
    "sij":"#942790",
    "gbk":"#09A2B0",
    "itc":"#EC84B7",
    "tmn_banteng":"#526D1C",
    "sih_siy_sif":"#ED468B",
    "sia":"#5A86C5",
    "staycation":"#882200",
    "tmn_cattleya":"#C2E1F6",
    "sid_sih_siy_sif":"#97BF3A"
};

function optionAnts (route){
    return { 
        use: L.polyline, 
        delay: 800, 
        dashArray: [5,10], 
        weight: 3,
        paused: true, 
        color: antsColor[route],
        pulseColor: antsPulseColor[route] 
    };
}

function icon (route){
    return L.icon({
        iconUrl: `assets/img/${route}.png`,
        iconSize:     [18, 18],
        iconAnchor:   [9, 9],
        popupAnchor:  [0, -5]
    });
}

/* MONAS */
for (var i = 0, latlngsMonas = [], len = routesSepeda[0]["coords"].length; i < len; i++) {
    latlngsMonas.push(new L.LatLng(routesSepeda[0]["coords"][i][1], routesSepeda[0]["coords"][i][0]));
}

let markerMonas = L.Marker.movingMarker(latlngsMonas, 50000, {rotate: true, icon: icon("monas")});
// map.addLayer(markerMonas);  
layerControl.addOverlay( markerMonas, `Moving Marker`,
    `<button type='button' onclick='markerMonas.start()' class='play fa fa-play-circle'></button>
    <button type='button' id='pause-marker-monas' class='stop fa fa-stop-circle'></button>`, 
    {groupName : `Sepedaan Monas <button type='button' onclick='map.fitBounds(antMonas.getBounds())' class='zoom-monas fa fa-map'></button>`} );
    
let snakeMonas = new L.polyline(latlngsMonas, {weight: 2, color: "#ED5A62", snakingSpeed: 50, followHead: false});
map.addLayer(snakeMonas);  
layerControl.addOverlay( snakeMonas, `Slithering Snake`,
    `<button type='button' onclick='snakeMonas.snakeIn()' class='play fa fa-play-circle'></button>
    <button type='button' onclick='snakeMonas.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
    {groupName : `Sepedaan Monas <button type='button' onclick='map.fitBounds(antMonas.getBounds())' class='zoom-monas fa fa-map'></button>`} );

let antMonas = new L.Polyline.AntPath(latlngsMonas, optionAnts("monas"));
// map.addLayer(antMonas);
layerControl.addOverlay( antMonas, "Marching Ants",
    `<button type='button' onclick='antMonas.resume()' class='play fa fa-play-circle'></button>
    <button type='button' onclick='antMonas.pause()' class='stop fa fa-stop-circle'></button>`,
    {groupName : `Sepedaan Monas <button type='button' onclick='map.fitBounds(antMonas.getBounds())' class='zoom-monas fa fa-map'></button>`} );        


/* SCBD */
    for (var i = 0, latlngsSCBD = [], len = routesSepeda[1]["coords"].length; i < len; i++) {
        latlngsSCBD.push(new L.LatLng(routesSepeda[1]["coords"][i][1], routesSepeda[1]["coords"][i][0]));
    }
    
    let markerSCBD = L.Marker.movingMarker(latlngsSCBD, 50000, {rotate: true, icon: icon("scbd")});
    // map.addLayer(markerSCBD);  
    layerControl.addOverlay( markerSCBD, `Moving Marker`,
        `<button type='button' onclick='markerSCBD.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerSCBD.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan SCBD <button type='button' onclick='map.fitBounds(antSCBD.getBounds())' class='zoom-scbd fa fa-map'></button>`} );
    
    let snakeSCBD = new L.polyline(latlngsSCBD, {weight: 2, color: "#978A7A", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeSCBD);  
    layerControl.addOverlay( snakeSCBD, `Slithering Snake`,
        `<button type='button' onclick='snakeSCBD.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeSCBD.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan SCBD <button type='button' onclick='map.fitBounds(antSCBD.getBounds())' class='zoom-scbd fa fa-map'></button>`} );
    
    let antSCBD = new L.Polyline.AntPath(latlngsSCBD, optionAnts("scbd"));
    // map.addLayer(antSCBD);
    layerControl.addOverlay( antSCBD, "Marching Ants",
        `<button type='button' onclick='antSCBD.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antSCBD.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan SCBD <button type='button' onclick='map.fitBounds(antSCBD.getBounds())' class='zoom-scbd fa fa-map'></button>`} );        

/* Kost si J */
    for (var i = 0, latlngsSiJ = [], len = routesSepeda[2]["coords"].length; i < len; i++) {
        latlngsSiJ.push(new L.LatLng(routesSepeda[2]["coords"][i][1], routesSepeda[2]["coords"][i][0]));
    }
    
    let markerSiJ = L.Marker.movingMarker(latlngsSiJ, 50000, {rotate: true, icon: icon("sij")});
    // map.addLayer(markerSiJ);  
    layerControl.addOverlay( markerSiJ, `Moving Marker`,
        `<button type='button' onclick='markerSiJ.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerSiJ.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Kost Si J <button type='button' onclick='map.fitBounds(antSiJ.getBounds())' class='zoom-sij fa fa-map'></button>`} );
    
    let snakeSiJ = new L.polyline(latlngsSiJ, {weight: 2, color: "#942790", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeSiJ);  
    layerControl.addOverlay( snakeSiJ, `Slithering Snake`,
        `<button type='button' onclick='snakeSiJ.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeSiJ.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Kost Si J <button type='button' onclick='map.fitBounds(antSiJ.getBounds())' class='zoom-sij fa fa-map'></button>`} );
    
    let antSiJ = new L.Polyline.AntPath(latlngsSiJ, optionAnts("sij"));
    // map.addLayer(antSiJ);
    layerControl.addOverlay( antSiJ, "Marching Ants",
        `<button type='button' onclick='antSiJ.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antSiJ.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan Kost Si J <button type='button' onclick='map.fitBounds(antSiJ.getBounds())' class='zoom-sij fa fa-map'></button>`} );        

/* GBK */
    for (var i = 0, latlngsGBK = [], len = routesSepeda[3]["coords"].length; i < len; i++) {
        latlngsGBK.push(new L.LatLng(routesSepeda[3]["coords"][i][1], routesSepeda[3]["coords"][i][0]));
    }
    
    let markerGBK = L.Marker.movingMarker(latlngsGBK, 50000, {rotate: true, icon: icon("gbk")});
    // map.addLayer(markerGBK);  
    layerControl.addOverlay( markerGBK, `Moving Marker`,
        `<button type='button' onclick='markerGBK.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerGBK.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan GBK <button type='button' onclick='map.fitBounds(antGBK.getBounds())' class='zoom-gbk fa fa-map'></button>`} );
    
    let snakeGBK = new L.polyline(latlngsGBK, {weight: 2, color: "#09A2B0", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeGBK);  
    layerControl.addOverlay( snakeGBK, `Slithering Snake`,
        `<button type='button' onclick='snakeGBK.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeGBK.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan GBK <button type='button' onclick='map.fitBounds(antGBK.getBounds())' class='zoom-gbk fa fa-map'></button>`} );
    
    let antGBK = new L.Polyline.AntPath(latlngsGBK, optionAnts("gbk"));
    // map.addLayer(antGBK);
    layerControl.addOverlay( antGBK, "Marching Ants",
        `<button type='button' onclick='antGBK.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antGBK.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan GBK <button type='button' onclick='map.fitBounds(antGBK.getBounds())' class='zoom-gbk fa fa-map'></button>`} );        

/* ITC */
    for (var i = 0, latlngsITC = [], len = routesSepeda[4]["coords"].length; i < len; i++) {
        latlngsITC.push(new L.LatLng(routesSepeda[4]["coords"][i][1], routesSepeda[4]["coords"][i][0]));
    }
    
    let markerITC = L.Marker.movingMarker(latlngsITC, 50000, {rotate: true, icon: icon("itc")});
    // map.addLayer(markerITC);  
    layerControl.addOverlay( markerITC, `Moving Marker`,
        `<button type='button' onclick='markerITC.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerITC.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan ITC <button type='button' onclick='map.fitBounds(antITC.getBounds())' class='zoom-itc fa fa-map'></button>`} );
    
    let snakeITC = new L.polyline(latlngsITC, {weight: 2, color: "#526E1A", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeITC);  
    layerControl.addOverlay( snakeITC, `Slithering Snake`,
        `<button type='button' onclick='snakeITC.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeITC.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan ITC <button type='button' onclick='map.fitBounds(antITC.getBounds())' class='zoom-itc fa fa-map'></button>`} );
    
    let antITC = new L.Polyline.AntPath(latlngsITC, optionAnts("itc"));
    // map.addLayer(antSCBD);
    layerControl.addOverlay( antITC, "Marching Ants",
        `<button type='button' onclick='antITC.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antITC.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan ITC <button type='button' onclick='map.fitBounds(antITC.getBounds())' class='zoom-itc fa fa-map'></button>`} );        

/* Taman Banteng */
    for (var i = 0, latlngsBanteng = [], len = routesSepeda[5]["coords"].length; i < len; i++) {
        latlngsBanteng.push(new L.LatLng(routesSepeda[5]["coords"][i][1], routesSepeda[5]["coords"][i][0]));
    }
    
    let markerBanteng = L.Marker.movingMarker(latlngsBanteng, 50000, {rotate: true, icon: icon("tmn_banteng")});
    // map.addLayer(markerBanteng);  
    layerControl.addOverlay( markerBanteng, `Moving Marker`,
        `<button type='button' onclick='markerBanteng.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerBanteng.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Taman Banteng <button type='button' onclick='map.fitBounds(antBanteng.getBounds())' class='zoom-tmn-banteng fa fa-map'></button>`} );
    
    let snakeBanteng = new L.polyline(latlngsBanteng, {weight: 2, color: "#BFC0C4", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeBanteng);  
    layerControl.addOverlay( snakeBanteng, `Slithering Snake`,
        `<button type='button' onclick='snakeBanteng.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeBanteng.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Taman Banteng <button type='button' onclick='map.fitBounds(antBanteng.getBounds())' class='zoom-tmn-banteng fa fa-map'></button>`} );
    
    let antBanteng = new L.Polyline.AntPath(latlngsBanteng, optionAnts("tmn_banteng"));
    // map.addLayer(antBanteng);
    layerControl.addOverlay( antBanteng, "Marching Ants",
        `<button type='button' onclick='antBanteng.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antBanteng.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan Taman Banteng <button type='button' onclick='map.fitBounds(antBanteng.getBounds())' class='zoom-tmn-banteng fa fa-map'></button>`} );        

/* Kost Si H, Y, F */
    for (var i = 0, latlngsSiHYF = [], len = routesSepeda[6]["coords"].length; i < len; i++) {
        latlngsSiHYF.push(new L.LatLng(routesSepeda[6]["coords"][i][1], routesSepeda[6]["coords"][i][0]));
    }
    
    let markerSiHYF = L.Marker.movingMarker(latlngsSiHYF, 50000, {rotate: true, icon: icon("sih_siy_sif")});
    // map.addLayer(markerSiHYF);  
    layerControl.addOverlay( markerSiHYF, `Moving Marker`,
        `<button type='button' onclick='markerSiHYF.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerSiHYF.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Kost Si H, Y, F <button type='button' onclick='map.fitBounds(antSiHYF.getBounds())' class='zoom-sih-siy-sif fa fa-map'></button>`} );
    
    let snakeSiHYF = new L.polyline(latlngsSiHYF, {weight: 2, color: "#FFCB2A", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeSiHYF);  
    layerControl.addOverlay( snakeSiHYF, `Slithering Snake`,
        `<button type='button' onclick='snakeSiHYF.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeSiHYF.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Kost Si H, Y, F <button type='button' onclick='map.fitBounds(antSiHYF.getBounds())' class='zoom-sih-siy-sif fa fa-map'></button>`} );
    
    let antSiHYF = new L.Polyline.AntPath(latlngsSiHYF, optionAnts("sih_siy_sif"));
    // map.addLayer(antSiHYF);
    layerControl.addOverlay( antSiHYF, "Marching Ants",
        `<button type='button' onclick='antSiHYF.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antSiHYF.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan Kost Si H, Y, F <button type='button' onclick='map.fitBounds(antSiHYF.getBounds())' class='zoom-sih-siy-sif fa fa-map'></button>`} );        

/* Kost Si A */
    for (var i = 0, latlngsSiA = [], len = routesSepeda[7]["coords"].length; i < len; i++) {
        latlngsSiA.push(new L.LatLng(routesSepeda[7]["coords"][i][1], routesSepeda[7]["coords"][i][0]));
    }
    
    let markerSiA = L.Marker.movingMarker(latlngsSiA, 50000, {rotate: true, icon: icon("sia")});
    // map.addLayer(markerSiA);  
    layerControl.addOverlay( markerSiA, `Moving Marker`,
        `<button type='button' onclick='markerSiA.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerSiA.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Si A <button type='button' onclick='map.fitBounds(antSiA.getBounds())' class='zoom-sia fa fa-map'></button>`} );
    
    let snakeSiA = new L.polyline(latlngsSiA, {weight: 2, color: "#5A86C5", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeSiA);  
    layerControl.addOverlay( snakeSiA, `Slithering Snake`,
        `<button type='button' onclick='snakeSiA.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeSiA.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Si A <button type='button' onclick='map.fitBounds(antSiA.getBounds())' class='zoom-sia fa fa-map'></button>`} );
    
    let antSiA = new L.Polyline.AntPath(latlngsSiA, optionAnts("sia"));
    // map.addLayer(antSCBD);
    layerControl.addOverlay( antSiA, "Marching Ants",
        `<button type='button' onclick='antSiA.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antSiA.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan Si A <button type='button' onclick='map.fitBounds(antSiA.getBounds())' class='zoom-sia fa fa-map'></button>`} );        

/* Staycation */
    for (var i = 0, latlngsStaycation = [], len = routesSepeda[8]["coords"].length; i < len; i++) {
        latlngsStaycation.push(new L.LatLng(routesSepeda[8]["coords"][i][1], routesSepeda[8]["coords"][i][0]));
    }
    
    let markerStaycation = L.Marker.movingMarker(latlngsStaycation, 50000, {rotate: true, icon: icon("staycation")});
    // map.addLayer(markerStaycation);  
    layerControl.addOverlay( markerStaycation, `Moving Marker`,
        `<button type='button' onclick='markerStaycation.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerStaycation.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Staycation <button type='button' onclick='map.fitBounds(antStaycation.getBounds())' class='zoom-staycation fa fa-map'></button>`} );
    
    let snakeStaycation = new L.polyline(latlngsStaycation, {weight: 2, color: "#882200", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeStaycation);  
    layerControl.addOverlay( snakeStaycation, `Slithering Snake`,
        `<button type='button' onclick='snakeStaycation.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeStaycation.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Staycation <button type='button' onclick='map.fitBounds(antStaycation.getBounds())' class='zoom-staycation fa fa-map'></button>`} );
    
    let antStaycation = new L.Polyline.AntPath(latlngsStaycation, optionAnts("staycation"));
    // map.addLayer(antStaycation);
    layerControl.addOverlay( antStaycation, "Marching Ants",
        `<button type='button' onclick='antStaycation.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antStaycation.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan Staycation <button type='button' onclick='map.fitBounds(antStaycation.getBounds())' class='zoom-staycation fa fa-map'></button>`} );        

/* Taman Cattleya */
    for (var i = 0, latlngsCattleya = [], len = routesSepeda[9]["coords"].length; i < len; i++) {
        latlngsCattleya.push(new L.LatLng(routesSepeda[9]["coords"][i][1], routesSepeda[9]["coords"][i][0]));
    }
    
    let markerCattleya = L.Marker.movingMarker(latlngsCattleya, 50000, {rotate: true, icon: icon("tmn_cattleya")});
    // map.addLayer(markerCattleya);  
    layerControl.addOverlay( markerCattleya, `Moving Marker`,
        `<button type='button' onclick='markerCattleya.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerCattleya.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Cattleya <button type='button' onclick='map.fitBounds(antCattleya.getBounds())' class='zoom-cattleya fa fa-map'></button>`} );
    
    let snakeCattleya = new L.polyline(latlngsCattleya, {weight: 2, color: "#C2E1F6", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeCattleya);  
    layerControl.addOverlay( snakeCattleya, `Slithering Snake`,
        `<button type='button' onclick='snakeCattleya.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeCattleya.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Cattleya <button type='button' onclick='map.fitBounds(antCattleya.getBounds())' class='zoom-cattleya fa fa-map'></button>`} );
    
    let antCattleya = new L.Polyline.AntPath(latlngsCattleya, optionAnts("tmn_cattleya"));
    // map.addLayer(antSCBD);
    layerControl.addOverlay( antCattleya, "Marching Ants",
        `<button type='button' onclick='antCattleya.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antCattleya.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan Cattleya <button type='button' onclick='map.fitBounds(antCattleya.getBounds())' class='zoom-cattleya fa fa-map'></button>`} );        

/* Kost Si D, H, Y, F*/
    for (var i = 0, latlngsSiDHYF = [], len = routesSepeda[10]["coords"].length; i < len; i++) {
        latlngsSiDHYF.push(new L.LatLng(routesSepeda[10]["coords"][i][1], routesSepeda[10]["coords"][i][0]));
    }
    
    let markerSiDHYF = L.Marker.movingMarker(latlngsSiDHYF, 50000, {rotate: true, icon: icon("sid_sih_siy_sif")});
    // map.addLayer(markerSiDHYF);  
    layerControl.addOverlay( markerSiDHYF, `Moving Marker`,
        `<button type='button' onclick='markerSiDHYF.start()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='markerSiDHYF.pause()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Kost Si D, H, Y, F <button type='button' onclick='map.fitBounds(antSiDHYF.getBounds())' class='zoom-sid-sih-siy-sif fa fa-map'></button>`} );
    
    let snakeSiDHYF = new L.polyline(latlngsSiDHYF, {weight: 2, color: "#97BF3A", snakingSpeed: 50, followHead: false});
    map.addLayer(snakeSiDHYF);  
    layerControl.addOverlay( snakeSiDHYF, `Slithering Snake`,
        `<button type='button' onclick='snakeSiDHYF.snakeIn()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='snakeSiDHYF.snakeReset()' class='stop fa fa-stop-circle'></button>`, 
        {groupName : `Sepedaan Kost Si D, H, Y, F <button type='button' onclick='map.fitBounds(antSiDHYF.getBounds())' class='zoom-sid-sih-siy-sif fa fa-map'></button>`} );
    
    let antSiDHYF = new L.Polyline.AntPath(latlngsSiDHYF, optionAnts("sid_sih_siy_sif"));
    // map.addLayer(antSiDHYF);
    layerControl.addOverlay( antSiDHYF, "Marching Ants",
        `<button type='button' onclick='antSiDHYF.resume()' class='play fa fa-play-circle'></button>
        <button type='button' onclick='antSiDHYF.pause()' class='stop fa fa-stop-circle'></button>`,
        {groupName : `Sepedaan Kost Si D, H, Y, F <button type='button' onclick='map.fitBounds(antSiDHYF.getBounds())' class='zoom-sid-sih-siy-sif fa fa-map'></button>`} );        
