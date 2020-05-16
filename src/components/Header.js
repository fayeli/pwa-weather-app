import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Header = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                    {/* <img src={weather} className="App-logo" alt="logo" /> */}
                    Progressive Weather App
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
