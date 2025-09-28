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

type WeatherOverviewRaw = {
	location: WeatherLocation;
	temperature_tempC: number;
	feelsLike_tempC: number;
	condition: Condition;
	dailyRange: DailyRangeRaw;
	lastUpdated?: string;
};

type WeatherOverview = {
	location: WeatherLocation;
	temperature: number;
	feelsLike: number;
	condition: Condition;
	dailyRange: DailyRange;
	lastUpdated?: string;
};

export type {
	WeatherOverviewRaw,
	WeatherOverview,
	WeatherLocation,
	Condition,
	DailyRangeRaw,
	DailyRange,
};
