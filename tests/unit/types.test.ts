import { describe, it, expect } from 'vitest';
import type {
    Translation,
    CardLabel,
    TagCorrespondence,
    Civilization,
    TierCorrespondence,
    TranslationDict,
    StoreState,
} from '@/types';

describe('Types', () => {
    describe('Translation', () => {
        it('should have correct structure', () => {
            const translation: Translation = {
                lang: 'en',
                text: 'Description',
            };

            expect(translation).toHaveProperty('lang');
            expect(translation).toHaveProperty('text');
            expect(typeof translation.lang).toBe('string');
            expect(typeof translation.text).toBe('string');
        });
    });

    describe('CardLabel', () => {
        it('should have correct structure', () => {
            const cardLabel: CardLabel = {
                key: 'description',
                translations: [
                    { lang: 'en', text: 'Description' },
                    { lang: 'fr', text: 'Description' },
                ],
            };

            expect(cardLabel).toHaveProperty('key');
            expect(cardLabel).toHaveProperty('translations');
            expect(Array.isArray(cardLabel.translations)).toBe(true);
            expect(cardLabel.translations.length).toBeGreaterThan(0);
        });
    });

    describe('TagCorrespondence', () => {
        it('should have correct structure', () => {
            const tagCorrespondence: TagCorrespondence = {
                id: 1,
                label: [
                    { lang: 'en', text: 'Culture' },
                    { lang: 'fr', text: 'Culture' },
                ],
                checked: false,
                color: 'bg-purple-500',
            };

            expect(tagCorrespondence).toHaveProperty('id');
            expect(tagCorrespondence).toHaveProperty('label');
            expect(tagCorrespondence).toHaveProperty('checked');
            expect(tagCorrespondence).toHaveProperty('color');
            expect(typeof tagCorrespondence.id).toBe('number');
            expect(typeof tagCorrespondence.checked).toBe('boolean');
            expect(typeof tagCorrespondence.color).toBe('string');
        });
    });

    describe('Civilization', () => {
        it('should have correct structure', () => {
            const civilization: Civilization = {
                id: 1,
                name: 'France',
                description: 'A cultural civilization',
                unique_units: ['Musketeer'],
                unique_buildings: ['Chateau'],
                tags_id: [1, 2],
                tier_id: 2,
            };

            expect(civilization).toHaveProperty('id');
            expect(civilization).toHaveProperty('name');
            expect(typeof civilization.id).toBe('number');
            expect(typeof civilization.name).toBe('string');
        });

        it('should allow optional properties', () => {
            const civilization: Civilization = {
                id: 1,
                name: 'France',
            };

            expect(civilization).toHaveProperty('id');
            expect(civilization).toHaveProperty('name');
            expect(civilization.description).toBeUndefined();
        });
    });

    describe('TierCorrespondence', () => {
        it('should have correct structure', () => {
            const tierCorrespondence: TierCorrespondence = {
                id: 1,
                label: [
                    { lang: 'en', text: 'S Tier' },
                    { lang: 'fr', text: 'Niveau S' },
                ],
                checked: false,
                color: 'bg-red-500',
            };

            expect(tierCorrespondence).toHaveProperty('id');
            expect(tierCorrespondence).toHaveProperty('label');
            expect(tierCorrespondence).toHaveProperty('checked');
            expect(tierCorrespondence).toHaveProperty('color');
        });
    });

    describe('TranslationDict', () => {
        it('should have correct structure', () => {
            const translationDict: TranslationDict = {
                description: [
                    { text: 'Description', icon: '📝' },
                    { text: 'Beschreibung', icon: '📝' },
                ],
            };

            expect(typeof translationDict).toBe('object');
            expect(Array.isArray(translationDict['description'])).toBe(true);
            expect(translationDict['description'][0]).toHaveProperty('text');
            expect(translationDict['description'][0]).toHaveProperty('icon');
        });
    });

    describe('StoreState', () => {
        it('should have correct structure', () => {
            const storeState: StoreState = {
                cardLabels: [],
                tagsCorrespondence: [],
                tiersCorrespondence: [],
                translationDict: [],
                lang: 'en',
                cardId: null,
                selectedState: false,
            };

            expect(storeState).toHaveProperty('cardLabels');
            expect(storeState).toHaveProperty('tagsCorrespondence');
            expect(storeState).toHaveProperty('tiersCorrespondence');
            expect(storeState).toHaveProperty('translationDict');
            expect(storeState).toHaveProperty('lang');
            expect(storeState).toHaveProperty('cardId');
            expect(storeState).toHaveProperty('selectedState');
            expect(Array.isArray(storeState.cardLabels)).toBe(true);
            expect(typeof storeState.lang).toBe('string');
            expect(typeof storeState.selectedState).toBe('boolean');
        });
    });
});
