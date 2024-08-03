import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pembayaransiswa.app',
  appName: 'Pembayaran Spp SMK CSK',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
