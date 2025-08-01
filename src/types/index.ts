// Types for translations
export interface Translation {
    lang: string;
    text: string;
}

// Types for card labels
export interface CardLabel {
    key: string;
    translations: Translation[];
}

// Types for tag correspondence
export interface TagCorrespondence {
    id: number;
    label: Translation[];
    checked: boolean;
    color: string;
}

// Types for civilization data
export interface Civilization {
    id: number;
    name: string;
    description?: string;
    unique_units?: string[];
    unique_buildings?: string[];
    tags_id?: number[];
    tier_id?: number;
}

// Types for tier correspondence
export interface TierCorrespondence {
    id: number;
    label: Translation[];
    checked: boolean;
    color: string;
}

// Types for translation dictionary
export interface TranslationDict {
    [key: string]: Array<{
        text: string;
        icon: string;
    }>;
}

// Types for store state
export interface StoreState {
    cardLabels: CardLabel[];
    tagsCorrespondence: TagCorrespondence[];
    tiersCorrespondence: TierCorrespondence[];
    translationDict: TranslationDict[];
    lang: string;
    cardId: number | null;
    selectedState: boolean;
}
