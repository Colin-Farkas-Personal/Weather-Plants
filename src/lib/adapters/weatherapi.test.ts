import { describe, expect, test, vi } from 'vitest';
import { fetchFromWeatherApi, getFetchUrl, WEATHER_API_URL } from './weatherapi';

describe('Weather service', () => {
    describe('getFetchUrl()', () => {
        test('returns correct fetch URL with given params ')
        const url = getFetchUrl('ABC123', 'London', 1);
        
        expect(url).toContain(WEATHER_API_URL);
        expect(url).toContain('key=ABC123');
        expect(url).toContain('q=London');
        expect(url).toContain('days=1');
    });

    describe('fetchFromWeatherApi()', () => {
        const responseMock = {
            location: {
                name: 'London',
                country: 'United Kingdom'
            },
            current: {
                temp_c: 15,
                feelslike_c: 13,
                condition: {
                    text: 'Partly cloudy',
                    code: 1003
                },
                last_updated: '2023-10-01 12:00'
            },
            forecast: {
                forecastday: [{
                    day: {
                        mintemp_c: 10,
                        maxtemp_c: 20
                    }
                }]
            }
        };
        const resultMock = {
            location: {
                name: 'London',
                country: 'United Kingdom'
            },
            temperature_c: 15,
            feelsLike_c: 13,
            condition: {
                text: 'Partly cloudy',
                code: 1003
            },
            dailyRange: {
                min_c: 10,
                max_c: 20
            },
            lastUpdated: '2023-10-01 12:00'
        };

        
        test('fetches weather data for a given location', async () => {
            const fetchMock = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    json: () => Promise.resolve(responseMock)
                })
            ) as unknown as typeof fetch;
            global.fetch = fetchMock;
            

            const result = await fetchFromWeatherApi(fetchMock, 'London');
            expect(result).toEqual(resultMock);

            expect(fetchMock).toHaveBeenCalledTimes(1);
        });

        test('throws error on failed fetch', async () => {
            const fetchMock = vi.fn(() => 
                Promise.resolve({
                    ok: false,
                    status: 500,
                    statusText: 'Internal Server Error'
                })) as unknown as typeof fetch;
            global.fetch = fetchMock;

            const result = fetchFromWeatherApi(fetchMock, 'London');
            await expect(result).rejects.toThrow('Failed to fetch weather data');
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
    });
})