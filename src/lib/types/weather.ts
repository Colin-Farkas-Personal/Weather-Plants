interface Location {
    name: string;
    country: string;
}
interface Condition {
    text: string;
    code: number;
}
interface DailyRange {
    min: string;
    max: string;
}

interface MainWeather{
    location: Location;
    temperature: number;
    feelsLike: number;
    condition: Condition;
    dailyRange: DailyRange;
    lastUpdated?: string;
}

export type { MainWeather, Location, Condition, DailyRange };