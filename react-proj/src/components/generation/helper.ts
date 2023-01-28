import tailwindStyles from '../../styling/tailwind-styles.module.scss';

export const style = (...names: string[]): string => {
    return names.reduce((full, name) => `${full} ${tailwindStyles[`${name}`]}`, '');
}
