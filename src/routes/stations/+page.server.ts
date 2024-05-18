export const load = async ({ fetch }) => {
    const response = await fetch('/api/stations');
    const stations = await response.json();
    return {
        stations
    }
}
// https://dati.meteotrentino.it/service.asmx/getListOfMeteoStations
// Nomi delle stazioni meteo del Trentino

// https://dati.meteotrentino.it/service.asmx/tuttiUltimiRilieviNeve
// Ultimi rilievi neve delle stazioni meteo del Trentino

