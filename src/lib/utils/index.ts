export const fetchMarkdownStations = async () => {
    const files = import.meta.glob('/src/routes/stations/*.md');
    const iterableStations = Object.entries(files);
    const stations = await Promise.all(
        iterableStations.map(async ([path, resolver]) => {
            const { metadata } = await (resolver() as Promise<{ metadata: any }>);
            const postPath = path.slice(11, -3);
            return {
                meta: metadata,
                path: postPath
            }
    }));
    return stations;
}