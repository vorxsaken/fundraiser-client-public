import { IonContent, IonPage } from '@ionic/react'
import React, { ReactNode } from 'react'
interface LayoutType { children: ReactNode, header?: JSX.Element }

const Layout: React.FC<LayoutType> = ({ children, header }) => {
    return (
        <IonPage>
            {header}
            <IonContent fullscreen>
                <div className='w-full p-5 flex justify-start items-start flex-col gap-6 relative'>
                    {children}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Layout