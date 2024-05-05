<script lang="ts">
    import * as cheerio from 'cheerio';
    import axios from 'axios';

    //import { getRilievi, rilieviStore } from '../../store/storeRilievi';
    import { onMount } from 'svelte';
  import { on } from 'events';
    //import { JSDOM } from 'jsdom';

    /*onMount(() => { 
        xmlDoc = fetch('https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=T0413')
        .then(response => {
            response.text();
        })
            
        const cheerioObj = await cheerio.fromUrl('https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=T0413');
        console.log(cheerioObj('rilievo_neve').text());
        
    });*/

    const xmlString = `
        <rilievo_neve>
            <data_ora>2021-01-01T00:00:00</data_ora>
            <quota>2000</quota>
            <temperatura aria-label="Temperatura">-2.5</temperatura>
            <vento aria-label="Vento">0.0</vento>
            <precipitazione aria-label="Precipitazione">0.0</precipitazione>
            <neve aria-label="Neve">0.0</neve>
            <umidita aria-label="Umidità">0.0</umidita>
            <pressione aria-label="Pressione">0.0</pressione>
        </rilievo_neve>
    `;

    //const loadedString = fetch('https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=T0413');
    onMount(async () => {
        const response = await axios.get('https://dati.meteotrentino.it/service.asmx/ultimiDatiStazione?codice=T0413');
        const xml = response.data;

        const cheerioObj = cheerio.load(xml);
        console.log(cheerioObj('rilievo_neve').text());
    });

    /*if (window.DOMParser) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const rilievi = xmlDoc.querySelectorAll('rilievo_neve');
        console.log(rilievi);
    } else {
        console.error('DOMParser not supported');
    }*/
</script>

