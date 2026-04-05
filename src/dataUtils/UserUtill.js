class UserUtill {
  id = user => user?.id ?? '';

  email = user => user?.emailAddress?.trim() ?? '';

  age = user => user?.age ?? '';

  phone = user => user?.phone ?? '';

  name = user => user?.fullName ?? '';

  fullNameLowerCase = user =>
    user?.fullNameLowerCase?.trim()?.replace(' ', '') ??
    user?.fullNameLowerCase?.trim();

  image = user => user?.image ?? '';

  dob = user => user?.dob ?? '';

  gender = user => (user.gander === 'MALE' ? 'MALE' : 'FEMALE');

  userType = user => user?.userType ?? '';

  yearsOfExperience = user => user?.yearsOfExperience ?? 0;

  isOnline = user => user?.isOnline ?? false;

  isSocialLogin = user => user?.is_social_login ?? false;

  firstName = user => user?.firstName ?? '';

  lastName = user => user?.lastName ?? '';

  timeZone = user => user?.timeZone ?? '';

  gameScore = user => user?.game_score ?? 0;

  isWinner = user => user?.isWinner ?? false;

  favouritePlayer = user => user?.favourite_player ?? '';

  total_matches = user => user?.total_matches ?? '0';

  matches_won = user => user?.matches_won ?? '0';

  player = user => user?.player ?? '';

  isSameLogin = (loginUserid, userid) => userid === loginUserid ?? false;

  is_already_homie = user => user?.is_already_homie ?? false;

  phoneCode = user => user?.phoneCode ?? 'US';

  address = user => user?.address ?? '';

  location = user => user?.location?.cordinates ?? [];

  lat = user => user?.location?.cordinates?.[1] ?? -1;

  long = user => user?.location?.cordinates?.[0] ?? -1;

  serviceArealat = user => user?.serviceArea?.cordinates?.[1] ?? -1;

  serviceArealong = user => user?.serviceArea?.cordinates?.[0] ?? -1;

  coverageMiles = user => user?.coverageMiles ?? 0;

  isFeatured = user => user?.isFeatured ?? false;

  weight = user => user?.weight ?? '0';

  weightUnit = user => user?.weightUnit ?? '';

  height = user => (user.height ? parseFloat(user?.height).toFixed(1) : '0.0');

  heightUnit = user => user?.heightUnit ?? 'ft';

  commonHealthProblem = user => user?.commonHealthProblem ?? '';

  cropImage = user => user?.cropImage ?? '';

  rating = user => parseFloat(user?.rating ?? 0).toFixed(0);
}

export default new UserUtill();
