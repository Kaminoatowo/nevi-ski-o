import { stationsConfig } from '$lib/stations-vcw.config.js';
export const load = async (serverLoadEvent) => {
    const { fetch, params } = serverLoadEvent;
    const station = await import(`../${params.slug}.md`);
    const { title, location, region, country } = station.metadata;

    const API_KEY = stationsConfig.apiKey;
    const STAT_URL = stationsConfig.statUrl;

    const current_URL = `${STAT_URL}/${location}%2C%20${region}%2C%20${country}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    const response = await fetch(current_URL);
    const stationsJSON = await response.json();

    //console.log(stationsJSON.days[0].hours[0].temp);
    const current = currentConditions(stationsJSON);

    //console.log(daysAgoConditions(stationsJSON)[3]);
    const forecast = daysAgoConditions(stationsJSON).slice(0, 5);

    //console.log(hourlyConditions(stationsJSON)[23].time);
    const hourly = hourlyConditions(stationsJSON);

    return {
        title,
        current,
        forecast,
        hourly
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
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const days = json.days;
    const daysAgo = days.map((day: any) => {
        return {
            date: day.datetime,
            day: weekDays[new Date(day.datetime).getDay()],
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
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const hours = json.days[0].hours;
    const hourly = hours.map((hour: any) => {
        return {
            time: hour.datetime,
            temp: hour.temp,
            feelslike: hour.feelslike,
            humidity: hour.humidity,
            dew: hour.dew,
            precip: hour.precip,
            snow: hour.snow,
            snowDepth: hour.snowdepth,
            precipType: hour.preciptype,
            windGust: hour.windgust,
            windSpeed: hour.windspeed,
            windDirection: hour.winddir,
            windArrow: directions[Math.round(hour.winddir / 45) % 8],
            pressure: hour.pressure,
            visibility: hour.visibility,
            cloudCover: hour.cloudcover,
            solarRadiation: hour.solarradiation,
            solarEnergy: hour.solarenergy,
            uv: hour.uvindex,
            conditions: hour.conditions,
            icon: hour.icon
        }
    });
    return hourly;
}