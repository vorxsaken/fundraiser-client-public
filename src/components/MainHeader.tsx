import { IonHeader, IonImg, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const MainHeader: React.FC = () => {
  return (
    <IonHeader className="shadow-none border-b border-gray-50 dark:border-gray-700">
      <IonToolbar>
        <IonTitle className="h-[9vh]">
          <div className="w-full h-full flex justify-between items-center">
            <div className="w-14 h-11 overflow-hidden p-2 flex justify-center items-center border border-gray-300 dark:border-gray-700 rounded-lg">
              <IonImg src="/logo.png" className="w-14" />
            </div>
            <div className="flex flex-col gap-0 items-end">
              <span className="font-extrabold text-base">Pembayaran Spp Siswa</span>
              <span className="text-[10px] font-extralight">Smk Cendekia Sungai Karang</span>
            </div>
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default MainHeader;
