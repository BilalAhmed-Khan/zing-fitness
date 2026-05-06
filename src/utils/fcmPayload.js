/**
 * Shared parsing for FCM `data` payloads (foreground onMessage + notification tap).
 * Backend variants: snake_case / camelCase keys, string values, optional nested JSON.
 */

/** Routed explicitly in handlers — not an unknown booking-id fallback. */
export const FCM_EVENT_NOT_UNKNOWN_BOOKING = new Set([
  'chat_messages',
  'session_booked',
  'booking_cancelled',
  'class_booked',
  'booking_completed',
  'booking_started',
]);

function trimStr(v) {
  if (v == null) {
    return '';
  }
  return String(v).trim();
}

function tryParseJsonObject(maybeJson) {
  if (typeof maybeJson !== 'string') {
    return null;
  }
  const s = maybeJson.trim();
  if (!s.startsWith('{') && !s.startsWith('[')) {
    return null;
  }
  try {
    const parsed = JSON.parse(s);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

/** Merge a one-level nested JSON blob (e.g. data.payload = "{...}") into the lookup object. */
function expandedPayload(raw) {
  if (!raw || typeof raw !== 'object') {
    return {};
  }
  let merged = { ...raw };
  for (const key of ['data', 'payload', 'meta', 'body', 'customData']) {
    const parsed = tryParseJsonObject(raw[key]);
    if (parsed && !Array.isArray(parsed)) {
      merged = { ...raw, ...parsed };
      break;
    }
  }
  return merged;
}

/** Merge any JSON-looking string values (common when backends stringify nested FCM data). */
export function getExpandedFcmPayload(raw) {
  if (!raw || typeof raw !== 'object') {
    return {};
  }
  let merged = { ...raw };
  for (const v of Object.values(raw)) {
    const parsed = tryParseJsonObject(v);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      merged = { ...merged, ...parsed };
    }
  }
  return expandedPayload(merged);
}

function firstNonEmptyTrimmed(...values) {
  for (const v of values) {
    const t = trimStr(v);
    if (t) {
      return t;
    }
  }
  return '';
}

export function getFcmPayloadIdentifier(raw) {
  const r = getExpandedFcmPayload(raw);
  if (!r || typeof r !== 'object') {
    return '';
  }
  return firstNonEmptyTrimmed(
    r.identifier,
    r.target_identifier,
    r.TargetIdentifier,
    r.Identifier,
    r.type,
    r.event,
    r.notification_type,
    r.notificationType,
    r.action,
    r.notification_action,
    r.notificationAction,
  );
}

export function getFcmPayloadReferenceId(raw) {
  const r = getExpandedFcmPayload(raw);
  if (!r || typeof r !== 'object') {
    return '';
  }
  return firstNonEmptyTrimmed(
    r.reference_id,
    r.referenceId,
    r.booking_id,
    r.bookingId,
    r.ref_id,
    r.target_id,
    r.targetId,
    r.session_id,
    r.sessionId,
    r.id,
  );
}

function normalizeEventKey(s) {
  return trimStr(s).toLowerCase().replace(/-/g, '_').replace(/\s+/g, '_');
}

export function matchesRealTimeBookingAccepted(identifier) {
  const n = normalizeEventKey(identifier);
  return (
    n === 'real_time_booking_accepted' ||
    n === 'realtimebookingaccepted' ||
    n === 'real_time_booking_accept'
  );
}

/** True for trainer-side real-time booking invite (TraineeAlertModal). */
export function matchesRealTimeBookingInvite(identifier) {
  if (!identifier || matchesRealTimeBookingAccepted(identifier)) {
    return false;
  }
  const n = normalizeEventKey(identifier);
  if (
    n === 'real_time_booking' ||
    n === 'realtimebooking' ||
    n === 'real_time_booking_request'
  ) {
    return true;
  }
  if (n.includes('accept')) {
    return false;
  }
  return n.includes('realtime') && n.includes('book');
}
