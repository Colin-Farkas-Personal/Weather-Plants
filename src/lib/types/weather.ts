interface Location {
    name: string;
    country: string;
}
interface Condition {
    text: string;
    code: number;
}
interface DailyRange {
    min: number;
    max: number;
}

interface MainWeather{
    location: Location;
    temperature: number;
    feelsLike: number;
    condition: Condition;
    dailyRange: DailyRange;
}

export type { MainWeather, Location, Condition, DailyRange };