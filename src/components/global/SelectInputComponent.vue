<template>
    <div
        class="multiple-select relative bg-zinc-800 text-stone-100 flex flex-row flex-wrap gap-2 rounded-lg p-2"
    >
        <label v-for="opt in options" :key="opt.id" class="checkbox">
            <input
                type="checkbox"
                name="checkbox"
                :checked="opt.checked"
                @change="handleCheckboxChange(opt)"
            />
            <span
                class="name flex rounded-md text-sm px-2 py-1"
                :class="[opt.checked ? opt.color : '']"
                >{{ getOptionProperty(opt.id, 'label') }}</span
            >
        </label>
    </div>
</template>

<script setup>
    /**
     * Select Input Component - Multi-select dropdown for tags and tiers
     * Uses translation store to display localized option labels
     */
    // IMPORT
    // ##############
    import { translationStore } from '../../stores/index';

    // VARIABLES
    // ##############
    const props = defineProps({
        options: {
            type: Array,
            required: true,
        },
        getPropertyFunc: {
            type: String,
            required: true,
        },
        multiple: {
            type: Boolean,
            default: true,
        },
    });

    const store = translationStore();

    const emit = defineEmits(['update:selectedOptions']);

    // FUNCTIONS
    // ##############
    function handleCheckboxChange(option) {
        option.checked = !option.checked;
        updateSelectedOptions();
    }

    function updateSelectedOptions() {
        const selectedOptions = props.options.filter(opt => opt.checked);
        emit('update:selectedOptions', selectedOptions);
    }

    function getOptionProperty(optionId, property) {
        return store[props.getPropertyFunc](optionId, property);
    }
</script>

<style scoped>
    .multiple-select {
        box-sizing: border-box;
        box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    }

    .multiple-select .checkbox {
        flex: 1 1 auto;
        text-align: center;
    }

    .multiple-select .checkbox input {
        display: none;
    }

    .multiple-select .checkbox .name {
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border: none;
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Chrome and Opera */
    }

    .multiple-select .checkbox input:checked + .name {
        --tw-bg-opacity: 1;
        background-color: rgb(63 63 70 / var(--tw-bg-opacity));
        font-weight: 600;
    }
</style>
../../stores/index
