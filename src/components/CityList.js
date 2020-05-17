import React from 'react';
import { IonList, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import cities from '../data/cities';

const renderItems = (props) => {
    return Object.keys(cities).map((key) => {
        return (
            <IonItem key={key} routerLink={`/${key}`} onClick={() => props.onSelect(key)} detail>
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
