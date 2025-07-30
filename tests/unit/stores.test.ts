import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { translationStore } from '@/stores';

describe('Translation Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('State', () => {
        it('should have initial state', () => {
            const store = translationStore();

            expect(store.cardLabels).toBeDefined();
            expect(store.tagsCorrespondence).toBeDefined();
            expect(store.tiersCorrespondence).toBeDefined();
            expect(store.translationDict).toBeDefined();
            expect(store.lang).toBe('fr');
            expect(store.cardId).toBeNull();
            expect(store.selectedState).toBe(false);
        });

        it('should have card labels with translations', () => {
            const store = translationStore();

            expect(store.cardLabels.length).toBeGreaterThan(0);
            expect(store.cardLabels[0]).toHaveProperty('key');
            expect(store.cardLabels[0]).toHaveProperty('translations');
            expect(Array.isArray(store.cardLabels[0].translations)).toBe(true);
        });

        it('should have tags correspondence', () => {
            const store = translationStore();

            expect(store.tagsCorrespondence.length).toBeGreaterThan(0);
            expect(store.tagsCorrespondence[0]).toHaveProperty('id');
            expect(store.tagsCorrespondence[0]).toHaveProperty('label');
            expect(store.tagsCorrespondence[0]).toHaveProperty('checked');
            expect(store.tagsCorrespondence[0]).toHaveProperty('color');
        });

        it('should have tiers correspondence', () => {
            const store = translationStore();

            expect(store.tiersCorrespondence.length).toBeGreaterThan(0);
            expect(store.tiersCorrespondence[0]).toHaveProperty('id');
            expect(store.tiersCorrespondence[0]).toHaveProperty('label');
            expect(store.tiersCorrespondence[0]).toHaveProperty('checked');
            expect(store.tiersCorrespondence[0]).toHaveProperty('color');
        });
    });

    describe('Getters', () => {
        describe('getTagList', () => {
            it('should return tags correspondence list', () => {
                const store = translationStore();
                const tagList = store.getTagList;

                expect(Array.isArray(tagList)).toBe(true);
                expect(tagList).toBe(store.tagsCorrespondence);
            });
        });

        describe('getTierList', () => {
            it('should return tiers correspondence list', () => {
                const store = translationStore();
                const tierList = store.getTierList;

                expect(Array.isArray(tierList)).toBe(true);
                expect(tierList).toBe(store.tiersCorrespondence);
            });
        });

        describe('getTagPropertyById', () => {
            it('should return tag color by id', () => {
                const store = translationStore();
                const firstTag = store.tagsCorrespondence[0];
                const color = store.getTagPropertyById(firstTag.id, 'color');

                expect(color).toBe(firstTag.color);
            });

            it('should return tag label by id in current language', () => {
                const store = translationStore();
                const firstTag = store.tagsCorrespondence[0];
                const label = store.getTagPropertyById(firstTag.id, 'label');
                const expectedLabel = firstTag.label.find(l => l.lang === store.lang);

                expect(label).toBe(expectedLabel?.text);
            });

            it('should return undefined for non-existent tag', () => {
                const store = translationStore();
                const result = store.getTagPropertyById(999, 'color');

                expect(result).toBeUndefined();
            });
        });

        describe('getTierPropertyById', () => {
            it('should return tier color by id', () => {
                const store = translationStore();
                const firstTier = store.tiersCorrespondence[0];
                const color = store.getTierPropertyById(firstTier.id, 'color');

                expect(color).toBe(firstTier.color);
            });

            it('should return tier label by id in current language', () => {
                const store = translationStore();
                const firstTier = store.tiersCorrespondence[0];
                const label = store.getTierPropertyById(firstTier.id, 'label');
                const expectedLabel = firstTier.label.find(l => l.lang === store.lang);

                expect(label).toBe(expectedLabel?.text);
            });

            it('should return undefined for non-existent tier', () => {
                const store = translationStore();
                const result = store.getTierPropertyById(999, 'color');

                expect(result).toBeUndefined();
            });
        });

        describe('getTranslation', () => {
            it('should return translation for existing key', () => {
                const store = translationStore();
                const translation = store.getTranslation('description');
                const expectedTranslation = store.cardLabels
                    .find(cl => cl.key === 'description')
                    ?.translations.find(t => t.lang === store.lang);

                expect(translation).toBe(expectedTranslation?.text);
            });

            it('should return key if translation not found', () => {
                const store = translationStore();
                const translation = store.getTranslation('non-existent-key');

                expect(translation).toBe('non-existent-key');
            });
        });

        describe('getIconKeywordsDict', () => {
            it('should return icon keywords for current language', () => {
                const store = translationStore();
                const iconDict = store.getIconKeywordsDict;

                expect(Array.isArray(iconDict)).toBe(true);
            });
        });

        describe('getLanguage', () => {
            it('should return current language', () => {
                const store = translationStore();
                const language = store.getLanguage;

                expect(language).toBe(store.lang);
            });
        });

        describe('getSelectedState', () => {
            it('should return selected state', () => {
                const store = translationStore();
                const selectedState = store.getSelectedState;

                expect(selectedState).toBe(store.selectedState);
            });
        });

        describe('getSelectedCard', () => {
            it('should return selected card id', () => {
                const store = translationStore();
                const selectedCard = store.getSelectedCard;

                expect(selectedCard).toBe(store.cardId);
            });
        });
    });

    describe('Actions', () => {
        describe('setLanguage', () => {
            it('should change language', () => {
                const store = translationStore();
                const newLang = 'en';

                store.setLanguage(newLang);

                expect(store.lang).toBe(newLang);
            });
        });

        describe('setSelectedCard', () => {
            it('should set selected card id', () => {
                const store = translationStore();
                const cardId = 123;

                store.setSelectedCard(cardId);

                expect(store.cardId).toBe(cardId);
            });
        });

        describe('setSelectedState', () => {
            it('should toggle selected state', () => {
                const store = translationStore();
                const initialState = store.selectedState;

                store.setSelectedState();

                expect(store.selectedState).toBe(!initialState);
            });

            it('should toggle selected state multiple times', () => {
                const store = translationStore();

                store.setSelectedState();
                expect(store.selectedState).toBe(true);

                store.setSelectedState();
                expect(store.selectedState).toBe(false);

                store.setSelectedState();
                expect(store.selectedState).toBe(true);
            });
        });
    });
});
