interface WeatherLocation {
	name: string;
	country: string;
}
interface Condition {
	text: string;
	code: number;
}

interface DailyRangeRaw {
	min_tempC: number;
	max_tempC: number;
}

interface DailyRange {
	min: number;
	max: number;
}

type Astro = {
	sunrise: string;
	sunset: string;
};

type WeatherOverviewRaw = {
	localTime: string;
	temperature_tempC: number;
	feelsLike_tempC: number;
	astro: Astro;
	condition: Condition;
	dailyRange: DailyRangeRaw;
	lastUpdated?: string;
};

type StreamedOverviewData = {
	localTime: string;
	temperature: number;
	feelsLike: number;
	astro: Astro;
	condition: Condition;
	dailyRange: DailyRange;
	lastUpdated?: string;
};

type WeatherOverview = {
	location: WeatherLocation;
	streamed: {
		overview: Promise<StreamedOverviewData>;
	};
};

export type {
	WeatherOverviewRaw,
	StreamedOverviewData,
	WeatherOverview,
	WeatherLocation,
	Condition,
	DailyRangeRaw,
	DailyRange,
};
