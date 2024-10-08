import Endpoints, { fetchEndpoint } from "./endpoints";

type ProxyEntriesObject = Record<string, ReverseProxy>;
export type ReverseProxy = Record<string, any>;
export type Stream = Record<string, any>;
export type Column = { key: string; label: string };

export const ReverseProxyColumns = [
  { key: "container", label: "Container" },
  { key: "alias", label: "Alias" },
  { key: "provider", label: "Provider" },
  { key: "path_pattern", label: "Path Pattern" },
  { key: "target_url", label: "Target" },
];

export const StreamColumns = [
  { key: "container", label: "Container" },
  { key: "alias", label: "Alias" },
  { key: "provider", label: "Provider" },
  { key: "target", label: "Target" },
];

export async function getReverseProxies(signal: AbortSignal) {
  const results = await fetchEndpoint(Endpoints.LIST_PROXIES, {
    query: { type: "reverse_proxy" },
    signal: signal,
  });
  const model = (await results.json()) as ProxyEntriesObject;
  const reverseProxies: ReverseProxy[] = [];

  for (const entry of Object.values(model)) {
    for (const pattern of entry.path_patterns) {
      reverseProxies.push({
        container: entry.raw.proxy_properties.container_name,
        alias: entry.alias,
        provider: entry.provider,
        path_pattern: pattern,
        target_url: entry.target_url,
      });
    }
  }

  return reverseProxies;
}

export async function getStreams(signal: AbortSignal) {
  const results = await fetchEndpoint(Endpoints.LIST_PROXIES, {
    query: { type: "stream" },
    signal: signal,
  });
  const model = (await results.json()) as ProxyEntriesObject;
  const streams: Stream[] = [];

  for (const entry of Object.values(model)) {
    streams.push({
      container: entry.raw.proxy_properties.container_name,
      alias: entry.alias,
      provider: entry.provider,
      target: `${entry.scheme.listening}://${entry.host}:${entry.port.listening} => ${entry.scheme.proxy}://${entry.host}:${entry.port.proxy}`,
    });
  }

  return streams;
}
