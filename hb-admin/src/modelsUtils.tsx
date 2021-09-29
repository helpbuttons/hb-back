const gjv = require("geojson-validation");

export default class modelsUtils{
    public static buttonTypes = [
        { id: 'offer', name: 'Offer' },
        { id: 'need', name: 'Need' },
        { id: 'exchange', name: 'Exchange' },
    ];

    public static geoPointParser(point: string) {
        try {
            console.log('parsing');
            const objPoint = JSON.parse(point);
            if(gjv.valid(objPoint) && gjv.isPoint(objPoint)) {
                return objPoint;
            }
        } catch (e) {
        }
        return point;
    };
    public static geoPointFormatter (v: string) {
        return JSON.stringify(v);
    }

    public static arrayParser(value: string) {
        console.log('baaa'  + value);
        return value;
    }
}