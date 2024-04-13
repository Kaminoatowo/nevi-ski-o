//import * as cheerio from 'cheerio';

export const fetchMarkdownStations = async () => {
    const files = import.meta.glob('/src/routes/stations/*.md');
    const iterableStations = Object.entries(files);
    const stations = await Promise.all(
        iterableStations.map(async ([path, resolver]) => {
            const { metadata } = await (resolver() as Promise<{ metadata: any }>);
            const postPath = path.slice(11, -3);
            return {
                meta: metadata,
                path: postPath
            }
    }));
    return stations;
}
// https://dati.meteotrentino.it/service.asmx/getListOfMeteoStations
// Nomi delle stazioni meteo del Trentino

// https://dati.meteotrentino.it/service.asmx/tuttiUltimiRilieviNeve
// Ultimi rilievi neve delle stazioni meteo del Trentino

// https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=T0454
// Ultimi dati meteo della stazione di Tione di Trento

/*export const fetchMarkdownStations = async () => {
    const API_URL = 'https://dati.meteotrentino.it/service.asmx/getListOfMeteoStations';
    const response = await fetch(API_URL);
    const stationsText = await response.text();
    const $ = cheerio.load(stationsText, {
        xml: true,
    });
    const stations: { nome: string; }[] = [];
    console.log($('pointOfMeasureInfo').text());
    return stations;
}

class Station {
    name: string;
    code: string;
    elevation: number;
    latitude: number;
    longitude: number;
    east: number;
    north: number;
    startdate: string;
    enddate: string;
    constructor(
        nome: string, code: string, elevation: number, 
        latitude: number, longitude: number, east: number, 
        north: number, startdate: string, enddate: string) {
        this.name = nome;
        this.code = code;
        this.elevation = elevation;
        this.latitude = latitude;
        this.longitude = longitude;
        this.east = east;
        this.north = north;
        this.startdate = startdate;
        this.enddate = enddate;
    }
}*/