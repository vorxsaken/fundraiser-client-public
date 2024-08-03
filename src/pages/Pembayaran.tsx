import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import {
  IonButton,
  IonImg,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  useIonRouter,
} from "@ionic/react";
import MainHeader from "../components/MainHeader";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { dispatch, stateType } from "../store";
import ErrorMessage from "../components/ErrorMessage";
import { parseCurrency } from "../lib/utils";
import EmptyView from "../components/EmptyView";
import { fetchTagihan } from "../store/tagihan";
import { clearInitialState, fetchDraftTagihan } from "../store/paymentMethod";

const Pembayaran: React.FC = () => {
  const loadingTagihan = useSelector(
    (state: stateType) => state.tagihan.loading
  );
  const user = useSelector((state: stateType) => state.user.user);
  const errorTagihan = useSelector((state: stateType) => state.tagihan.error);
  const tagihan = useSelector((state: stateType) => state.tagihan.tagihan)[0];
  const paymentMethod = useSelector((state: stateType) => state.paymentMethod);
  const router = useIonRouter();

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    dispatch(clearInitialState());
    await dispatch(fetchDraftTagihan(tagihan?.id || 0));
    await dispatch(fetchTagihan(user?.id as any));
    event.detail.complete();
  };

  const handleBayar = () => {
    if (paymentMethod.nominal !== 0) {
      if (paymentMethod.metodePembayaran === "bankTransfer") {
        router.push(
          `/tabs/pembayaran/instruction/${tagihan.id}`,
          "forward",
          "push"
        );
      } else if (paymentMethod.metodePembayaran === "eWallet") {
        console.log("e wallet");
      }
    } else {
      router.push(`/tabs/pembayaran/bayar/${tagihan.id}`);
    }
  };

  useEffect(() => {
    dispatch(fetchDraftTagihan(tagihan?.id || 0));
  }, []);

  return (
    <Layout header={<MainHeader />}>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      {loadingTagihan ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : errorTagihan ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <ErrorMessage message={errorTagihan} />
        </div>
      ) : !tagihan ? (
        <EmptyView
          message="Tidak Ada Tagihan Pembayaran"
          className="h-[70vh]"
        />
      ) : (
        <>
          <div className="w-full">
            <IonImg
              src={tagihan.status === "LUNAS" ? "/happy.png" : "/sad.png"}
            />
          </div>
          <Card className="p-7">
            <div className="w-full flex flex-col justify-start items-start">
              <span className="text-sm font-bold ">Nama Tagihan</span>
              <span className="text-base">{tagihan.judul_tagihan}</span>
            </div>
            <div className="w-full flex flex-col justify-start items-start">
              <span className="text-sm font-bold">Total Tagihan</span>
              <span className="text-base">
                Rp. {parseCurrency(tagihan.sisa_tagihan)}
              </span>
            </div>
            <div className="w-full flex flex-col justify-start items-start">
              <span className="text-sm font-bold">Status</span>
              <span
                className={`text-base capitalize font-medium ${
                  tagihan.status === "LUNAS" ? "text-green-500" : "text-red-500"
                }`}
              >
                {tagihan.status}
              </span>
            </div>
            {tagihan.status !== "LUNAS" && (
              <div className="w-full flex justify-center">
                <IonButton
                  fill="outline"
                  className="w-full h-10"
                  onClick={() => handleBayar()}
                >
                  Bayar
                </IonButton>
              </div>
            )}
          </Card>
        </>
      )}
    </Layout>
  );
};

export default Pembayaran;
