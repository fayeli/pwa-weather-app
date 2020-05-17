import React from 'react';
import { IonLabel } from '@ionic/react';
import './OfflineBanner.css'

const OfflineBanner = () => {
    return (
        <div className="offline-banner" slot="fixed">
            <IonLabel color="medium">You are currently offline.</IonLabel>
        </div>
    );
};

export default OfflineBanner;
