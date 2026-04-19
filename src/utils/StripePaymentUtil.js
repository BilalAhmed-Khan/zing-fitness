/**
 * Picks the object that actually contains Stripe fields from a typical API envelope.
 * Supports `{ data: { paymentIntent } }` and `{ paymentIntent }` at the top level.
 */
export function unwrapBookingPaymentResponse(response) {
  if (response == null || typeof response !== 'object') {
    return response;
  }
  const inner = response.data;
  const innerHasStripe =
    inner &&
    typeof inner === 'object' &&
    !Array.isArray(inner) &&
    (inner.paymentIntent ??
      inner.payment_intent ??
      inner.clientSecret ??
      inner.client_secret ??
      inner.ephemeralKey ??
      inner.ephemeral_key);

  if (innerHasStripe) {
    return inner;
  }

  const topHasStripe =
    response.paymentIntent ??
    response.payment_intent ??
    response.clientSecret ??
    response.client_secret ??
    response.ephemeralKey ??
    response.ephemeral_key;

  if (topHasStripe) {
    return response;
  }

  if (inner !== undefined && inner !== null) {
    return inner;
  }

  return response;
}

/**
 * Normalizes booking / payment-intent API payloads for Stripe Payment Sheet.
 * Handles nested `data`, snake_case, and customer as string or `{ id }`.
 */
export function normalizeStripeBookingPayment(raw) {
  if (raw == null) {
    return {
      clientSecret: undefined,
      customerId: undefined,
      ephemeralSecret: undefined,
      paymentIntent: undefined,
    };
  }

  const tryFrom = container => {
    if (!container || typeof container !== 'object') {
      return {
        clientSecret: undefined,
        customerId: undefined,
        ephemeralSecret: undefined,
        paymentIntent: undefined,
      };
    }
    const pi =
      container.paymentIntent ??
      container.payment_intent ??
      container.paymentIntentData;
    const ek =
      container.ephemeralKey ??
      container.ephemeral_key ??
      container.ephemeralSecret;

    const clientSecret =
      pi?.client_secret ??
      pi?.clientSecret ??
      container.clientSecret ??
      container.client_secret;

    const customerRaw = pi?.customer ?? container.customer;
    const customerId =
      typeof customerRaw === 'string'
        ? customerRaw
        : customerRaw?.id ?? undefined;

    const ephemeralSecret =
      typeof ek === 'string' ? ek : ek?.secret ?? container.ephemeralKeySecret;

    return {
      clientSecret,
      customerId,
      ephemeralSecret,
      paymentIntent: pi,
    };
  };

  let out = tryFrom(raw);
  if (!out.clientSecret && raw.data != null) {
    out = tryFrom(raw.data);
  }
  return out;
}
