import { beforeAll, describe, expect, it } from 'vitest';
import { base64url, emitirLicencia, verificarLicencia, type DatosLicencia } from './licencia';

let par: CryptoKeyPair;
let publica: string;
const datos: DatosLicencia = { v: 1, academia: 'Academia Sol', hasta: '2027-11-30', plan: 'pro', emitida: '2026-11-01' };

beforeAll(async () => {
  par = (await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify'])) as CryptoKeyPair;
  publica = base64url(new Uint8Array(await crypto.subtle.exportKey('raw', par.publicKey)));
});

describe('licencias', () => {
  it('una licencia firmada se acepta y enseña la academia', async () => {
    const clave = await emitirLicencia(datos, par.privateKey);
    const e = await verificarLicencia(clave, publica, new Date('2026-12-01'));
    expect(e).toEqual({ tipo: 'pro', datos });
  });

  it('caduca el día siguiente al último y sin fecha no caduca', async () => {
    const clave = await emitirLicencia(datos, par.privateKey);
    expect((await verificarLicencia(clave, publica, new Date('2027-11-30'))).tipo).toBe('pro');
    expect((await verificarLicencia(clave, publica, new Date('2027-12-01'))).tipo).toBe('caducada');
    const eterna = await emitirLicencia({ ...datos, hasta: null }, par.privateKey);
    expect((await verificarLicencia(eterna, publica, new Date('2040-01-01'))).tipo).toBe('pro');
  });

  it('cambiar los datos (otra academia o más fecha) invalida la firma', async () => {
    const [p, cuerpo, firma] = (await emitirLicencia(datos, par.privateKey)).split('.');
    const otro = base64url(new TextEncoder().encode(JSON.stringify({ ...datos, hasta: '2099-01-01' })));
    expect((await verificarLicencia(`${p}.${otro}.${firma}`, publica)).tipo).toBe('invalida');
    expect((await verificarLicencia(`${p}.${cuerpo}.${firma.slice(0, -2)}AA`, publica)).tipo).toBe('invalida');
  });

  it('la firma de otra persona no vale con nuestra clave pública', async () => {
    const otraPar = (await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify'])) as CryptoKeyPair;
    const clave = await emitirLicencia(datos, otraPar.privateKey);
    expect((await verificarLicencia(clave, publica)).tipo).toBe('invalida');
  });

  it('basura y claves a medias no rompen nada', async () => {
    for (const x of ['', 'hola', 'ELAB1.a.b', 'ELAB1..', 'XXXX.a.b']) expect((await verificarLicencia(x, publica)).tipo).toBe('invalida');
  });
});
