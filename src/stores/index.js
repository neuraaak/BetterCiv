// stores/index.js
import { defineStore } from 'pinia'

export const correspondanceStore = defineStore('correspondanceStore', {
    state: () => ({
        cardLabels: [
            {
                key: "description",
                translations: [
                    { lang: "en", text: "Description" },
                    { lang: "de", text: "Beschreibung" },
                    { lang: "es", text: "Descripción" },
                    { lang: "fr", text: "Description" },
                    { lang: "it", text: "Descrizione" },
                    { lang: "jp", text: "説明" },
                    { lang: "kr", text: "설명" },
                    { lang: "pl", text: "Opis" },
                    { lang: "ru", text: "Описание" },
                    { lang: "zh", text: "描述" }
                ]
            },
            {
                key: "unique_units",
                translations: [
                    { lang: "en", text: "Unique Units" },
                    { lang: "de", text: "Einzigartige Einheiten" },
                    { lang: "es", text: "Unidades únicas" },
                    { lang: "fr", text: "Unités uniques" },
                    { lang: "it", text: "Unità uniche" },
                    { lang: "jp", text: "ユニークユニット" },
                    { lang: "kr", text: "독특한 부대" },
                    { lang: "pl", text: "Unikalne jednostki" },
                    { lang: "ru", text: "Уникальные юниты" },
                    { lang: "zh", text: "独特单位" }
                ]
            },
            {
                key: "unique_buildings",
                translations: [
                    { lang: "en", text: "Unique Buildings" },
                    { lang: "de", text: "Einzigartige Gebäude" },
                    { lang: "es", text: "Edificios únicos" },
                    { lang: "fr", text: "Bâtiments uniques" },
                    { lang: "it", text: "Edifici unici" },
                    { lang: "jp", text: "ユニークビルディング" },
                    { lang: "kr", text: "독특한 건물" },
                    { lang: "pl", text: "Unikalne budynki" },
                    { lang: "ru", text: "Уникальные здания" },
                    { lang: "zh", text: "独特建筑" }
                ]
            }
        ],
        tagsCorrespondance: [
            {
                id: 0,
                lib: [
                    { "lang": "en", "text": "Versatile" },
                    { "lang": "de", "text": "Vielseitig" },
                    { "lang": "es", "text": "Versátil" },
                    { "lang": "fr", "text": "Polyvalent" },
                    { "lang": "it", "text": "Versatile" },
                    { "lang": "jp", "text": "多用途" },
                    { "lang": "kr", "text": "변하기 쉬운" },
                    { "lang": "pl", "text": "Wszechstronny" },
                    { "lang": "ru", "text": "Универсальный" },
                    { "lang": "zh", "text": "多才多艺的" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-blue-900 to-yellow-700 text-stone-100"
            },
            {
                id: 1,
                lib: [
                    { "lang": "en", "text": "Culture" },
                    { "lang": "de", "text": "Kultur" },
                    { "lang": "es", "text": "Cultura" },
                    { "lang": "fr", "text": "Culture" },
                    { "lang": "it", "text": "Cultura" },
                    { "lang": "jp", "text": "文化" },
                    { "lang": "kr", "text": "문화" },
                    { "lang": "pl", "text": "Kultura" },
                    { "lang": "ru", "text": "Культура" },
                    { "lang": "zh", "text": "文化" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-purple-900 to-purple-700 text-purple-200",
            },
            {
                id: 2,
                lib: [
                    { "lang": "en", "text": "Faith" },
                    { "lang": "de", "text": "Glaube" },
                    { "lang": "es", "text": "Fe" },
                    { "lang": "fr", "text": "Foi" },
                    { "lang": "it", "text": "Fede" },
                    { "lang": "jp", "text": "信仰" },
                    { "lang": "kr", "text": "신앙" },
                    { "lang": "pl", "text": "Wiara" },
                    { "lang": "ru", "text": "Вера" },
                    { "lang": "zh", "text": "信仰" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-stone-300 to-stone-200 text-stone-800",
            },
            {
                id: 3,
                lib: [
                    { "lang": "en", "text": "Science" },
                    { "lang": "de", "text": "Wissenschaft" },
                    { "lang": "es", "text": "Ciencia" },
                    { "lang": "fr", "text": "Science" },
                    { "lang": "it", "text": "Scienza" },
                    { "lang": "jp", "text": "科学" },
                    { "lang": "kr", "text": "과학" },
                    { "lang": "pl", "text": "Nauka" },
                    { "lang": "ru", "text": "Наука" },
                    { "lang": "zh", "text": "科学" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-teal-900 to-teal-700 text-teal-200",
            },
            {
                id: 4,
                lib: [
                    { "lang": "en", "text": "Production" },
                    { "lang": "de", "text": "Produktion" },
                    { "lang": "es", "text": "Producción" },
                    { "lang": "fr", "text": "Production" },
                    { "lang": "it", "text": "Produzione" },
                    { "lang": "jp", "text": "生産" },
                    { "lang": "kr", "text": "생산" },
                    { "lang": "pl", "text": "produkcji" },
                    { "lang": "ru", "text": "Производство" },
                    { "lang": "zh", "text": "生产" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-orange-900 to-orange-700 text-orange-200",
            },
            {
                id: 5,
                lib: [
                    { "lang": "en", "text": "Commerce" },
                    { "lang": "de", "text": "Handel" },
                    { "lang": "es", "text": "Comercio" },
                    { "lang": "fr", "text": "Commerce" },
                    { "lang": "it", "text": "Commercio" },
                    { "lang": "jp", "text": "商業" },
                    { "lang": "kr", "text": "상업" },
                    { "lang": "pl", "text": "Handel" },
                    { "lang": "ru", "text": "Торговля" },
                    { "lang": "zh", "text": "商业" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-yellow-900 to-yellow-700 text-yellow-200",
            },
            {
                id: 6,
                lib: [
                    { "lang": "en", "text": "War" },
                    { "lang": "de", "text": "Krieg" },
                    { "lang": "es", "text": "Guerra" },
                    { "lang": "fr", "text": "Guerre" },
                    { "lang": "it", "text": "Guerra" },
                    { "lang": "jp", "text": "戦争" },
                    { "lang": "kr", "text": "전쟁" },
                    { "lang": "pl", "text": "Wojna" },
                    { "lang": "ru", "text": "Война" },
                    { "lang": "zh", "text": "战争" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-red-900 to-red-700 text-red-200"
            },
        ],
        tiersCorrespondance: [
            {
                id: 0,
                lib: [
                    { "lang": "en", "text": "S Tier" },
                    { "lang": "de", "text": "S-Stufe" },
                    { "lang": "es", "text": "Nivel S" },
                    { "lang": "fr", "text": "S Tier" },
                    { "lang": "it", "text": "Livello S" },
                    { "lang": "jp", "text": "Sティア" },
                    { "lang": "kr", "text": "S등급" },
                    { "lang": "pl", "text": "Poziom S" },
                    { "lang": "ru", "text": "Уровень S" },
                    { "lang": "zh", "text": "S级" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-red-900 to-red-700 text-red-200"
            },
            {
                id: 1,
                lib: [
                    { "lang": "en", "text": "A Tier" },
                    { "lang": "de", "text": "A-Stufe" },
                    { "lang": "es", "text": "Nivel A" },
                    { "lang": "fr", "text": "A Tier" },
                    { "lang": "it", "text": "Livello A" },
                    { "lang": "jp", "text": "Aティア" },
                    { "lang": "kr", "text": "A등급" },
                    { "lang": "pl", "text": "Poziom A" },
                    { "lang": "ru", "text": "Уровень A" },
                    { "lang": "zh", "text": "A级" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-yellow-900 to-yellow-700 text-yellow-200"
            },
            {
                id: 2,
                lib: [
                    { "lang": "en", "text": "B Tier" },
                    { "lang": "de", "text": "B-Stufe" },
                    { "lang": "es", "text": "Nivel B" },
                    { "lang": "fr", "text": "B Tier" },
                    { "lang": "it", "text": "Livello B" },
                    { "lang": "jp", "text": "Bティア" },
                    { "lang": "kr", "text": "B등급" },
                    { "lang": "pl", "text": "Poziom B" },
                    { "lang": "ru", "text": "Уровень B" },
                    { "lang": "zh", "text": "B级" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-purple-900 to-purple-700 text-purple-200"
            },
            {
                id: 3,
                lib: [
                    { "lang": "en", "text": "C Tier" },
                    { "lang": "de", "text": "C-Stufe" },
                    { "lang": "es", "text": "Nivel C" },
                    { "lang": "fr", "text": "C Tier" },
                    { "lang": "it", "text": "Livello C" },
                    { "lang": "jp", "text": "Cティア" },
                    { "lang": "kr", "text": "C등급" },
                    { "lang": "pl", "text": "Poziom C" },
                    { "lang": "ru", "text": "Уровень C" },
                    { "lang": "zh", "text": "C级" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-blue-900 to-blue-700 text-blue-200"
            },
            {
                id: 4,
                lib: [
                    { "lang": "en", "text": "D Tier" },
                    { "lang": "de", "text": "D-Stufe" },
                    { "lang": "es", "text": "Nivel D" },
                    { "lang": "fr", "text": "D Tier" },
                    { "lang": "it", "text": "Livello D" },
                    { "lang": "jp", "text": "Dティア" },
                    { "lang": "kr", "text": "D등급" },
                    { "lang": "pl", "text": "Poziom D" },
                    { "lang": "ru", "text": "Уровень D" },
                    { "lang": "zh", "text": "D级" }
                ],
                checked: false,
                color: "bg-gradient-to-r from-teal-900 to-teal-700 text-teal-200"
            },
        ],
        translationDict: [
            {
                en: [
                    { "text": "Culture", "icon": "/icons/20xCulture5.webp" },
                    { "text": "culture", "icon": "/icons/20xCulture5.webp" },
                    { "text": "Faith", "icon": "/icons/20xfaith5.webp" },
                    { "text": "faith", "icon": "/icons/20xfaith5.webp" },
                    { "text": "science", "icon": "/icons/20xScience5.webp" },
                    { "text": "Science", "icon": "/icons/20xScience5.webp" },
                    { "text": "Production", "icon": "/icons/20xProduction5.webp" },
                    { "text": "production", "icon": "/icons/20xProduction5.webp" },
                    { "text": "Gold", "icon": "/icons/20xGold5.webp" },
                    { "text": "gold", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                de: [
                    { "text": "Kultur", "icon": "/icons/20xCulture5.webp" },
                    { "text": "kultur", "icon": "/icons/20xCulture5.webp" },
                    { "text": "Glaube", "icon": "/icons/20xfaith5.webp" },
                    { "text": "glaube", "icon": "/icons/20xfaith5.webp" },
                    { "text": "Wissenschaft", "icon": "/icons/20xScience5.webp" },
                    { "text": "wissenschaft", "icon": "/icons/20xScience5.webp" },
                    { "text": "Produktion", "icon": "/icons/20xProduction5.webp" },
                    { "text": "produktion", "icon": "/icons/20xProduction5.webp" },
                    { "text": "Gold", "icon": "/icons/20xGold5.webp" },
                    { "text": "gold", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                es: [
                    { "text": "Cultura", "icon": "/icons/20xCulture5.webp" },
                    { "text": "cultura", "icon": "/icons/20xScience5.webp" },
                    { "text": "Fe", "icon": "/icons/20xfaith5.webp" },
                    { "text": "fe", "icon": "/icons/20xfaith5.webp" },
                    { "text": "Ciencia", "icon": "/icons/20xCulture5.webp" },
                    { "text": "ciencia", "icon": "/icons/20xScience5.webp" },
                    { "text": "Producción", "icon": "/icons/20xProduction5.webp" },
                    { "text": "producción", "icon": "/icons/20xProduction5.webp" },
                    { "text": "Oro", "icon": "/icons/20xGold5.webp" },
                    { "text": "oro", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                fr: [
                    { "text": "Culture", "icon": "/icons/20xCulture5.webp" },
                    { "text": "culture", "icon": "/icons/20xCulture5.webp" },
                    { "text": "Foi", "icon": "/icons/20xfaith5.webp" },
                    { "text": "foi", "icon": "/icons/20xfaith5.webp" },
                    { "text": "science", "icon": "/icons/20xScience5.webp" },
                    { "text": "Science", "icon": "/icons/20xScience5.webp" },
                    { "text": "Production", "icon": "/icons/20xProduction5.webp" },
                    { "text": "production", "icon": "/icons/20xProduction5.webp" },
                    { "text": "Or", "icon": "/icons/20xGold5.webp" },
                    { "text": "or", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                it: [
                    { "text": "Cultura", "icon": "/icons/20xCulture5.webp" },
                    { "text": "cultura", "icon": "/icons/20xCulture5.webp" },
                    { "text": "Fede", "icon": "/icons/20xfaith5.webp" },
                    { "text": "fede", "icon": "/icons/20xfaith5.webp" },
                    { "text": "Scienza", "icon": "/icons/20xScience5.webp" },
                    { "text": "scienza", "icon": "/icons/20xScience5.webp" },
                    { "text": "Produzione", "icon": "/icons/20xProduction5.webp" },
                    { "text": "produzione", "icon": "/icons/20xProduction5.webp" },
                    { "text": "Oro", "icon": "/icons/20xGold5.webp" },
                    { "text": "oro", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                jp: [
                    // Culture
                    { "text": "文化", "icon": "/icons/20xCulture5.webp" },
                    { "text": "文化力", "icon": "/icons/20xCulture5.webp" },
                    // Foi
                    { "text": "信仰", "icon": "/icons/20xfaith5.webp" },
                    { "text": "信仰心", "icon": "/icons/20xfaith5.webp" },
                    { "text": "信仰力", "icon": "/icons/20xfaith5.webp" },
                    // Science
                    { "text": "科学", "icon": "/icons/20xScience5.webp" },
                    { "text": "科学力", "icon": "/icons/20xScience5.webp" },
                    // Production
                    { "text": "生産", "icon": "/icons/20xProduction5.webp" },
                    { "text": "生産力", "icon": "/icons/20xProduction5.webp" },
                    // Commerce
                    { "text": "ゴールド", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                kr: [
                    // Culture
                    { "text": "문화", "icon": "/icons/20xCulture5.webp" },
                    { "text": "문화가", "icon": "/icons/20xCulture5.webp" },
                    // Foi
                    { "text": "신앙", "icon": "/icons/20xfaith5.webp" },
                    { "text": "신앙이", "icon": "/icons/20xfaith5.webp" },
                    // Science
                    { "text": "과학", "icon": "/icons/20xScience5.webp" },
                    { "text": "과학자", "icon": "/icons/20xScience5.webp" },
                    // Production
                    { "text": "생산력", "icon": "/icons/20xProduction5.webp" },
                    { "text": "생산력 보너스", "icon": "/icons/20xProduction5.webp" },
                    // Commerce
                    { "text": "금", "icon": "/icons/20xGold5.webp" },
                    { "text": "금을", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                pl: [
                    // Culture
                    { "text": "Kultury", "icon": "/icons/20xCulture5.webp" },
                    { "text": "kultury", "icon": "/icons/20xCulture5.webp" },
                    // Foi
                    { "text": "Wiary", "icon": "/icons/20xfaith5.webp" },
                    { "text": "wiary", "icon": "/icons/20xfaith5.webp" },
                    // Science
                    { "text": "Nauki", "icon": "/icons/20xScience5.webp" },
                    { "text": "nauki", "icon": "/icons/20xScience5.webp" },
                    // Production
                    { "text": "Produkcji", "icon": "/icons/20xProduction5.webp" },
                    { "text": "produkcji", "icon": "/icons/20xProduction5.webp" },
                    // Commerce
                    { "text": "Złota", "icon": "/icons/20xGold5.webp" },
                    { "text": "złota", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                ru: [
                    // Culture
                    { "text": "Культуре", "icon": "/icons/20xCulture5.webp" },
                    { "text": "культуре", "icon": "/icons/20xCulture5.webp" },
                    // Foi
                    { "text": "Вере", "icon": "/icons/20xfaith5.webp" },
                    { "text": "вере", "icon": "/icons/20xfaith5.webp" },
                    // Science
                    { "text": "Науке", "icon": "/icons/20xScience5.webp" },
                    { "text": "науке", "icon": "/icons/20xScience5.webp" },
                    // Production
                    { "text": "Производству", "icon": "/icons/20xProduction5.webp" },
                    { "text": "производству", "icon": "/icons/20xProduction5.webp" },
                    // Commerce
                    { "text": "Золото", "icon": "/icons/20xGold5.webp" },
                    { "text": "золото", "icon": "/icons/20xGold5.webp" },
                ]
            },
            {
                zh: [
                    // Culture
                    { "text": "文化", "icon": "/icons/20xCulture5.webp" },
                    { "text": "文化值", "icon": "/icons/20xCulture5.webp" },
                    // Foi
                    { "text": "信仰", "icon": "/icons/20xfaith5.webp" },
                    { "text": "信仰值", "icon": "/icons/20xfaith5.webp" },
                    // Science
                    { "text": "科技", "icon": "/icons/20xScience5.webp" },
                    { "text": "科技值", "icon": "/icons/20xScience5.webp" },
                    // Production
                    { "text": "生產力", "icon": "/icons/20xProduction5.webp" },
                    // Commerce
                    { "text": "金幣", "icon": "/icons/20xGold5.webp" },
                ]
            }
        ],
        lang: 'fr',
        cardId: null,
        selectedState: false,
    }),
    getters: {
        // LISTES
        getTagList: (state) => {
            return state.tagsCorrespondance;
        },
        getTierList: (state) => {
            return state.tiersCorrespondance;
        },
        // GETTER BY ID
        getTagPropertyById: (state) => (tagId, property) => {
            const tag = state.tagsCorrespondance.find(tag => tag.id === tagId);
            if (!tag) return undefined; // Si le tag n'est pas trouvé, retourne undefined

            if (property === 'color') {
                // Si la propriété demandée est 'color', retourne directement la valeur
                return tag.color;
            } else if (property === 'lib') {
                // Si la propriété demandée est 'lib', cherche le texte correspondant à la langue actuelle
                const libObject = tag.lib.find(libItem => libItem.lang === state.lang);
                return libObject ? libObject.text : undefined;
            } else if (property === 'icon') {
                // Si la propriété demandée est 'color', retourne directement la valeur
                return tier.icon;
            } else {
                // Pour toute autre propriété, retourne la valeur telle quelle (ou undefined si non trouvée)
                return tag[property];
            }
        },
        getTierPropertyById: (state) => (tierId, property) => {
            const tier = state.tiersCorrespondance.find(tier => tier.id === tierId);
            if (!tier) return undefined; // Si le tier n'est pas trouvé, retourne undefined

            if (property === 'color') {
                // Si la propriété demandée est 'color', retourne directement la valeur
                return tier.color;
            } else if (property === 'lib') {
                // Si la propriété demandée est 'lib' et que lib est un tableau, cherche le texte correspondant à la langue actuelle
                // Cette vérification est nécessaire si certains tiers n'ont pas encore été convertis en tableau pour 'lib'
                if (Array.isArray(tier.lib)) {
                    const libObject = tier.lib.find(libItem => libItem.lang === state.lang);
                    return libObject ? libObject.text : undefined;
                } else {
                    // Si 'lib' n'est pas un tableau, cela signifie que l'objet tier n'a pas encore été mis à jour
                    // pour supporter le multilinguisme, donc retourne simplement la valeur de 'lib'
                    return tier.lib;
                }
            } else {
                // Pour toute autre propriété, retourne la valeur telle quelle (ou undefined si non trouvée)
                return tier[property];
            }
        },
        getTranslation: (state) => (key) => {
            const item = state.cardLabels.find(translation => translation.key === key);
            const translationObj = item.translations.find(t => t.lang === state.lang);
            return translationObj ? translationObj.text : key; // Retourne le mot-clé par défaut si aucune traduction n'est trouvée
        },
        getIconKeywordsDict: (state) => {
            const dictForCurrentLang = state.translationDict.find(dict => dict[state.lang]);
            return dictForCurrentLang ? dictForCurrentLang[state.lang] : [];
        },
        // LANGUAGE
        getLanguage: (state) => {
            return state.lang;
        },
        // CARD STATE
        getSelectedState(state) {
            return state.selectedState;
        },
        getSelectedCard(state) {
            return state.cardId;
        }
    },
    actions: {
        // LANGUAGE
        setLanguage(newLang) {
            this.lang = newLang;
        },
        // CARD STATE
        setSelectedCard(cardId) {
            this.cardId = cardId;
        },
        setSelectedState() {
            this.selectedState = !this.selectedState;
            // console.log('click on card :', this.cardId, this.selectedState);
        }
    }
});
