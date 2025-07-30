<template>
    <span class="text-with-icons">
        <template v-for="(part, index) in processedParts" :key="index">
            <template v-if="part.type === 'text'">
                {{ part.content }}
            </template>
            <template v-else-if="part.type === 'icon'">
                <span class="keyword-icon translate-y-[0.2rem]" style="display: inline-flex; align-items: center; height: 20px;">
                    <LazyIconComponent
                        :src="part.icon"
                        :alt="part.keyword"
                        iconClass=""
                        :fallbackText="part.keyword"
                        threshold="0.1"
                    />
                    {{ part.keyword }}
                </span>
            </template>
        </template>
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LazyIconComponent from './LazyIconComponent.vue';

interface Props {
    text: string;
    keywordIcons: Array<{
        text: string;
        icon: string;
    }>;
    language: string;
}

const props = defineProps<Props>();

interface TextPart {
    type: 'text' | 'icon';
    content: string;
    keyword?: string;
    icon?: string;
}

const processedParts = computed(() => {
    const parts: TextPart[] = [];
    let currentText = props.text?.replace(/\[.*?\]/g, '').trim() || '';
    
    if (!currentText) {
        return [{ type: 'text', content: '' }];
    }
    
    // Trier les mots-clés par longueur (plus longs en premier) pour éviter les remplacements partiels
    const sortedKeywords = [...props.keywordIcons].sort((a, b) => b.text.length - a.text.length);
    
    let lastIndex = 0;
    
    for (const { text: keyword, icon } of sortedKeywords) {
        let regex: RegExp;
        
        if (['ru', 'jp', 'kr', 'zh'].includes(props.language)) {
            regex = new RegExp(`${keyword}`, 'ui');
        } else {
            regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        }
        
        let match;
        while ((match = regex.exec(currentText)) !== null) {
            // Ajouter le texte avant le match
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: currentText.slice(lastIndex, match.index)
                });
            }
            
            // Ajouter l'icône
            parts.push({
                type: 'icon',
                content: keyword,
                keyword: keyword,
                icon: icon
            });
            
            lastIndex = match.index + match[0].length;
        }
    }
    
    // Ajouter le texte restant
    if (lastIndex < currentText.length) {
        parts.push({
            type: 'text',
            content: currentText.slice(lastIndex)
        });
    }
    
    return parts.length > 0 ? parts : [{ type: 'text', content: currentText }];
});
</script>

<style scoped>
.text-with-icons {
    display: inline;
}

.keyword-icon {
    display: inline-flex;
    align-items: center;
    height: 20px;
}
</style>