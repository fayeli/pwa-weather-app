import React from 'react';
import { IonList, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import cities from '../data/cities';
import weather from '../weather.svg';

const renderItems = (props) => {
    return Object.keys(cities).map((key) => {
        return (
            <IonItem key={key} routerLink={`/${key}`} onClick={() => props.onSelect(key)} detail>
                <IonThumbnail slot="start">
                    <img src={weather} />
                </IonThumbnail>
                <IonLabel>{cities[key].name}</IonLabel>
            </IonItem>
        );
    });
}

const CityList = (props) => {
    return (
        <IonList>
            {renderItems(props)}
        </IonList>
    );
};

export default CityList;
