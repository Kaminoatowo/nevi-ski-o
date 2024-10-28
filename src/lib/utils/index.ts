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

import langData from "$lib/utils/lang_forecast.json";

type LangType = {
    [key: string]: { [key: string]: string };
};

const lang: LangType = langData;
export const translate_forecast = async (text: string) => {
    let search = text.toLowerCase().replace(/,/g, '_').replace(/\s/g, '_');
    //console.log(search)
    let array_search = search.split("__");
    //const lang = await fetch("lang_forecast.json");
    //console.log(array_search);
    
    let result_array: string[] = [];
    for (let i = 0; i < array_search.length; i++) {
        if (lang.it_IT[array_search[i]]) {
            result_array[i] = lang.it_IT[array_search[i]];
        }
    }
    let result = result_array.join(", ");
    //console.log(result);
    if (result) {
        let found = result[0].toUpperCase() + result.slice(1);
        return found;
    } else {
        return text;
    }
}

export async function fetchWeather(toTranslate: string) {
    // Mocking a promise that resolves to 'Parzialmente nuvoloso'
    let weatherPromise = translate_forecast(toTranslate);

    try {
        const weather = await weatherPromise; // Await the promise
        return weather; // Logs 'Parzialmente nuvoloso'
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}
// https://dati.meteotrentino.it/service.asmx/getListOfMeteoStations
// Nomi delle stazioni meteo del Trentino

// https://dati.meteotrentino.it/service.asmx/tuttiUltimiRilieviNeve
// Ultimi rilievi neve delle stazioni meteo del Trentino

// https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=T0454
// Ultimi dati meteo della stazione di Tione di Trento

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Peio%2C%20Trentino%2C%20Italy?unitGroup=metric&key=JKGZZHWV3GDVBAF96MMBPDCV8&contentType=json
// Previsioni meteo per Peio, Trentino, Italia, in formato JSON (richiede una chiave API)
// tramite il servizio Visual Crossing Weather

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