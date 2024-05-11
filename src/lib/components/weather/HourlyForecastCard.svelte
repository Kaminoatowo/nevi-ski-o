<script lang="ts">
    import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy, Windy, WindDeg } from 'svelte-weather';
    import WeatherImage from './WeatherImage.svelte';

    export let forecast;
</script>

<div class="p-5 card !rounded-lg border border-surface-500 !bg-surface-900 shadow-md float-left">
    <div class="rounded-t-lg border-b border-b-surface-500 bg-surface-800 p-5">
        <h2 class="text-2xl">
            Previsioni orarie
        </h2>
    </div>
    <div class="max-h-[500px] overflow-auto px-4 py-6">
        {#each forecast as hour}
            
        <ul class="list">
            <li class="!rounded-md">
                <div class="grid w-full grid-cols-6 items-center gap-3 py-2">
                    <p class="text-xs text-surface-400 sm:text-sm">
                        {hour.time.slice(0, 5)}
                    </p>
                    <WeatherImage forecast={hour} />
                    <p class="text-start text-sm">
                        {hour.snowDepth} cm
                    </p>
                    <p class="text-sm font-bold">
                        {hour.temp}°C
                    </p>
                    <span class="col-span-2">
                        <div class="flex justify-evenly">
                            <p class="text-xs sm:text-sm text-surface-400">
                                {hour.windSpeed} km/h
                            </p>
                            <p class="text-xs sm:text-sm text-surface-400">
                                <WindDeg class="inline rotate-${hour.windDirection}deg" />
                                {hour.windArrow}
                            </p>
                        </div>
                    </span>
                </div>
            </li>
        </ul>
        {/each}
    </div>
</div>