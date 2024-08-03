import React from 'react'
import { RouteComponentProps } from 'react-router'
import Layout from '../components/Layout'
import Card from '../components/Card'
import SecondaryHeader from '../components/SecondaryHeader'
import { useSelector } from 'react-redux'
import { selectPembayaranById } from '../store/pembayaran'
import { stateType } from '../store'
import { parseCurrency, standartDate } from '../lib/utils'

interface DetailRiwayatProps extends RouteComponentProps<{ id: string }> { }
const DetailRiwayat: React.FC<DetailRiwayatProps> = ({ match }) => {
    const detailPembayaran = useSelector((state: stateType) => selectPembayaranById(state, match.params.id as any));

    return (
        <Layout
            header={<SecondaryHeader title='detail Pembayaran' />}
        >
            <Card>
                <div className='flex flex-col capitalize gap-1'>
                    <span className='font-bold text-sm'>nama pembayaran</span>
                    <span>{detailPembayaran.Tagihan.judul_tagihan}</span>
                </div>
                <div className='flex flex-col capitalize gap-1'>
                    <span className='font-bold text-sm'>jumlah pembayaran</span>
                    <span>Rp. {parseCurrency(detailPembayaran.nominal)}</span>
                </div>
                <div className='flex flex-col capitalize gap-1'>
                    <span className='font-bold text-sm'>tanggal pembayaran</span>
                    <span>{standartDate(detailPembayaran.tanggal_bayar)}</span>
                </div>
                <div className='flex flex-col capitalize gap-1'>
                    <span className='font-bold text-sm'>metode pembayaran</span>
                    <span>{detailPembayaran.metode_bayar}</span>
                </div>
            </Card>
        </Layout>
    )
}

export default DetailRiwayat