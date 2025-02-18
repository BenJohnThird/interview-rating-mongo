export const fiveMinutesAgo = (): any => {
    return new Date(Date.now() - 5 * 60 * 1000);
};

export const fifteenMinutesFromNow = (): any =>
    new Date(Date.now() + 15 * 60 * 1000);

export const oneHourFromNow = (): any => new Date(Date.now() + 60 * 60 * 1000);

export const oneYearFromNow = (): any =>
    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export const thirtyDaysFromNow = (): any =>
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
