import type { CapacitorConfig } from "@capacitor/cli";

const serverUrl = process.env.CAPACITOR_SERVER_URL || "https://example.com";

const config: CapacitorConfig = {
  appId: "com.fileconvert.app",
  appName: "File Convert App",
  webDir: "www",
  server: {
    url: serverUrl,
    cleartext: false,
    androidScheme: "https",
  },
};

export default config;
