interface Location {
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
    min: string;
    max: string;
}

type WeatherOverviewRaw = {
    location: Location;
    temperature_tempC: number;
    feelsLike_tempC: number;
    condition: Condition;
    dailyRange: DailyRangeRaw;
    lastUpdated?: string;
};

type WeatherOverview = {
    location: Location;
    temperature: string;
    feelsLike: string;
    condition: Condition;
    dailyRange: DailyRange;
    lastUpdated?: string;
};

export type { WeatherOverviewRaw, WeatherOverview, Location, Condition, DailyRangeRaw, DailyRange };