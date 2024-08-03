import { IonBackButton, IonButton, IonButtons, IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
interface SecondaryHeaderProps { title?: string }
const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ title }) => {
    return (
        <IonHeader className='border-b border-gray-400 dark:border-gray-700 shadow-none'>
            <IonToolbar>
                <IonButtons slot='start'>
                    <IonBackButton />
                </IonButtons>
                <IonTitle className='pl-0 capitalize mt-[3px] text-base'>
                    {title || 'Header'}
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default SecondaryHeader