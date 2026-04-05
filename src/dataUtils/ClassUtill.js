class ClassUtill {
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

  maxParticipants = user => user?.maxParticipants ?? 0;

  availableDateTime = user => user?.availableDateTime.map(val => val.day) ?? [];
}

export default new ClassUtill();
