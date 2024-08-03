import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import RiwayatCard from "../components/RiwayatCard";
import Select from "../components/Select";
import MainHeader from "../components/MainHeader";
import { useSelector, useStore } from "react-redux";
import { dispatch, stateType } from "../store";
import { fetchPembayaran, resetPembayaranState, selectAllPembayaran } from "../store/pembayaran";
import { IonRefresher, IonRefresherContent, IonSpinner, RefresherEventDetail } from "@ionic/react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyView from "../components/EmptyView";

const Riwayat: React.FC = () => {
  const [selectedSort, setselectedSort] = useState("descending");
  const options = ["ascending", "descending"];
  const getter = (e: any) => setselectedSort(e);
  const loadingPembayaran = useSelector(
    (state: stateType) => state.pembayaran.loading
  );
  const userStore = useSelector((state: stateType) => state.user.user);
  const errorPembayaran = useSelector(
    (state: stateType) => state.pembayaran.error
  );
  const descendingpembayaran = useSelector((state: stateType) =>
    selectAllPembayaran(state)
  );
  const ascendingPembayaran = [...descendingpembayaran].sort((a, b) =>
    a.tanggal_bayar.localeCompare(b.tanggal_bayar)
  );

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (userStore) {
        dispatch(resetPembayaranState())
        await dispatch(fetchPembayaran(userStore.id.toString()))
    };
    event.detail.complete()
  };

  useEffect(() => {
    if (userStore) {
      dispatch(fetchPembayaran(userStore.id.toString()));
    }
  }, []);

  return (
    <Layout header={<MainHeader />}>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <div className="w-full flex justify-between items-center">
        <span className="font-bold ">Riwayat Pembayaran</span>
        <Select
          defaultValue="descending"
          options={options}
          labelHeader="urutkan berdasar tanggal"
          onChange={(e) => getter(e)}
        />
      </div>
      {loadingPembayaran ? (
        <Loader />
      ) : errorPembayaran ? (
        <ErrorMessage />
      ) : !descendingpembayaran.length ? (
        <EmptyView
          message="Tidak ada riwayat pembayaran"
          className="h-[70vh]"
        />
      ) : (
        (selectedSort === "descending"
          ? descendingpembayaran
          : ascendingPembayaran
        ).map((bayar) => (
          <RiwayatCard
            id={bayar.id}
            title={bayar.Tagihan.judul_tagihan}
            nominal={bayar.nominal}
            payDate={bayar.tanggal_bayar}
            paymentMethod={bayar.metode_bayar}
            key={bayar.id}
          />
        ))
      )}
    </Layout>
  );
};

export default Riwayat;
