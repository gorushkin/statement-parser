type ClassNames = (false | string | true)[];

export const cn = (...classnames: ClassNames) => classnames.filter((item) => !!item).join(' ');
