import { ALL_PLUGINS } from "../../../features/plugins";
import { NebulaPlugin } from "./types";

class PluginRegistry {
  private plugins = new Map<string, NebulaPlugin>();

  constructor() {
    ALL_PLUGINS.forEach((plugin) => this.register(plugin));
  }

  register(plugin: NebulaPlugin) {
    this.plugins.set(plugin.type, plugin);
  }

  get(type: string) {
    return this.plugins.get(type);
  }

  getAll() {
    return Array.from(this.plugins.values());
  }
}

export const registry = new PluginRegistry();
