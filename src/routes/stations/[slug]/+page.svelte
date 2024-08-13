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
		updateDoc, doc
	} from "firebase/firestore";
	import { type User } from 'firebase/auth';
    import { authStore } from '$lib/store/store';

	export let data;
	const current = data.current;
	const forecast = data.forecast;
	const hourly = data.hourly;
	
	let isPreferred : boolean = false;
	let thisid : string = '';

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

	let currentUser : User | null;
    authStore.subscribe((value) => {
        currentUser = value.user;
    });

	const db = getFirestore();
	const colRefU = collection(db, "users");
	const colRefS = collection(db, "stations");

	let user : {
		[x: string]: string; email: string; 
	}| undefined;

	onSnapshot(colRefS, (snapshot) => {
		snapshot.docs.forEach((doc) => {
			if (doc.data().name === data.name) {
				thisid = doc.id;
			}
		})
	});

	onSnapshot(colRefU, (snapshot) => {
		let users: {
			[x: string]: string; email: string; 
		}[] = [];
		snapshot.docs.forEach((doc) => {
			users.push({ ...doc.data(), email: doc.data().email, id: doc.id });
		})
		user = users.find((item) => item.email === currentUser?.email);
		if (user?.preferredStations.includes(thisid)) {
			isPreferred = true;
		} else {
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
					if (user) {
						let newPref = "";
						if ( user.preferredStations.length != 0) {
							newPref = user.preferredStations + ", " + thisid;
						}else {
							newPref = thisid;
						}
						await updateDoc(doc(db, "users", user.id), {
							preferredStations: newPref
						});
					}
				}}>
					<StarIcon size="1.5x" class="m-5 mt-7 inline-block hover:fill-warning-400 hover:shadow-xl"/>
				</button>
			{:else}
			<button on:click={async () => {
				if (user) {
					let newPref = user.preferredStations.split(", ").filter((item) => item !== thisid).join(", ");
					await updateDoc(doc(db, "users", user.id), {
						preferredStations: newPref
					});
				}
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