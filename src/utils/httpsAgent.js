/**
 * ⚠️ ชั่วคราว: backend (Cloudways) ยังไม่ได้ผูก domain/SSL จริง ใบ cert เป็น self-signed
 * ทำให้การเรียก HTTPS ฝั่ง SSR เจอ error SELF_SIGNED_CERT_IN_CHAIN
 *
 * ไฟล์นี้รวม helper สำหรับ "ยอมรับ self-signed cert" ให้ใช้ร่วมกัน
 * ใช้ได้เฉพาะฝั่ง server เท่านั้น (guard ด้วย typeof window === 'undefined')
 *
 * - getHttpsAgent()      -> https.Agent สำหรับ axios (option: httpsAgent)
 * - getFetchDispatcher() -> undici Agent สำหรับ fetch ของ Node (option: dispatcher)
 *
 * TODO: เมื่อผูก domain + Let's Encrypt เรียบร้อยแล้ว ให้ลบไฟล์นี้และการเรียกใช้ทั้งหมดออก
 */

let _httpsAgent;
let _fetchDispatcher;

/** https.Agent สำหรับ axios */
export function getHttpsAgent() {
  if (typeof window !== 'undefined') return undefined;
  if (_httpsAgent) return _httpsAgent;

  const https = require('https');
  _httpsAgent = new https.Agent({ rejectUnauthorized: false });
  return _httpsAgent;
}

/** dispatcher สำหรับ fetch ของ Node (undici) */
export function getFetchDispatcher() {
  if (typeof window !== 'undefined') return undefined;
  if (_fetchDispatcher) return _fetchDispatcher;

  try {
    const { Agent } = require('undici');
    _fetchDispatcher = new Agent({ connect: { rejectUnauthorized: false } });
    return _fetchDispatcher;
  } catch (e) {
    console.warn('[httpsAgent] undici Agent ไม่พร้อมใช้งาน:', e?.message);
    return undefined;
  }
}
