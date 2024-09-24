export enum BuiltInTheme {
    electric = 'electric',
    loveship = 'loveship',
    loveship_dark = 'loveship_dark',
    promo = 'promo',
    vanilla_thunder = 'vanilla_thunder'
}

/* No restrictions on custom theme id - it can be any string */
type CustomTheme = string;

export type ThemeId = BuiltInTheme | CustomTheme;

export interface ThemeBaseParams {
    id: ThemeId;
    name: string;
}

export const builtInThemes: ThemeBaseParams[] = [
    { id: BuiltInTheme.electric, name: 'Electric' },
    { id: BuiltInTheme.loveship, name: 'Loveship Light' },
    { id: BuiltInTheme.loveship_dark, name: 'Loveship Dark' },
    { id: BuiltInTheme.vanilla_thunder, name: 'Vanilla Thunder' },
    { id: BuiltInTheme.promo, name: 'Promo' },
];
