import { IonButton, IonImg, IonSkeletonText, IonSpinner } from "@ionic/react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import RiwayatCard from "../components/RiwayatCard";
import MainHeader from "../components/MainHeader";
import { RouteComponentProps } from "react-router";
import { fetchWithToken, signOut } from "../lib/utils";
import { API_URL } from "../lib/variables";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { dispatch, stateType } from "../store";
import { fetchUserInfo } from "../store/user";
import { fetchPembayaran, selectAllPembayaran } from "../store/pembayaran";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { fetchTagihan } from "../store/tagihan";
import EmptyView from "../components/EmptyView";
import ImageViewer from "../components/ImageViewer";
import { Preferences } from "@capacitor/preferences";

const Home: React.FC<RouteComponentProps> = () => {
  const loadingUserInfo = useSelector((state: stateType) => state.user.loading);
  const userInfo = useSelector((state: stateType) => state.user.user);
  const loadingPembayaran = useSelector(
    (state: stateType) => state.pembayaran.loading
  );
  const errorPembayaran = useSelector(
    (state: stateType) => state.pembayaran.error
  );
  const pembayaran = useSelector((state: stateType) =>
    selectAllPembayaran(state)
  ).slice(0, 4);
  console.log("pembayaran : ", pembayaran)
  const getUser = async () => {
    const token = await Preferences.get({key: "token"});
    const getId = await fetchWithToken(API_URL + "/api/user/read/token", {
      token: token.value?.toString(),
    });
    const { id } = getId.json as any;
    dispatch(fetchUserInfo(id));
    dispatch(fetchPembayaran(id));
    dispatch(fetchTagihan(id));
  };

  const out = async () => {
    await signOut();
    window.location.href = "/login";
  };

  const convTingkat = (tingkat: string) => {
    switch (tingkat) {
      case "l":
        return "satu";
      case "ll":
        return "dua";
      case "lll":
        return "tiga";
      default:
        break;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout header={<MainHeader />}>
      <Card>
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              {loadingUserInfo ? (
                <IonSkeletonText animated />
              ) : (
                <ImageViewer src={userInfo?.foto || ''} alt="siswa" className="w-20 h-20 border border-slate-500" />
              )}
            </div>
            <div className="flex justify-start items-start flex-col">
              {!userInfo ? (
                <>
                  <IonSkeletonText animated style={{ width: "150px" }} />
                  <IonSkeletonText animated style={{ width: "80px" }} />
                </>
              ) : (
                <>
                  <span className="font-bold">{userInfo?.nama}</span>
                  <span className="text-xs">{userInfo?.email}</span>
                </>
              )}
            </div>
          </div>
          {loadingUserInfo ? (
            <IonSkeletonText animated style={{ width: "25px" }} />
          ) : (
            <span className="text-xs mt-2 uppercase">{userInfo?.kelas}</span>
          )}
        </div>
        <Card>
          <div className="flex justify-start items-start flex-col gap-1 font-bold">
            <span>Alamat</span>
            {loadingUserInfo ? (
              <>
                <IonSkeletonText animated style={{ width: "200px" }} />
                <IonSkeletonText animated style={{ width: "150px" }} />
                <IonSkeletonText animated style={{ width: "100px" }} />
              </>
            ) : (
              <>
                <span className="text-xs font-thin">{userInfo?.alamat}</span>
              </>
            )}
          </div>
          <div className="flex justify-start items-start flex-col gap-1 font-bold">
            <span>Nis</span>
            {loadingUserInfo ? (
              <IonSkeletonText animated style={{ width: "150px" }} />
            ) : (
              <span className="text-xs font-thin">{userInfo?.nis}</span>
            )}
          </div>
          <div className="flex justify-start items-start flex-col gap-1 font-bold">
            <span>No. Telp</span>
            {loadingUserInfo ? (
              <IonSkeletonText animated style={{ width: "150px" }} />
            ) : (
              <span className="text-xs font-thin">{userInfo?.no_telp}</span>
            )}
          </div>
          <div className="flex justify-start items-start flex-col gap-1 font-bold">
            <span>Angkatan</span>
            {loadingUserInfo ? (
              <IonSkeletonText animated style={{ width: "100px" }} />
            ) : (
              <span className="text-xs font-thin">{userInfo?.angkatan}</span>
            )}
          </div>
          <div className="flex justify-start items-start flex-col gap-1 font-bold">
            <span>Tingkat</span>
            {loadingUserInfo ? (
              <IonSkeletonText animated style={{ width: "80px" }} />
            ) : (
              <span className="text-xs font-thin capitalize">
                {userInfo?.tingkat}
              </span>
            )}
          </div>
          <div className="w-full flex justify-center">
            <IonButton
              fill="clear"
              className="w-44"
              color={"danger"}
              onClick={() => out()}
            >
              Sign Out
            </IonButton>
          </div>
        </Card>
      </Card>
      <Card>
        <div className="flex justify-start items-start font-bold flex-col text-xl">
          <span>Riwayat Pembayaran</span>
          <span className="text-xs font-thin">
            Menampilkan 4 transaksi terakhir
          </span>
        </div>
        {loadingPembayaran ? (
          <Loader />
        ) : errorPembayaran ? (
          <ErrorMessage />
        ) : !pembayaran.length ? (
          <EmptyView message="Tidak ada riwayat pembayaran" className="h-48" />
        ) : (
          pembayaran.map((bayar) => (
            <RiwayatCard
              id={bayar.id}
              title={bayar.Tagihan.judul_tagihan}
              nominal={bayar.nominal}
              payDate={bayar.tanggal_bayar}
              paymentMethod={bayar.metode_bayar}
              key={bayar.id}
              className="p-3"
            />
          ))
        )}
      </Card>
    </Layout>
  );
};

export default Home;
