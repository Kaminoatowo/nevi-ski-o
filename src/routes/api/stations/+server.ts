import { fetchMarkdownStations } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
    const stations = await fetchMarkdownStations();
    
    const sortedStations = stations.sort((a, b) => {
        return a.meta.name.localeCompare(b.meta.name);
    });

    return json(sortedStations);
}