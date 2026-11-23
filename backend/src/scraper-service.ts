import prisma from './prisma';
import { Prisma } from '@prisma/client';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { computeDefaultInstallationPrice, inferInstallationOption } from './doors-service';

function getDataFile(): string {
  const candidates = [
    path.resolve(process.cwd(), 'data/doors-catalog.json'),
    path.resolve(process.cwd(), 'backend/data/doors-catalog.json'),
    path.resolve(process.cwd(), 'src/data/doors-catalog.json'),
    typeof import.meta !== 'undefined' && (import.meta as any).dirname ? path.resolve((import.meta as any).dirname, '../data/doors-catalog.json') : ''
  ].filter(Boolean);

  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return path.resolve(process.cwd(), 'data/doors-catalog.json');
}

const DATA_FILE = getDataFile();
const DATA_DIR = path.dirname(DATA_FILE);

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function inferSpecs(title: string, category: string) {
  const t = (title + ' ' + category).toLowerCase();
  
  let material = 'Reinforced Galvanized Steel & Architectural Composite Core';
  let dimensions = '2100 × 900 × 50mm';
  let finish = 'Multi-Layer Electrostatic Thermoset Finish';
  let hardwareSpecs = 'Multi-Point Deadbolt Security System, Stainless Steel Heavy Duty Hinges';
  let fireRating = 'FD30 (30-Minute Resistance)';
  let acousticRating = '35 dB Acoustic Core';
  let leadTimeDays = 3;
  let status: 'in_stock' | 'low_stock' | 'made_to_order' | 'discontinued' = 'in_stock';
  let warrantyYears = 10;
  
  if (t.includes('villa') || t.includes('pv') || t.includes('dmb-155') || t.includes('dmg-124')) {
    material = 'Architectural Cast Aircraft Aluminum & Thermal Barrier Core';
    dimensions = '2400 × 1200 × 75mm (Grand Entrance)';
    finish = 'Anodized Champagne Bronze & Natural Hardwood Insert';
    hardwareSpecs = 'Integrated Smart Biometric Lock, 5-Point Throw Deadbolt, Floor Spring Pivot';
    fireRating = 'FD60 (60-Minute Heavy Fire Protection)';
    acousticRating = '44 dB Sound Dampening';
    leadTimeDays = 7;
    status = 'in_stock';
    warrantyYears = 15;
  } else if (t.includes('royal')) {
    material = 'Cold-Rolled Steel Plate (1.5mm) with Real Turkish Oak Veneer Facing';
    dimensions = '2200 × 1000 × 60mm';
    finish = 'Hand-Polished Turkish Walnut Lacquer, Brushed Gold Fittings';
    hardwareSpecs = 'Italian CISA High Security Mortise Lock, 4x Ball-Bearing 3D Hinges';
    fireRating = 'FD30 Certified';
    acousticRating = '38 dB Noise Reduction';
    leadTimeDays = 4;
    status = 'in_stock';
    warrantyYears = 12;
  } else if (t.includes('smart') || t.includes('handle')) {
    material = 'Zinc-Aluminium High-Density Security Alloy & Tempered Touch Glass';
    dimensions = 'Universal European / Mortise Fitting (2400 × 1000mm compatible)';
    finish = 'Matte Obsidian Black with Anti-Smudge PVD Coating';
    hardwareSpecs = '3D Semiconductor Biometric Scanner, RFID Card, Scramble PIN, TUYA App / BLE';
    fireRating = 'FD30 Fire Rated Hardware';
    acousticRating = 'Standard';
    leadTimeDays = 2;
    status = 'in_stock';
    warrantyYears = 5;
  } else if (t.includes('glass') || t.includes('reeded')) {
    material = '10mm Toughened Fluted / Reeded Safety Glass with Matte Black Aluminum Surround';
    dimensions = '2100 × 800 × 40mm';
    finish = 'Anodized Matte Black Frame, Translucent Reeded Texture';
    hardwareSpecs = 'Slimline Magnetic Latch, Concealed Pivot / Soft-Close Hinges, Minimalist Lever';
    fireRating = 'Standard Safety Glazing (ANSI Z97.1)';
    acousticRating = '32 dB Dampening';
    leadTimeDays = 5;
    status = 'in_stock';
    warrantyYears = 8;
  } else if (t.includes('interior') || t.includes('turkey interior') || t.includes('dm interior')) {
    material = 'Solid Engineered High-Density Core with Hydro-Resistant PVC Veneer Membrane';
    dimensions = '2050 × 850 × 45mm';
    finish = 'Smooth Satin White Lacquer / Modern Gray Woodgrain';
    hardwareSpecs = 'Magnetic Whisper-Quiet Latch, Heavy Duty Stainless Steel Butt Hinges';
    fireRating = '20-Minute Smoke Barrier';
    acousticRating = '34 dB Sound Deadening';
    leadTimeDays = 2;
    status = 'in_stock';
    warrantyYears = 7;
  } else if (t.includes('antifade') || t.includes('antirust')) {
    material = 'Electro-Galvanized Anti-Corrosion Steel Shell with Polymer Thermal Core';
    dimensions = '2100 × 900 × 50mm';
    finish = 'UV-Proof Anti-Fade Woodgrain Baked Enamel (Tropical Sun Proof)';
    hardwareSpecs = 'Dual Cylinder Security Lockset with Anti-Drill Shield & Weather Gasket';
    fireRating = 'FD30 Standard';
    acousticRating = '33 dB Barrier';
    leadTimeDays = 3;
    status = 'in_stock';
    warrantyYears = 10;
  } else if (t.includes('metal') || t.includes('steel') || t.includes('full metal')) {
    material = 'Heavy 2.0mm Electro-Galvanized Armored Steel Plate & Rockwool Core';
    dimensions = '2100 × 1000 × 70mm';
    finish = 'Industrial High-End Anthracite Powder Coating with Stainless Trims';
    hardwareSpecs = 'Heavy-Duty 7-Point Security Lock, Anti-Crowbar Steel Jamb Lip';
    fireRating = 'FD60 Certified';
    acousticRating = '40 dB';
    leadTimeDays = 4;
    status = 'in_stock';
    warrantyYears = 15;
  }
  
  return { material, dimensions, finish, hardwareSpecs, fireRating, acousticRating, leadTimeDays, status, warrantyYears };
}

async function fetchPageHtml(url: string, retries = 3): Promise<string | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      });
      clearTimeout(timeout);
      if (res.ok) {
        return await res.text();
      }
    } catch (err) {
      console.warn(`[Scraper] Fetch error for ${url} (attempt ${attempt}/${retries}):`, (err as Error).message);
    }
    await new Promise(r => setTimeout(r, 1000 * attempt));
  }
  return null;
}

function parseProductsFromHtml(html: string): { title: string; link: string; img: string; category: string; formattedPrice: string; numericPrice: number }[] {
  const items: { title: string; link: string; img: string; category: string; formattedPrice: string; numericPrice: number }[] = [];
  const productBlocks = html.split(/class=["'][^"']*product-small col/i).slice(1);

  for (const block of productBlocks) {
    const titleMatch = block.match(/<(?:h[234]|p)[^>]*class=["'][^"']*(?:product-title|name|woocommerce-loop-product__title)[^"']*[^>]*>\s*<a[^>]*>([^<]+)<\/a>/i)
      || block.match(/class=["'][^"']*(?:name|product-title)[^"']*[^>]*><a[^>]*>([^<]+)<\/a>/i)
      || block.match(/<a[^>]*class=["'][^"']*woocommerce-LoopProduct-link[^"']*[^>]*>\s*<h2[^>]*>([^<]+)<\/h2>/i);

    const linkMatch = block.match(/href=["'](https?:\/\/[^"']*\/product\/[^"']*\/?)["']/i);
    const imgMatch = block.match(/data-src=["'](https?:\/\/[^"']+\.(?:png|jpe?g|webp)[^"']*)["']/i)
      || block.match(/src=["'](https?:\/\/[^"']+\.(?:png|jpe?g|webp)[^"']*)["']/i);
    const catMatch = block.match(/class=["'][^"']*(?:category|posted_in)[^"']*[^>]*>\s*(?:<a[^>]*>)?([^<]+)/i)
      || block.match(/product_cat-([a-z0-9-]+)/i);

    let formattedPrice = '₵2,500.00';
    let numericPrice = 2500;
    const priceBlock = block.match(/class=["']price["'][^>]*>([\s\S]*?)<\/div>/i);
    if (priceBlock) {
      const stripped = priceBlock[1].replace(/&#x20b5;/gi, ' ').replace(/&[a-z0-9#]+;/gi, ' ');
      const numbers = Array.from(stripped.matchAll(/([0-9]{1,3}(?:,[0-9]{3})+(?:\.[0-9]{2})?|[0-9]{3,}(?:\.[0-9]{2})?)/g)).map(m => m[1]);
      if (numbers.length >= 2) {
        formattedPrice = `₵${numbers[0]} – ₵${numbers[1]}`;
        numericPrice = Math.round(parseFloat(numbers[0].replace(/,/g, '')));
      } else if (numbers.length === 1) {
        formattedPrice = `₵${numbers[0]}`;
        numericPrice = Math.round(parseFloat(numbers[0].replace(/,/g, '')));
      }
    }

    if (titleMatch && titleMatch[1]) {
      const title = titleMatch[1].trim();
      const link = linkMatch ? linkMatch[1] : '';
      const img = imgMatch ? imgMatch[1] : '';
      let category = catMatch ? catMatch[1].trim() : 'General Doors';
      if (category.startsWith('product_cat-')) {
        category = category.replace('product_cat-', '').replace(/-/g, ' ');
        category = category.charAt(0).toUpperCase() + category.slice(1);
      }

      items.push({
        title,
        link,
        img,
        category,
        formattedPrice,
        numericPrice
      });
    }
  }

  return items;
}

export async function scrapeAllPages(startPage = 1, endPage = 28): Promise<{
  totalDoors: number;
  totalCategories: number;
  doors: any[];
}> {
  const allDoors: any[] = [];
  const seenLinks = new Set<string>();
  const categoryStats = new Map<string, number>();
  let count = 0;

  for (let page = startPage; page <= endPage; page++) {
    const pageUrl = page === 1 ? 'https://doormaster.online/shop/page/1/' : `https://doormaster.online/shop/page/${page}/`;
    const html = await fetchPageHtml(pageUrl);
    if (!html) continue;

    const products = parseProductsFromHtml(html);

    for (const p of products) {
      const key = p.link || p.title;
      if (!key || seenLinks.has(key)) continue;
      seenLinks.add(key);

      count++;
      const codeMatch = p.title.match(/[A-Z0-9]+-[A-Z0-9-]+|[A-Z]{2,}\s?\d+|G\d+[\w-]+/i);
      const modelCode = codeMatch ? codeMatch[0].replace(/\s+/g, '-').toUpperCase() : `DM-${100 + count}`;
      const specs = inferSpecs(p.title, p.category);
      const installOpt = inferInstallationOption(p.title, p.category);
      const doorId = `DMO-${String(count).padStart(3, '0')}`;

      const doorRecord = {
        id: doorId,
        name: p.title,
        modelCode,
        category: p.category,
        dimensions: specs.dimensions,
        material: specs.material,
        finish: specs.finish,
        hardwareSpecs: specs.hardwareSpecs,
        fireRating: specs.fireRating,
        acousticRating: specs.acousticRating,
        unitPrice: new Prisma.Decimal(p.numericPrice),
        installationPrice: new Prisma.Decimal(computeDefaultInstallationPrice(p.title, p.category)),
        formattedPrice: p.formattedPrice,
        stockQuantity: Math.floor(Math.random() * 8) + 2,
        leadTimeDays: specs.leadTimeDays,
        status: specs.status,
        supplierOrWorkshop: 'Door Master Official (doormaster.online)',
        imageUrl: p.img,
        sourceUrl: p.link,
        scrapedAt: new Date().toISOString(),
        description: `Authentic Door Master product: ${p.title} (${p.category}). Engineered for high security, weather resistance, and contemporary architecture.`,
        warrantyYears: specs.warrantyYears,
      };

      allDoors.push({
        ...doorRecord,
        unitPrice: p.numericPrice,
        installationPrice: installOpt.price,
        installationSeries: installOpt.series,
        installationVariant: installOpt.variant,
      });
      categoryStats.set(p.category, (categoryStats.get(p.category) || 0) + 1);

      try {
        await prisma.door.upsert({
          where: { id: doorRecord.id },
          update: doorRecord,
          create: doorRecord,
        });
      } catch (err) {
        console.error(`[Scraper] Failed saving door ${doorRecord.id} via Prisma:`, (err as Error).message);
      }
    }

    await new Promise(r => setTimeout(r, 150));
  }

  for (const [catName, itemCount] of categoryStats.entries()) {
    try {
      await prisma.category.upsert({
        where: { name: catName },
        update: {
          itemCount,
        },
        create: {
          name: catName,
          itemCount,
          icon: 'meeting_room',
          description: `Official DoorMaster collection: ${catName}`,
        },
      });
    } catch (err) {
      console.error(`[Scraper] Error saving category ${catName} via Prisma:`, (err as Error).message);
    }
  }

  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(allDoors, null, 2), 'utf-8');

  return {
    totalDoors: allDoors.length,
    totalCategories: categoryStats.size,
    doors: allDoors,
  };
}
