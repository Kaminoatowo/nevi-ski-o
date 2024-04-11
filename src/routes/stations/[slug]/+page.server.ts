import * as cheerio from 'cheerio';

export const load = async (serverLoadEvent) => {
    const { fetch, params } = serverLoadEvent;
    const station = await import(`../${params.slug}.md`);
    const { code, nome } = station.metadata;
    const title = `${nome} station details`;
    const STAT_URL = `https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=${code}`;
   
    const response = await fetch(STAT_URL);
    const stationsText = await response.text();
    const $ = cheerio.load(stationsText, {
        xml: true,
    })
    const tmin = $('datiOggi').find('tmin').text();
    const tmax = $('datiOggi').find('tmax').text();
    const rain = $('datiOggi').find('rain').text();
    
    return {
        title,
        tmin,
        tmax,
        rain
    }
    
}