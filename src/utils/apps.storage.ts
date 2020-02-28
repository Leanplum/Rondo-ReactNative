import AsyncStorage from '@react-native-community/async-storage';

export interface LeanplumAppConfig {
  productionKey: string;
  developmentKey: string;
  appId: string;
  name: string;
}

export class AppsStorage {
  private static readonly appsKey = 'apps';
  private static readonly currentAppKey = 'currentAppId';

  static async save(app: LeanplumAppConfig): Promise<void> {
    const apps = await this.getAll();
    apps.push(app);
    AsyncStorage.setItem(this.appsKey, JSON.stringify(apps));
  }

  static async getAll(): Promise<LeanplumAppConfig[]> {
    const apps = await AsyncStorage.getItem(this.appsKey);
    return JSON.parse(apps || '[]');
  }

  static async currentApp(): Promise<LeanplumAppConfig | undefined> {
    try {
      const appId = await AsyncStorage.getItem(this.currentAppKey);
      const apps = await this.getAll();
      const app = apps.find((app: LeanplumAppConfig) => app.appId === appId);
      return app;
    } catch (e) {
      return undefined;
    }
  }
}
