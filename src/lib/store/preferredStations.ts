import { writable } from "svelte/store";

const localStorageKey = "preferredStations";

function cratePreferredStations() {
    const stored = localStorage.getItem(localStorageKey);
    const initial: string[] = stored ? JSON.parse(stored) : [];
    const { subscribe, set, update } = writable<string[]>(initial);

    subscribe((current) => {
        localStorage.setItem(localStorageKey, JSON.stringify(current));
    });

    return {
        subscribe,
        add: (station: string) => update((current) => [...current, station]),
        remove: (station: string) => update((current) => current.filter((s) => s !== station)),
    };
}

export const preferredStations = writable([]);