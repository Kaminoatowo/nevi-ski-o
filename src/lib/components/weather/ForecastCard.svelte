<script lang="ts">
    import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy, Windy } from 'svelte-weather';
    import WeatherImage from './WeatherImage.svelte';

    export let forecast;
    const today = forecast[0];
    const days = forecast.slice(1);
</script>

<div class="p-5 card !rounded-lg border border-surface-500 !bg-surface-900 shadow-md float-left">
    <div class="rounded-t-lg border-b border-b-surface-500 bg-surface-800 p-5">
        <h2 class="text-2xl">
            Previsioni
        </h2>
    </div>
    <div class="flex h-full w-full flex-col lg:justify-evenly">
        <div class="flex justify-between p-4 sm:p-6">
            <div class="flex flex-col p-4">
                <p class="text-3xl font-bold">
                    {today.tempMax}°C
                </p>
                <p class="text-xl font-semibold">
                    {today.conditions}
                </p>
                <div class="flex">
                    <p>
                        Massima {today.tempMax}°C
                    </p>
                    <p class="mx-2">
                        ·
                    </p>
                    <p>
                        Minima {today.tempMin}°C
                    </p>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center p-8">
                <WeatherImage forecast={today} />
            </div>
        </div>

        <div class="flex w-full items-center justify-between p-4 sm:p-6">
            {#each days as day}
            <div class="mx-auto flex min-w-[35px] flex-col items-center">
                <p class="pl-1">
                    {day.tempMax}°C
                </p>
                <p class="pl-1">
                    {day.tempMin}°C
                </p>
                <WeatherImage forecast={day} />
                <p class="pl-1">
                    {day.day}
                </p>
            </div>
            {/each}
        </div>
    </div>
</div>