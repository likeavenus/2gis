import { load } from '@2gis/mapgl';
import { Clusterer } from '@2gis/mapgl-clusterer';

let queryName = '';
let responseArray = [];
let clusterer;
const inputElem = document.querySelector('.js-input-search');
const buttonElem = document.querySelector('.js-search-button');



export const renderMap = () => {
    async function start() {
        const mapglAPI = await load();
        
        const map = new mapgl.Map('container', {
            center: [37.622504, 55.753215],
            zoom: 13,
            key: '6aa7363e-cb3a-11ea-b2e4-f71ddc0b6dcb',
        });

        buttonElem.addEventListener('click', async () => {
            queryName = inputElem.value ? inputElem.value : false;
            const URL = `https://catalog.api.2gis.ru/3.0/markers?q=${queryName}&page_size=15000&region_id=32&key=ruhebf8058`;
            try {
                if (queryName) {
                    const promise = await fetch(URL);
        
                    if (promise.ok) {
                        if (clusterer instanceof Clusterer) {
                            clusterer.destroy();
                        }
                        const response = await promise.json();
                        console.log(response)
                        responseArray = response.result.items.map(({ lon, lat }) => [lon, lat]).map(item => ({ coordinates: item }));
                        
                        clusterer = new Clusterer(map, {
                            radius: 60,
                        });
                        
                        clusterer.load(responseArray);
                    }
        
                }
            } catch (error) {
                throw new Error(error);
            }
            
        })
     
    }
     
    start();
};