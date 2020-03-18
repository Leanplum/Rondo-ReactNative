import AsyncStorage from '@react-native-community/async-storage';

export interface LeanplumEnvConfig {
  apiHost: string;
  apiSsl: boolean;
  socketHostname: string;
  socketPort: number;
}

export class EnvsStorage {
  private static readonly envsKey = 'envs';
  private static readonly currentEnvKey = 'currentEnvId';

  static async save(env: LeanplumEnvConfig): Promise<void> {
    const envs = await this.getAll();
    envs.push(env);
    AsyncStorage.setItem(this.envsKey, JSON.stringify(envs));
  }

  static async getAll(): Promise<LeanplumEnvConfig[]> {
    const envs = await AsyncStorage.getItem(this.envsKey);
    return JSON.parse(envs || '[]');
  }

  static async currentEnv(): Promise<LeanplumEnvConfig | undefined> {
    try {
      const envId = await AsyncStorage.getItem(this.currentEnvKey);
      const envs = await this.getAll();
      const env = envs.find((env: LeanplumEnvConfig) => env.apiHost === envId);
      return env;
    } catch (e) {
      return undefined;
    }
  }

  static async getEnv(envId: string): Promise<LeanplumEnvConfig | undefined> {
    try {
      const envs = await this.getAll();
      const env = envs.find((env: LeanplumEnvConfig) => env.apiHost === envId);
      return env;
    } catch (e) {
      return undefined;
    }
  }

  static async selectEnv(id: string) {
    await AsyncStorage.setItem(this.currentEnvKey, id);
  }
}
