/**
 * Udupi Vrindavan — Google Apps Script
 * Handles TWO types of POST requests to the same endpoint:
 *   1) type: "reservation"  → saved in "Table Bookings" sheet
 *   2) everything else      → saved in "CRM Leads" sheet (existing behaviour)
 *
 * DEPLOY → Web App → Execute as "Me" → Anyone (even anonymous)
 */

function doPost(e) {
  try {
    var data   = JSON.parse(e.postData.contents);
    var ss     = SpreadsheetApp.getActiveSpreadsheet();
    var now    = new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' });

    if (data.type === 'reservation') {
      // ─── TABLE BOOKINGS SHEET ───────────────────────────────────────────
      var bookingSheet = ss.getSheetByName('Table Bookings');
      if (!bookingSheet) {
        bookingSheet = ss.insertSheet('Table Bookings');
        bookingSheet.appendRow([
          'Ticket ID', 'Name', 'Phone', 'Email',
          'Date', 'Time Slot', 'Guests', 'Notes', 'Submitted At'
        ]);
        // Freeze header row
        bookingSheet.setFrozenRows(1);
        // Bold header
        bookingSheet.getRange(1, 1, 1, 9).setFontWeight('bold')
                     .setBackground('#0F2F4A').setFontColor('#D4A65A');
      }

      bookingSheet.appendRow([
        data.id        || '',
        data.name      || '',
        data.phone     || '',
        data.email     || '',
        data.date      || '',
        data.timeSlot  || '',
        data.guests    || '',
        data.notes     || '',
        now
      ]);

    } else {
      // ─── CRM LEADS SHEET (default) ──────────────────────────────────────
      var crmSheet = ss.getSheetByName('CRM Leads') || ss.getSheets()[0];

      crmSheet.appendRow([
        data.name  || '',
        data.phone || '',
        data.email || '',
        now
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
