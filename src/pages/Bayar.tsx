import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SecondaryHeader from "../components/SecondaryHeader";
import Card from "../components/Card";
import { RouteComponentProps } from "react-router";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  RadioGroupChangeEventDetail,
  useIonRouter,
} from "@ionic/react";
import { dispatch, stateType } from "../store";
import { addPaymentMethod } from "../store/paymentMethod";
import { useSelector } from "react-redux";
interface BayarProps extends RouteComponentProps<{ id: any }> {}

const Bayar: React.FC<BayarProps> = ({
  match: {
    params: { id },
  },
}) => {
  const router = useIonRouter();
  const paymentMethod = useSelector((state: stateType) => state.paymentMethod);
  const [selectedPayment, setselectedPayment] = useState(
    paymentMethod.principal
  );
  const [error, seterror] = useState("");
  const [isError, setisError] = useState(false);

  const choosePaymentMethod = (
    event: CustomEvent<RadioGroupChangeEventDetail>
  ) => {
    const paymentMethod = ["bri", "bni"].includes(event.detail.value)
      ? "bankTransfer"
      : "eWallet";

    setselectedPayment(event.detail.value);
    
    dispatch(
      addPaymentMethod({ paymentMethod, principal: event.detail.value })
    );
  };

  const handlePaymentMethodInput = () => {
    if (!paymentMethod.metodePembayaran) {
      setisError(true);
      seterror("pilih salah satu metode pembayaran");
      return;
    }

    return router.push(
      `/tabs/pembayaran/input-number/${id}`,
      "forward",
      "replace"
    );
  };

  return (
    <Layout header={<SecondaryHeader title="bayar" />}>
      <Card className="p-4">
        <div className="flex flex-col font-bold text-lg">
          <span>Pilih Metode Pembayaran</span>
          <span className="text-xs font-thin">
            Silahkan pilih metode pembayaran yang menurut anda paling mudah
            dilakukan
          </span>
        </div>
      </Card>
      {isError && (
        <Card className="border-2 border-red-500">
          <div className="w-full flex font-bold justify-center text-lg">
            <span className="text-red-500 capitalize">{error}</span>
          </div>
        </Card>
      )}
      <Card className="p-1">
        <div className="w-full">
          <IonAccordionGroup>
            <IonRadioGroup>
              <IonAccordion value="second">
                <IonItem slot="header" color="light">
                  <IonLabel>Bank Transfer</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonList>
                    <IonRadioGroup
                      onIonChange={choosePaymentMethod}
                      value={selectedPayment}
                    >
                      <IonItem>
                        <IonRadio value={"bri"}>
                          <span className="hidden">payment method</span>
                          <IonImg src="/bri.png" className="w-28" />
                        </IonRadio>
                      </IonItem>
                      <IonItem>
                        <IonRadio value={"bni"}>
                          <span className="hidden">payment method</span>
                          <IonImg src="/bni.png" className="w-20" />
                        </IonRadio>
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>
                </div>
              </IonAccordion>
            </IonRadioGroup>
          </IonAccordionGroup>
        </div>
      </Card>
      <div className="w-full">
        <IonButton
          expand="block"
          fill="outline"
          onClick={() => handlePaymentMethodInput()}
        >
          bayar sekarang
        </IonButton>
      </div>
    </Layout>
  );
};

export default Bayar;
