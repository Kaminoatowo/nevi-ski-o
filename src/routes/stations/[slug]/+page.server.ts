import * as cheerio from 'cheerio';

export const load = async (serverLoadEvent) => {
    const { fetch, params } = serverLoadEvent;
    const station = await import(`../${params.slug}.md`);
    const { code, name, region, country } = station.metadata;

    const title = `${name}`;
    //const STAT_URL = `https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=${code}`;
    const API_KEY = stationsConfig.apiKey;
    const STAT_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}%2C%20${region}%2C%20${country}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    
    const response = await fetch(STAT_URL);
    const stationsJSON = await response.json();

    //console.log(stationsJSON.days[0].hours[0].temp);
    const current = currentConditions(stationsJSON);

    
    console.log(daysAgoConditions(stationsJSON)[3]);
    const forecast = daysAgoConditions(stationsJSON);
    
    return {
        title,
        current,
        forecast
    }   
}

function currentConditions(json: any) {

    const currentConditions = json.currentConditions;

    return {
        temp: currentConditions.temp,
        feelslike: currentConditions.feelslike,
        humidity: currentConditions.humidity,
        dew: currentConditions.dew,
        precipitation: currentConditions.precip,
        precipitationProb: currentConditions.precipprob,
        snow: currentConditions.snow,
        snowDepth: currentConditions.snowdepth,
        precipitationType: currentConditions.preciptype,
        windGust: currentConditions.windgust,
        windSpeed: currentConditions.windspeed,
        windDirection: currentConditions.winddir,
        pressure: currentConditions.pressure,
        visibility: currentConditions.visibility,
        cloudCover: currentConditions.cloudcover,
        solarRadiation: currentConditions.solarradiation,
        solarEnergy: currentConditions.solarenergy,
        uv: currentConditions.uv,
        severeRisk: currentConditions.severerisk,
        conditions: currentConditions.conditions,
        icon: currentConditions.icon,
        sunrise: currentConditions.sunrise,
        sunset: currentConditions.sunset,
        moonPhase: currentConditions.moonphase
    }
}

function daysAgoConditions(json: any) {
    const days = json.days;
    const daysAgo = days.map((day: any) => {
        return {
            date: day.datetime,
            tempMax: day.tempmax,
            tempMin: day.tempmin,
            feelslikeMax: day.feelslikemax,
            feelslikeMin: day.feelslikemin,
            precip: day.precip,
            precipProb: day.precipprob,
            snow: day.snow,
            snowDepth: day.snowdepth,
            precipType: day.preciptype,
            windGust: day.windgust,
            windSpeed: day.windspeed,
            windDirection: day.winddir,
            pressure: day.pressure,
            humidity: day.humidity,
            dew: day.dew,
            cloudCover: day.cloudcover,
            conditions: day.conditions,
            icon: day.icon,
            sunrise: day.sunrise,
            sunset: day.sunset,
            moonPhase: day.moonphase
        }
    });
    return daysAgo;
}

function hourlyConditions(json: any) {
    const hours = json.hours;
    const hourly = hours.map((hour: any) => {
        return {
            time: hour.datetime,
            temp: hour.temp,
            feelslike: hour.feelslike,
            precip: hour.precip,
            snow: hour.snow,
            precipType: hour.preciptype,
            windGust: hour.windgust,
            windSpeed: hour.windspeed,
            windDirection: hour.winddir,
            pressure: hour.pressure,
            humidity: hour.humidity,
            dew: hour.dew,
            cloudCover: hour.cloudcover,
            conditions: hour.conditions,
            icon: hour.icon,
            sunrise: hour.sunrise,
            sunset: hour.sunset,
            moonPhase: hour.moonphase
        }
    });
    return hourly;
}