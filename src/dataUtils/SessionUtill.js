class SessionUtill {
  id = user => user?.id ?? '';

  userId = user => user?.userId ?? '';

  title = user => user?.title?.trim() ?? '';

  description = user => user?.description?.trim() ?? '';

  price = user => user?.price ?? 0;

  phone = user => user?.phone ?? '';

  firstImage = user => user?.images[0] ?? '';

  images = user => user?.images ?? [];

  startTime = user => user?.availableDateTime?.[0].startTime ?? '';

  startTimeFull = user => user?.startTimeFull ?? '';

  endTime = user => user?.availableDateTime?.[0].endTime ?? '';

  endTimeFull = user => user?.endTimeFull ?? '';

  gender = user => (user.gender === 'MALE' ? 'Male' : 'Female' ?? '');

  address = user => user?.address ?? '';

  location = user => user?.location?.cordinates ?? [];

  timeZone = user => user?.timeZone ?? '';

  duration = user => user?.duration ?? 0;

  breakTime = user => user?.breakTime ?? 0;

  amount = user => user?.amount ?? 0;

  coverageMiles = user => user?.coverageMiles ?? 0;

  availableDateTime = user =>
    user?.availableDateTime?.map(val => val.day) ?? [];

  /**
   * API sometimes returns empty `slots` on the root `availableDateTime` while
   * the same day has slots under `trainer.session.availableDateTime`.
   */
  mergeAvailableDateTimeSlots = session => {
    if (!session) return session;
    const root = session.availableDateTime;
    const nested = session.trainer?.session?.availableDateTime;
    if (!Array.isArray(root) || !Array.isArray(nested) || nested.length === 0) {
      return session;
    }
    const merged = root.map(entry => {
      const hasRootSlots = Array.isArray(entry.slots) && entry.slots.length > 0;
      if (hasRootSlots) {
        return entry;
      }
      const match = nested.find(n => n.day === entry.day);
      const fill = match?.slots;
      if (Array.isArray(fill) && fill.length > 0) {
        return { ...entry, slots: fill };
      }
      return entry;
    });
    return { ...session, availableDateTime: merged };
  };
}

export default new SessionUtill();
