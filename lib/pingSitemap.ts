const SITEMAP_URL = "https://lifecarechoice.com/sitemap.xml";
const PING_ENDPOINT = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

async function pingSitemap() {
  try {
    const response = await fetch(PING_ENDPOINT);

    if (!response.ok) {
      console.warn(`Sitemap ping responded with status ${response.status}`);
      return;
    }

    console.log("Sitemap pinged successfully");
  } catch (error) {
    console.warn("Failed to ping sitemap:", error);
  }
}

pingSitemap();

