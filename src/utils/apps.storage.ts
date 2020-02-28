import AsyncStorage from '@react-native-community/async-storage';

export interface LeanplumAppConfig {
  productionKey: string;
  developmentKey: string;
  appId: string;
  name: string;
}

export class AppsStorage {
  private static readonly appsKey = 'apps';

  static async save(app: LeanplumAppConfig): Promise<void> {
    const apps = await this.getAll();
    apps.push(app);
    AsyncStorage.setItem(this.appsKey, JSON.stringify(apps));
  }

  static async getAll(): Promise<LeanplumAppConfig[]> {
    const apps = await AsyncStorage.getItem(this.appsKey);
    return JSON.parse(apps || '[]');
  }
}
