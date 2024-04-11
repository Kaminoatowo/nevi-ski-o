/*export const load = async (serverLoadEvent) => {
    console.log('Load function called in page.server.ts')
    const { fetch, params } = serverLoadEvent;
    const title = 'List of stations';
    //const response = await fetch(`https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=${code}`);
    //const stations = await response.text();
    return {
        title,
        stations
    }
}*/
export const load = async ({ fetch }) => {
    const response = await fetch('/api/stations');
    const stations = await response.json();
    return {
        stations
    }
}