<script lang="ts">
    import { DayCloudy, DayRain, DaySunny, DayHail, DaySnow, DayWindy, Windy } from 'svelte-weather';

    export let forecast;
    const today = forecast[0];
    const days = forecast.slice(1);
</script>

<div class="p-5 card w-2/3 !rounded-lg border border-surface-500 !bg-surface-900 shadow-md">
    <div class="rounded-t-lg border-b border-b-surface-500 bg-surface-800 p-5">
        <h2 class="text-2xl">
            Previsioni
        </h2>
    </div>
    <div class="flex h-full w-full flex-col md:justify-evenly">
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
                {#if today.conditions.toLowerCase().includes("rain")}
                <DayRain class="w-8 h-8" />
                {:else if today.conditions.toLowerCase().includes("sunny") || today.conditions.toLowerCase().includes("clear")}
                <DaySunny class="w-8 h-8" />
                {:else if today.conditions.toLowerCase().includes("cloud")}
                <DayCloudy class="w-8 h-8" />
                {:else if today.conditions.toLowerCase().includes("hail")}
                <DayHail class="w-8 h-8" />
                {:else if today.conditions.toLowerCase().includes("snow")}
                <DaySnow class="w-8 h-8" />
                {:else if today.conditions.toLowerCase().includes("windy")}
                <DayWindy class="w-8 h-8" />
                {:else}
                <DaySunny class="w-8 h-8" />
                {/if}
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
                {#if day.conditions.toLowerCase().includes("rain")}
                <DayRain class="w-8 h-8" />
                {:else if day.conditions.toLowerCase().includes("sunny") || day.conditions.toLowerCase().includes("clear")}
                <DaySunny class="w-8 h-8" />
                {:else if day.conditions.toLowerCase().includes("cloud")}
                <DayCloudy class="w-8 h-8" />
                {:else if day.conditions.toLowerCase().includes("hail")}
                <DayHail class="w-8 h-8" />
                {:else if day.conditions.toLowerCase().includes("snow")}
                <DaySnow class="w-8 h-8" />
                {:else if day.conditions.toLowerCase().includes("windy")}
                <DayWindy class="w-8 h-8" />
                {:else}
                <DaySunny class="w-8 h-8" />
                {/if}
                <p class="pl-1">
                    {day.date}
                </p>
            </div>
            {/each}
        </div>
    </div>
</div>