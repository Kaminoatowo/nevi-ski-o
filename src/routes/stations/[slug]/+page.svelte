<script lang="ts">
	import { HomeIcon, StarIcon } from "svelte-uicons/rounded/regular";
	import { Thermometer } from 'svelte-weather';
	import ForecastCard from '$lib/components/weather/ForecastCard.svelte';
	import HourlyForecastCard from '$lib/components/weather/HourlyForecastCard.svelte';
	import WeatherImage from '$lib/components/weather/WeatherImage.svelte';
	import SnowDeposit from '$lib/components/chart/SnowDeposit.svelte'; // Add this line
	import { fetchWeather } from "$lib/utils/index.js";
	import { onMount } from "svelte";
	import { 
		getFirestore, collection, onSnapshot,
		addDoc, deleteDoc, doc
	} from "firebase/firestore";
	import { firebaseConfig } from "$lib/firebase.config.js";
	
	import { preferredStations } from "$lib/store/preferredStations.js";
	import { get } from "svelte/store";


	export let data;
	const current = data.current;
	const forecast = data.forecast;
	const hourly = data.hourly;
	
	let isPreferred : boolean = false;
	let thisid : string | undefined;

	let weather : string = "";
	onMount(async () => {
		/*station = data.title; // maybe use data.title
		isPreferred = get(preferredStations).includes(station);*/
    	let waiting = await fetchWeather(current.conditions);
		if (typeof waiting == 'string') {
			weather = waiting;
		} else {
			weather = "Errore";
		}
  	});

	const db = getFirestore();
	const colRef = collection(db, "preferredStations");

	onSnapshot(colRef, (snapshot) => {
		let stations: {
			[x: string]: string; id: string; 
		}[] = [];
		snapshot.docs.forEach((doc) => {
			stations.push({ ...doc.data(), id: doc.id });
		})
		console.log(stations);
		if (stations.some((item) => item.name === data.name)) {
			console.log("Stazione preferita");
			isPreferred = true;
			thisid = stations.find((item) => item.name === data.name)?.id;
		} else {
			console.log("Stazione non preferita");
			isPreferred = false;
		}
	});	

  </script>
<p class="p-6">
	<HomeIcon size="1.0x" class="mr-2 inline-block"/> 
	<a href="/" class="underline underline-offset-2">Home</a>>
	<a href="/stations" class="underline underline-offset-2">Stazioni</a>>
	{data.name}
</p>

<div class="lg:w-4/5 mx-auto bg-surface-500 lg:rounded-lg mt-5">

	<div class="flex flex-row justify-end">
		
		<h1 class="p-5">
			{data.name}
		</h1>
		<div class="w-1/2 mx-auto border rounded text-center m-5 inline-block bg-secondary-500">
			<p>
				<WeatherImage forecast={current} />
				{weather}
				
				{#if Number(current.temp) > 20}
				<Thermometer class="inline"	color="red"/>
				{:else if Number(current.temp) < 10}
				<Thermometer class="inline"	color="blue"/>
				{:else}
				<Thermometer class="inline"	color="gray"/>
				{/if}
				{current.temp}°C
			</p>
		</div>
		<div>
			{#if !isPreferred}
				<button on:click={async () => {
				await addDoc(colRef, {
					group: data.group,
					name: data.name,
					title: data.title,
				});
				}}>
					<StarIcon size="1.5x" class="m-5 mt-7 inline-block hover:fill-warning-400 hover:shadow-xl"/>
				</button>
			{:else}
			<button on:click={async () => {
				const docRef = doc(db, "preferredStations", thisid || "");
				await deleteDoc(docRef);
				}}>
					<StarIcon size="1.5x" class="m-5 mt-7 inline-block fill-warning-400 hover:shadow-xl"/>
				</button>
			{/if}
		</div>
	</div>

	<section>
		<SnowDeposit forecast={hourly} />

	</section>

	<div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
		<ForecastCard {forecast} />
	
		<HourlyForecastCard forecast={hourly} />
	</div>

	<br>
</div>