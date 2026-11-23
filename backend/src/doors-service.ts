import * as fs from 'node:fs';
import * as path from 'node:path';
import prisma from './prisma';
import { Prisma } from '@prisma/client';

export interface ScrapedDoor {
  id: string;
  name: string;
  modelCode: string;
  category: string;
  dimensions: string;
  material: string;
  finish: string;
  hardwareSpecs: string;
  fireRating: string;
  acousticRating: string;
  unitPrice: number;
  installationPrice: number;
  installationSeries?: string;
  installationVariant?: string;
  formattedPrice?: string;
  stockQuantity: number;
  leadTimeDays: number;
  status: 'in_stock' | 'low_stock' | 'made_to_order' | 'discontinued';
  supplierOrWorkshop: string;
  imageUrl?: string;
  sourceUrl?: string;
  scrapedAt?: string;
  description: string;
  warrantyYears: number;
  createdAt: string;
}

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

// In-memory cache
let cachedDoors: ScrapedDoor[] = [];
let lastScrapeTime: string | null = null;

function ensureDataDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('Failed to create data dir', err);
  }
}

export function loadDoorsFromFile(): ScrapedDoor[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read doors-catalog.json', err);
  }
  return [];
}

export function saveDoorsToFile(doors: ScrapedDoor[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(doors, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write doors-catalog.json', err);
  }
}

export function computeDefaultInstallationPrice(name: string, category: string): number {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();
  const text = `${c} ${n}`;

  // DM Interior & Turkey Interior -> 250
  if (text.includes('dm interior') || text.includes('doormaster interior') || text.includes('turkey interior')) {
    return 250;
  }

  // Royal Series Installation: Double with pillars 2000, Economic double 1500, One & Half 500, Single 400
  if (text.includes('royal') || text.includes('villa')) {
    if (text.includes('pillar')) return 2000;
    if (text.includes('economic') || text.includes('double') || text.includes('2x')) return 1500;
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) return 500;
    if (text.includes('single') || /\bsin\b/.test(text)) return 400;
    return 1500;
  }

  // Special Series Installation: Single 400, One and Half 500, Double 600
  if (text.includes('special series') || text.includes('special')) {
    if (text.includes('double') || text.includes('2x')) return 600;
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) return 500;
    if (text.includes('single') || /\bsin\b/.test(text)) return 400;
    return 500;
  }

  // Door-in-Door: Single 450, OH 550, Double 650
  if (text.includes('door-in-door') || text.includes('door in door')) {
    if (text.includes('double') || text.includes('2x')) return 650;
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return 550;
    if (text.includes('single') || /\bsin\b/.test(text)) return 450;
    return 450;
  }

  // Economy: 2x 350, OH 250, Sin 200, Locks 100
  if (text.includes('economy') || text.includes('china')) {
    if (text.includes('lock')) return 100;
    if (text.includes('2x') || text.includes('double')) return 350;
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return 250;
    if (text.includes('single') || /\bsin\b/.test(text)) return 200;
    return 200;
  }

  // Glass / Wooden Metal -> 200
  if (text.includes('glass') || text.includes('wooden metal') || text.includes('wooden finish')) {
    return 200;
  }

  // Smart / Mechanical Locks: Turkey 150, Economy 100
  if (c.includes('lock') || (n.includes('lock') && !text.includes('door'))) {
    return text.includes('economy') ? 100 : 150;
  }

  // Turkey Doors: Pivot 700, 2x 550, OH 450, Sin 350, Locks 150
  if (
    text.includes('turkey') ||
    text.includes('alucobond') ||
    text.includes('laminox') ||
    text.includes('full metal') ||
    text.includes('pvc') ||
    text.includes('cement board') ||
    text.includes('antifade')
  ) {
    if (text.includes('pivot')) return 700;
    if (text.includes('2x') || text.includes('double')) return 550;
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return 450;
    if (text.includes('lock')) return 150;
    if (text.includes('single') || /\bsin\b/.test(text)) return 350;
    return 350;
  }

  return 250;
}

export function inferInstallationOption(name: string, category: string): {
  series: string;
  variant: string;
  price: number;
} {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();
  const text = `${c} ${n}`;
  const price = computeDefaultInstallationPrice(name, category);

  if (text.includes('dm interior') || text.includes('doormaster interior')) {
    return { series: 'DM Interior', variant: 'DM Interior', price };
  }
  if (text.includes('turkey interior')) {
    return { series: 'Turkey Doors', variant: 'Turkey interior', price };
  }
  if (text.includes('royal') || text.includes('villa')) {
    if (text.includes('pillar')) return { series: 'Royal Series', variant: 'Royal Double with pillars', price };
    if (text.includes('economic') || text.includes('double') || text.includes('2x')) return { series: 'Royal Series', variant: 'Royal Economic double', price };
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) return { series: 'Royal Series', variant: 'Royal One & Half', price };
    return { series: 'Royal Series', variant: 'Royal Single', price };
  }
  if (text.includes('special series') || text.includes('special')) {
    if (text.includes('double') || text.includes('2x')) return { series: 'Special Series', variant: 'Special Series Double', price };
    if (text.includes('one & half') || text.includes('one and half') || text.includes('1.5') || /\boh\b/.test(text)) return { series: 'Special Series', variant: 'Special Series One and Half', price };
    return { series: 'Special Series', variant: 'Special Series Single', price };
  }
  if (text.includes('door-in-door') || text.includes('door in door')) {
    if (text.includes('double') || text.includes('2x')) return { series: 'Door-in-Door', variant: 'Door-in-Door Double', price };
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return { series: 'Door-in-Door', variant: 'Door-in-Door OH', price };
    return { series: 'Door-in-Door', variant: 'Door-in-Door Single', price };
  }
  if (text.includes('economy') || text.includes('china')) {
    if (text.includes('lock')) return { series: 'Economy', variant: 'Economy Lock', price };
    if (text.includes('2x') || text.includes('double')) return { series: 'Economy', variant: 'Economy 2x', price };
    if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return { series: 'Economy', variant: 'Economy OH', price };
    return { series: 'Economy', variant: 'Economy Single', price };
  }
  if (text.includes('glass') || text.includes('wooden metal') || text.includes('wooden finish')) {
    return { series: 'Glass / Wooden Metal', variant: 'Glass Wooden Metal', price };
  }
  if (c.includes('lock') || (n.includes('lock') && !text.includes('door'))) {
    return text.includes('economy')
      ? { series: 'Economy', variant: 'Economy Lock', price }
      : { series: 'Turkey Doors', variant: 'Turkey Lock', price };
  }
  if (text.includes('pivot')) return { series: 'Turkey Doors', variant: 'Turkey Pivot', price };
  if (text.includes('2x') || text.includes('double')) return { series: 'Turkey Doors', variant: 'Turkey 2x', price };
  if (/\boh\b/.test(text) || text.includes('one & half') || text.includes('one and half') || text.includes('1.5')) return { series: 'Turkey Doors', variant: 'Turkey OH', price };
  return { series: 'Turkey Doors', variant: 'Turkey Single', price };
}

/**
 * Get all doors catalog:
 * 1. Checks Prisma `door` model first
 * 2. Falls back to disk cache / file
 */
export async function getDoorsCatalog(): Promise<{
  doors: ScrapedDoor[];
  source: 'mysql' | 'memory_cache' | 'disk_cache';
  lastSync: string | null;
}> {
  // 1. Try Prisma ORM
  try {
    const rows = await prisma.door.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (rows && rows.length > 0) {
      const doors: ScrapedDoor[] = rows.map((r) => {
        const inferred = inferInstallationOption(r.name, r.category || '');
        return {
        id: r.id,
        name: r.name,
        modelCode: r.modelCode || '',
        category: r.category || 'General Doors',
        dimensions: r.dimensions || '2100 × 900 × 50mm',
        material: r.material || '',
        finish: r.finish || '',
        hardwareSpecs: r.hardwareSpecs || '',
        fireRating: r.fireRating || 'Standard / FD30',
        acousticRating: r.acousticRating || '35 dB',
        unitPrice: Number(r.unitPrice),
        installationPrice: Number((r as any).installationPrice ?? inferred.price),
        installationSeries: inferred.series,
        installationVariant: inferred.variant,
        formattedPrice: r.formattedPrice || `₵${Number(r.unitPrice).toLocaleString()}`,
        stockQuantity: r.stockQuantity,
        leadTimeDays: r.leadTimeDays,
        status: (r.status as ScrapedDoor['status']) || 'in_stock',
        supplierOrWorkshop: r.supplierOrWorkshop || 'Door Master Official (doormaster.online)',
        imageUrl: r.imageUrl || undefined,
        sourceUrl: r.sourceUrl || undefined,
        scrapedAt: r.scrapedAt || undefined,
        description: r.description || '',
        warrantyYears: r.warrantyYears,
        createdAt: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
        };
      });

      cachedDoors = doors;
      lastScrapeTime = doors[0]?.scrapedAt || new Date().toISOString();
      return { doors, source: 'mysql', lastSync: lastScrapeTime };
    }
  } catch (dbErr) {
    console.warn('[DoorsService] Prisma query failed, falling back to disk cache:', (dbErr as Error).message);
  }

  // 2. Try Memory Cache
  if (cachedDoors.length > 0) {
    return { doors: cachedDoors, source: 'memory_cache', lastSync: lastScrapeTime };
  }

  // 3. Try Disk Cache
  const fileDoors = loadDoorsFromFile();
  if (fileDoors.length > 0) {
    cachedDoors = fileDoors;
    lastScrapeTime = fileDoors[0]?.scrapedAt || null;
    return { doors: cachedDoors, source: 'disk_cache', lastSync: lastScrapeTime };
  }

  return { doors: [], source: 'disk_cache', lastSync: null };
}

/**
 * Get categories with door counts using Prisma
 */
export async function getDoorCategories(): Promise<{ category: string; count: number }[]> {
  try {
    const grouped = await prisma.door.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: 'desc',
        },
      },
    });

    if (grouped && grouped.length > 0) {
      return grouped.map((g) => ({
        category: g.category || 'General Doors',
        count: g._count.category,
      }));
    }
  } catch (err) {
    console.warn('[DoorsService] Prisma category grouping query failed:', (err as Error).message);
  }

  // Fallback to in-memory/file
  const doors = cachedDoors.length > 0 ? cachedDoors : loadDoorsFromFile();
  const catMap = new Map<string, number>();
  doors.forEach((d) => {
    catMap.set(d.category, (catMap.get(d.category) || 0) + 1);
  });
  return Array.from(catMap.entries()).map(([category, count]) => ({ category, count }));
}

/**
 * Add a door using Prisma
 */
export async function addDoorEntry(door: Partial<ScrapedDoor>): Promise<ScrapedDoor> {
  const newDoor: ScrapedDoor = {
    id: door.id || `DMO-${Date.now().toString(36).toUpperCase()}`,
    name: door.name || 'Custom Architectural Door',
    modelCode: door.modelCode || `DM-${Math.floor(100 + Math.random() * 900)}`,
    category: door.category || 'Premium Villa Series',
    dimensions: door.dimensions || '2100 × 900 × 50mm',
    material: door.material || 'Reinforced Steel & Hardwood Composite',
    finish: door.finish || 'Custom Baked Enamel & Woodgrain',
    hardwareSpecs: door.hardwareSpecs || '3-Point Mortise Security Lock',
    fireRating: door.fireRating || 'Standard / FD30',
    acousticRating: door.acousticRating || '35 dB',
    unitPrice: Number(door.unitPrice) || 2500,
    installationPrice: door.installationPrice !== undefined && door.installationPrice !== null
      ? Number(door.installationPrice)
      : computeDefaultInstallationPrice(door.name || '', door.category || ''),
    formattedPrice: door.formattedPrice || `₵${Number(door.unitPrice || 2500).toLocaleString()}`,
    stockQuantity: Number(door.stockQuantity) || 4,
    leadTimeDays: Number(door.leadTimeDays) || 3,
    status: door.status || 'in_stock',
    supplierOrWorkshop: door.supplierOrWorkshop || 'DoorMaster Official',
    imageUrl: door.imageUrl || 'https://doormaster.online/wp-content/uploads/2026/07/P.V-1-500x600.png',
    sourceUrl: door.sourceUrl || 'https://doormaster.online/shop/',
    scrapedAt: new Date().toISOString(),
    description: door.description || 'Custom configured DoorMaster architectural door.',
    warrantyYears: Number(door.warrantyYears) || 10,
    createdAt: new Date().toISOString(),
  };

  try {
    await prisma.door.upsert({
      where: { id: newDoor.id },
      update: {
        name: newDoor.name,
        modelCode: newDoor.modelCode,
        category: newDoor.category,
        dimensions: newDoor.dimensions,
        material: newDoor.material,
        finish: newDoor.finish,
        hardwareSpecs: newDoor.hardwareSpecs,
        fireRating: newDoor.fireRating,
        acousticRating: newDoor.acousticRating,
        unitPrice: new Prisma.Decimal(newDoor.unitPrice),
        installationPrice: new Prisma.Decimal(newDoor.installationPrice),
        formattedPrice: newDoor.formattedPrice,
        stockQuantity: newDoor.stockQuantity,
        leadTimeDays: newDoor.leadTimeDays,
        status: newDoor.status,
        supplierOrWorkshop: newDoor.supplierOrWorkshop,
        imageUrl: newDoor.imageUrl,
        sourceUrl: newDoor.sourceUrl,
        scrapedAt: newDoor.scrapedAt,
        description: newDoor.description,
        warrantyYears: newDoor.warrantyYears,
      },
      create: {
        id: newDoor.id,
        name: newDoor.name,
        modelCode: newDoor.modelCode,
        category: newDoor.category,
        dimensions: newDoor.dimensions,
        material: newDoor.material,
        finish: newDoor.finish,
        hardwareSpecs: newDoor.hardwareSpecs,
        fireRating: newDoor.fireRating,
        acousticRating: newDoor.acousticRating,
        unitPrice: new Prisma.Decimal(newDoor.unitPrice),
        installationPrice: new Prisma.Decimal(newDoor.installationPrice),
        formattedPrice: newDoor.formattedPrice,
        stockQuantity: newDoor.stockQuantity,
        leadTimeDays: newDoor.leadTimeDays,
        status: newDoor.status,
        supplierOrWorkshop: newDoor.supplierOrWorkshop,
        imageUrl: newDoor.imageUrl,
        sourceUrl: newDoor.sourceUrl,
        scrapedAt: newDoor.scrapedAt,
        description: newDoor.description,
        warrantyYears: newDoor.warrantyYears,
      },
    });
  } catch (err) {
    console.error('[DoorsService] Failed inserting door into Prisma:', (err as Error).message);
  }

  cachedDoors = [newDoor, ...cachedDoors];
  saveDoorsToFile(cachedDoors);
  return newDoor;
}

/**
 * Update door stock quantity & status using Prisma
 */
export async function updateDoorStock(
  id: string,
  stockQuantity: number,
  status?: ScrapedDoor['status']
): Promise<ScrapedDoor | null> {
  const newStatus = status || (stockQuantity <= 0 ? 'made_to_order' : stockQuantity <= 2 ? 'low_stock' : 'in_stock');

  try {
    const updated = await prisma.door.update({
      where: { id },
      data: {
        stockQuantity,
        status: newStatus,
      },
    });

    const res: ScrapedDoor = {
      id: updated.id,
      name: updated.name,
      modelCode: updated.modelCode || '',
      category: updated.category || 'General Doors',
      dimensions: updated.dimensions || '2100 × 900 × 50mm',
      material: updated.material || '',
      finish: updated.finish || '',
      hardwareSpecs: updated.hardwareSpecs || '',
      fireRating: updated.fireRating || 'Standard / FD30',
      acousticRating: updated.acousticRating || '35 dB',
      unitPrice: Number(updated.unitPrice),
      installationPrice: Number((updated as any).installationPrice ?? computeDefaultInstallationPrice(updated.name, updated.category || '')),
      formattedPrice: updated.formattedPrice || undefined,
      stockQuantity: updated.stockQuantity,
      leadTimeDays: updated.leadTimeDays,
      status: (updated.status as ScrapedDoor['status']) || 'in_stock',
      supplierOrWorkshop: updated.supplierOrWorkshop || '',
      imageUrl: updated.imageUrl || undefined,
      sourceUrl: updated.sourceUrl || undefined,
      scrapedAt: updated.scrapedAt || undefined,
      description: updated.description || '',
      warrantyYears: updated.warrantyYears,
      createdAt: updated.createdAt.toISOString(),
    };

    const index = cachedDoors.findIndex((d) => d.id === id);
    if (index !== -1) {
      cachedDoors[index] = res;
      saveDoorsToFile(cachedDoors);
    }

    return res;
  } catch (err) {
    console.warn('[DoorsService] Prisma stock update fallback:', (err as Error).message);
  }

  const index = cachedDoors.findIndex((d) => d.id === id);
  if (index !== -1) {
    cachedDoors[index] = {
      ...cachedDoors[index],
      stockQuantity,
      status: newStatus,
    };
    saveDoorsToFile(cachedDoors);
    return cachedDoors[index];
  }

  const fileDoors = loadDoorsFromFile();
  const fIndex = fileDoors.findIndex((d) => d.id === id);
  if (fIndex !== -1) {
    fileDoors[fIndex] = { ...fileDoors[fIndex], stockQuantity, status: newStatus };
    saveDoorsToFile(fileDoors);
    return fileDoors[fIndex];
  }

  return null;
}

/**
 * Update full door entry specifications & pricing (including installationPrice) using Prisma
 */
export async function updateDoorEntry(
  id: string,
  data: Partial<ScrapedDoor>
): Promise<ScrapedDoor | null> {
  const patchData: Record<string, any> = {};
  if (data.name !== undefined) patchData['name'] = data.name;
  if (data.modelCode !== undefined) patchData['modelCode'] = data.modelCode;
  if (data.category !== undefined) patchData['category'] = data.category;
  if (data.dimensions !== undefined) patchData['dimensions'] = data.dimensions;
  if (data.material !== undefined) patchData['material'] = data.material;
  if (data.finish !== undefined) patchData['finish'] = data.finish;
  if (data.hardwareSpecs !== undefined) patchData['hardwareSpecs'] = data.hardwareSpecs;
  if (data.fireRating !== undefined) patchData['fireRating'] = data.fireRating;
  if (data.acousticRating !== undefined) patchData['acousticRating'] = data.acousticRating;
  if (data.unitPrice !== undefined) {
    const priceNum = Number(data.unitPrice);
    patchData['unitPrice'] = new Prisma.Decimal(priceNum);
    patchData['formattedPrice'] = data.formattedPrice || `₵${priceNum.toLocaleString()}`;
  }
  if (data.installationPrice !== undefined) {
    patchData['installationPrice'] = new Prisma.Decimal(Number(data.installationPrice));
  }
  if (data.stockQuantity !== undefined) patchData['stockQuantity'] = Number(data.stockQuantity);
  if (data.leadTimeDays !== undefined) patchData['leadTimeDays'] = Number(data.leadTimeDays);
  if (data.status !== undefined) patchData['status'] = data.status;
  if (data.supplierOrWorkshop !== undefined) patchData['supplierOrWorkshop'] = data.supplierOrWorkshop;
  if (data.imageUrl !== undefined) patchData['imageUrl'] = data.imageUrl;
  if (data.sourceUrl !== undefined) patchData['sourceUrl'] = data.sourceUrl;
  if (data.description !== undefined) patchData['description'] = data.description;
  if (data.warrantyYears !== undefined) patchData['warrantyYears'] = Number(data.warrantyYears);

  try {
    const updated = await prisma.door.update({
      where: { id },
      data: patchData,
    });

    const res: ScrapedDoor = {
      id: updated.id,
      name: updated.name,
      modelCode: updated.modelCode || '',
      category: updated.category || 'General Doors',
      dimensions: updated.dimensions || '2100 × 900 × 50mm',
      material: updated.material || '',
      finish: updated.finish || '',
      hardwareSpecs: updated.hardwareSpecs || '',
      fireRating: updated.fireRating || 'Standard / FD30',
      acousticRating: updated.acousticRating || '35 dB',
      unitPrice: Number(updated.unitPrice),
      installationPrice: Number((updated as any).installationPrice ?? computeDefaultInstallationPrice(updated.name, updated.category || '')),
      formattedPrice: updated.formattedPrice || `₵${Number(updated.unitPrice).toLocaleString()}`,
      stockQuantity: updated.stockQuantity,
      leadTimeDays: updated.leadTimeDays,
      status: (updated.status as ScrapedDoor['status']) || 'in_stock',
      supplierOrWorkshop: updated.supplierOrWorkshop || '',
      imageUrl: updated.imageUrl || undefined,
      sourceUrl: updated.sourceUrl || undefined,
      scrapedAt: updated.scrapedAt || undefined,
      description: updated.description || '',
      warrantyYears: updated.warrantyYears,
      createdAt: updated.createdAt.toISOString(),
    };

    const index = cachedDoors.findIndex((d) => d.id === id);
    if (index !== -1) {
      cachedDoors[index] = res;
      saveDoorsToFile(cachedDoors);
    }
    return res;
  } catch (err) {
    console.warn('[DoorsService] Prisma updateDoorEntry fallback:', (err as Error).message);
  }

  const index = cachedDoors.findIndex((d) => d.id === id);
  if (index !== -1) {
    cachedDoors[index] = {
      ...cachedDoors[index],
      ...data,
      unitPrice: data.unitPrice !== undefined ? Number(data.unitPrice) : cachedDoors[index].unitPrice,
      installationPrice: data.installationPrice !== undefined ? Number(data.installationPrice) : cachedDoors[index].installationPrice,
    };
    saveDoorsToFile(cachedDoors);
    return cachedDoors[index];
  }

  return null;
}

/**
 * Delete a door using Prisma
 */
export async function deleteDoor(id: string): Promise<boolean> {
  try {
    await prisma.door.delete({
      where: { id },
    });
  } catch (err) {
    console.warn('[DoorsService] Prisma delete notice:', (err as Error).message);
  }

  const initialLen = cachedDoors.length;
  cachedDoors = cachedDoors.filter((d) => d.id !== id);
  if (cachedDoors.length !== initialLen) {
    saveDoorsToFile(cachedDoors);
    return true;
  }
  return false;
}
