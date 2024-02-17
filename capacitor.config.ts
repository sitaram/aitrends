import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'live.aitrends',
  appName: 'AITrends',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
