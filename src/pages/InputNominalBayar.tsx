import { FC, useState } from "react";
import Layout from "../components/Layout";
import SecondaryHeader from "../components/SecondaryHeader";
import Card from "../components/Card";
import InputTextForm from "../components/InputTextForm";
import { useCustomForm } from "../lib/useCustomForm";
import { z } from "zod";
import { RouteComponentProps } from "react-router";
import { IonButton, IonSpinner, useIonRouter } from "@ionic/react";
import { dispatch, stateType } from "../store";
import { addNominal, addVirtualNumber } from "../store/paymentMethod";
import { draftPembayaranType, fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";
import { useSelector } from "react-redux";

interface NominalProps extends RouteComponentProps<{ id: any }> {}

const InputNominalBayar: FC<NominalProps> = ({
  match: {
    params: { id },
  },
}) => {
  const inputSchema = z.object({
    nominal: z
      .string()
      .refine((str) => str !== "", "Nominal tidak boleh kosong")
      .refine((str) => parseInt(str) >= 10000, "Nominal minimal 10.000"),
  });
  const [loading, setloading] = useState(false);
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
  } = useCustomForm(inputSchema);
  const router = useIonRouter();
  const paymentMethod = useSelector((state: stateType) => state.paymentMethod);
  const user = useSelector((state: stateType) => state.user)

  const proses = handleSubmit(async (val: z.infer<typeof inputSchema>) => {
    setloading(true);
    try {
      const res = await fetchWithToken<draftPembayaranType>(
        `${API_URL}/api/draftPembayaran/create`,
        {
          id_tagihan: id,
          id_user: user.user?.id,
          nominal: val.nominal,
          metode_pembayaran: paymentMethod.metodePembayaran,
          principal: paymentMethod.principal,
        }
      ) ;

      dispatch(addVirtualNumber(res.json.virtual_number))
      console.log(res);
    } catch (error) {
      console.log(error);
      return error;
    }

    setloading(true);
    dispatch(addNominal(val.nominal));
    router.push(`/tabs/pembayaran/instruction/${id}`, "forward", "replace");
  });

  return (
    <Layout header={<SecondaryHeader title="Input Nominal Bayar" />}>
      <Card className="p-4">
        <div className="flex flex-col font-bold text-lg">
          <span>Input Nominal Bayar</span>
          <span className="text-xs font-thin">
            Silahkan masukkan nominal angka yang ingin dibayarkan misal tagihan
            anda 300.000 dan anda ingin membayar 50.000 dulu diperbolehkan.
          </span>
        </div>
      </Card>
      <Card>
        <InputTextForm
          type="number"
          fill="outline"
          label="Nominal"
          labelPlacement="floating"
          errors={errors}
          fieldName="nominal"
          labelHelper="Masukkan nominal (min: 10.000)"
          {...register("nominal")}
        />
      </Card>
      <div className="w-full">
        <IonButton className="w-full" fill="outline" onClick={proses}>
          {loading ? <IonSpinner name="dots" /> : "Proses"}
        </IonButton>
      </div>
    </Layout>
  );
};

export default InputNominalBayar;
