import fs from 'fs';
import path from 'path';

const wranglerPath = path.join(process.cwd(), 'dist', 'server', 'wrangler.json');

if (fs.existsSync(wranglerPath)) {
  const config = JSON.parse(fs.readFileSync(wranglerPath, 'utf8'));

  // Remove the ASSETS binding because Cloudflare Pages manages it automatically
  if (config.assets) {
    delete config.assets;
  }

  // Remove empty triggers object
  if (config.triggers && Object.keys(config.triggers).length === 0) {
    delete config.triggers;
  }

  // Add dummy ID to KV namespaces to bypass validation
  if (config.kv_namespaces && Array.isArray(config.kv_namespaces)) {
    config.kv_namespaces.forEach(kv => {
      if (!kv.id) {
        // Cloudflare Pages requires an ID even if it dynamically links it later
        kv.id = "placeholder-id-for-pages";
      }
    });
  }

  // Remove other unexpected top-level fields that trigger warnings in Pages CI
  const fieldsToRemove = [
    "definedEnvironments", "ai_search_namespaces", "ai_search", "images",
    "secrets_store_secrets", "artifacts", "unsafe_hello_world", "flagship",
    "worker_loaders", "ratelimits", "vpc_services", "vpc_networks", 
    "python_modules", "previews", "cloudchamber", "mtls_certificates",
    "analytics_engine_datasets", "dispatch_namespaces", "services", "hyperdrive"
  ];
  fieldsToRemove.forEach(field => delete config[field]);

  // Remove unexpected dev fields
  if (config.dev) {
    delete config.dev.enable_containers;
    delete config.dev.generate_types;
  }

  fs.writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
  console.log('Fixed dist/server/wrangler.json for Cloudflare Pages deployment');
}
