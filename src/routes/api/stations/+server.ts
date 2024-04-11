import { fetchMarkdownStations } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
    const stations = await fetchMarkdownStations();
    
    const sortedStations = stations.sort((a, b) => {
        return a.meta.nome.localeCompare(b.meta.nome);
    });

    return json(sortedStations);
}