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
	temperature_tempC: number;
	feelsLike_tempC: number;
	condition: Condition;
	dailyRange: DailyRangeRaw;
	lastUpdated?: string;
};

type StreamedOverviewData = {
	temperature: number;
	feelsLike: number;
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
