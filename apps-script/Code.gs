/**
 * Google Apps Script for Contacts Manager web app.
 *
 * Deploy:
 * 1. Open the spreadsheet → Extensions → Apps Script.
 * 2. Replace Code.gs with this file (keep your APP_PASSWORD if you already have one).
 * 3. Add header in row 1 column I: "Expiration Date" (optional but recommended).
 * 4. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
 * 5. Paste the new /exec URL into index.html scriptURL if it changes.
 *
 * Column layout (sheet tab "data"):
 * A Username | B Password | C Email | D Phone | E Server/PANEL | F AutoPay | G Notes | H Helper (legacy) | I Expiration
 */

const SHEET_NAME = 'data';
/** Must match the password you enter in the web app unlock screen. */
const APP_PASSWORD = 'REPLACE_WITH_YOUR_APP_PASSWORD';

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    if (String(p.password || '') !== APP_PASSWORD) {
      return textOut('Unauthorized');
    }

    const action = String(p.action || '').toLowerCase();
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sh) return textOut('Error: sheet not found');

    if (action === 'add') {
      sh.appendRow(buildRow_(sh, p, null));
      return textOut('OK');
    }

    if (action === 'edit') {
      const row = Number(p.row);
      if (!isFinite(row) || row < 2) return textOut('Error: invalid row');
      const out = buildRow_(sh, p, row);
      sh.getRange(row, 1, 1, out.length).setValues([out]);
      return textOut('OK');
    }

    if (action === 'delete') {
      const row = Number(p.row);
      if (!isFinite(row) || row < 2) return textOut('Error: invalid row');
      sh.deleteRow(row);
      return textOut('OK');
    }

    return textOut('Error: unknown action');
  } catch (err) {
    return textOut('Error: ' + err);
  }
}

function buildRow_(sh, p, existingRowNum) {
  var helper = '';
  if (existingRowNum) {
    var prev = sh.getRange(existingRowNum, 1, 1, 9).getValues()[0];
    helper = prev[7] != null ? String(prev[7]) : '';
  }

  return [
    String(p.username || ''),
    String(p.passwordField || ''),
    String(p.email || ''),
    String(p.phone || ''),
    String(p.server || ''),
    String(p.autoPay || ''),
    String(p.notes || ''),
    helper,
    normalizeExpiration_(p.expirationDate)
  ];
}

function normalizeExpiration_(val) {
  if (val == null || String(val).trim() === '') return '';
  var s = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  var d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function textOut(msg) {
  return ContentService.createTextOutput(msg).setMimeType(ContentService.MimeType.TEXT);
}
