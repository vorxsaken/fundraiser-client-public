import { FC } from "react";
import Layout from "../components/Layout";
import SecondaryHeader from "../components/SecondaryHeader";
import Card from "../components/Card";
import {
  IonAccordion,
  IonAccordionGroup,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { stateType } from "../store";
import { parseCurrency } from "../lib/utils";

const Instruction: FC = () => {
  const paymentMethod = useSelector((state: stateType) => state.paymentMethod)
  
  return (
    <Layout header={<SecondaryHeader title="Instruksi Bayar" />}>
      <Card className="p-4">
        <div className="flex flex-col font-bold text-lg">
          <span>Instruksi Pembayaran</span>
          <span className="text-xs font-thin">
            Silahkan ikuti istruksi pembayaran dibawah untuk menyelesaikan
            pembayaran
          </span>
        </div>
      </Card>
      <Card className="px-4 pt-5 pb-8">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <span className="text-xs">
            Nominal yang harus anda bayarkan adalah
          </span>
          <span className="text-4xl text-blue-500 font-bold">
            Rp. {parseCurrency(paymentMethod.nominal)}
          </span>
        </div>
      </Card>
      <Card className="p-1">
        <div className="w-full">
          <IonAccordionGroup>
            <IonRadioGroup>
              <IonAccordion value="first">
                <IonItem slot="header" color="light">
                  <IonLabel>ATM</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <ol className="list-decimal px-5 flex flex-col gap-4">
                    <li>
                      <IonLabel>{`Masukkan kartu ATM.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Masukkan 6 digit PIN ATM.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Pilih menu Transaksi Lainnya > Transfer > Antar Bank Online.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Masukkan Kode Bank dan Nomor Virtual Account : ${paymentMethod.va_number} .`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Pastikan nominal yang muncul di layar sudah sesuai dengan nominal di invoice.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Pilih OK atau YES.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Selesai.`}</IonLabel>
                    </li>
                  </ol>
                </div>
              </IonAccordion>
              <IonAccordion value="second">
                <IonItem slot="header" color="light">
                  <IonLabel>Mobile Banking</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                <ol className="list-decimal px-5 flex flex-col gap-4">
                    <li>
                      <IonLabel>{`Buka aplikasi BRImo di smartphone.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Masukkan username dan password.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Pilih menu BRIVA.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Klik Tombol 'Tambah Transaksi Baru.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Masukkan Virtual Account : ${paymentMethod.va_number}.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Masukkan nominal yang harus dibayarkan.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Layar akan menunjukkan konfirmasi. Apabila telah sesuai, pilih Lanjutkan / Kirim.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Masukkan PIN transaksi.`}</IonLabel>
                    </li>
                    <li>
                      <IonLabel>{`Selesai.`}</IonLabel>
                    </li>
                  </ol>
                </div>
              </IonAccordion>
            </IonRadioGroup>
          </IonAccordionGroup>
        </div>
      </Card>
    </Layout>
  );
};

export default Instruction;
