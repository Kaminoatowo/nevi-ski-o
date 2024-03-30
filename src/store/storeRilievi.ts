import { writable } from "svelte/store";

let codiceStazione = 'T0413';

function getFetchUrl(key: string) {
    return 'https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=' + key;
}

export const rilieviStore = writable<{ dati: any }>({
    dati: null
});

async function getSnowInfo() {
    const res = await fetch(getFetchUrl(codiceStazione));
    if (res.status === 404) {
        alert('Invalid City Name.');
    } else {
        console.log(res);
    }
    codiceStazione = '';
}

export const getRilievi = async () => {
    const res = await fetch(getFetchUrl(codiceStazione));
    const data = await res.json();
    rilieviStore.set({ dati: data });
};