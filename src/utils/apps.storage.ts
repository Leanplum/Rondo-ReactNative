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

  static async getApp(appId: string): Promise<LeanplumAppConfig | undefined> {
    try {
      const apps = await this.getAll();
      const app = apps.find((app: LeanplumAppConfig) => app.appId === appId);
      return app;
    } catch (e) {
      return undefined;
    }
  }

  static async selectApp(id: string) {
    await AsyncStorage.setItem(this.currentAppKey, id);
  }

  static async getProductionMode() {
    const productionMode = await AsyncStorage.getItem("productionMode");
    return productionMode;
  }

  static async setProductionMode(mode: string) {
    await AsyncStorage.setItem("productionMode", mode);
  }

  static async getTrackEvent() {
    const productionMode = await AsyncStorage.getItem("trackEvent");
    return productionMode;
  }

  static async setTrackEvent(event: string) {
    await AsyncStorage.setItem("trackEvent", event);
  }
}
