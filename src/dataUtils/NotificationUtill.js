class NotificationUtill {
  id = notification => notification?.id ?? '';

  title = notification => notification?.title?.trim() ?? '';

  body = notification => notification?.body?.trim() ?? '';

  acceptMessage = notification => notification?.acceptMessage?.trim() ?? '';

  declineMessage = notification => notification?.declineMessage?.trim() ?? '';

  identifier = notification => notification?.identifier ?? '';

  filterType = notification => notification?.filterType ?? '';

  getuser = notification => notification?.user ?? '';

  secondPerson = notification => notification?.secondPerson ?? '';

  status = notification => notification?.status ?? 'NONE';

  organization = notification => notification?.organization ?? '';

  party = notification => notification?.party ?? '';

  vendor = notification => notification?.vendor ?? '';

  createdAt = notification => notification?.createdAt;

  isPerformed = notification => notification?.isPerformed ?? undefined;

  isCancelled = notification => notification?.isCancelled ?? false;
}

export default new NotificationUtill();
