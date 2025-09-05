import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Sensor } from "./sensor";

export class HomeAssistant {
  private options: AxiosRequestConfig;
  private api: AxiosInstance;
  public sensors: Record<string, Sensor>;
  constructor(baseUrl: string, token: string) {
    this.options = { headers: { 'Authorization': 'Bearer ' + token } };
    // S'assurer que l'URL de base se termine par /api
    let apiUrl = baseUrl;
    if (!apiUrl.endsWith('/api')) {
      apiUrl = apiUrl.replace(/\/+$/, '') + '/api';
    }
    this.api = axios.create({
      baseURL: apiUrl,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    this.sensors = {};
  }

  registerSensor(sensorName: string, attributes: Record<string, unknown> = {}) {
    this.sensors[sensorName] = new Sensor(sensorName, attributes, this.api);

    return this.sensors[sensorName];
  }
}
