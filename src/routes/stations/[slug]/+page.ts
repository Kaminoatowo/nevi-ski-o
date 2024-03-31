/** @type {import('./$types').PageLoad} */
import * as cheerio from 'cheerio';
import convert from 'xml-js';
export async function load({ fetch, params }) {
    const station = await import(`../${params.slug}.md`);
    const { code } = station.metadata;
    const res = await fetch(`https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice={code}`);
    const data = await res.text();
    /*const $ = cheerio.load(data);
    console.log($('data').text().slice(0, 10));
    const date = $('data').text().slice(0, 10);*/
    const json = convert.xml2json(data, { compact: true, spaces: 4 });
    console.log(json);
	return {
        json
	};
}