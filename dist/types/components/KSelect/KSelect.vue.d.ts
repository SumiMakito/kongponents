import { Ref, PropType } from 'vue';
export interface SelectItem {
    label: string;
    value: string | number;
    key?: string;
    selected?: boolean;
}
export interface SelectFilterFnParams {
    items: SelectItem[];
    query: string;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    kpopAttributes: {
        type: ObjectConstructor;
        default: () => {
            popoverClasses: string;
        };
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    labelAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    /**
     * The width of the select and popover's min-width
     */
    width: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The display style, can be either dropdown, select, or button
     */
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Override the text displayed on the button if `appearance` is `button` after an item
     * has been selected. By default display the selected item's label
     */
    buttonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Items are JSON objects with required 'label' and 'value'
     * {
     *  label: 'Item 1',
     *  value: 'item1'
     * }
     */
    items: {
        type: PropType<SelectItem[]>;
        required: false;
        default: () => never[];
        validator: (items: SelectItem[]) => boolean;
    };
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Override default filter functionality of case-insensitive search on label
     */
    filterFunc: {
        type: FunctionConstructor;
        default: (params: SelectFilterFnParams) => SelectItem[];
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    filterStr: Ref<string>;
    selectedItem: Ref<{
        label: string;
        value: string | number;
        key?: string | undefined;
        selected?: boolean | undefined;
    } | null>;
    selectId: import("vue").ComputedRef<string>;
    selectInputId: import("vue").ComputedRef<string>;
    selectTextId: import("vue").ComputedRef<string>;
    selectItems: Ref<SelectItem[]>;
    boundKPopAttributes: import("vue").ComputedRef<{
        popoverClasses: string;
        width: string;
        disabled: boolean;
        popoverTimeout: number;
        placement: string;
        hideCaret: boolean;
    }>;
    widthValue: import("vue").ComputedRef<string>;
    widthStyle: import("vue").ComputedRef<{
        width: string;
    }>;
    filteredItems: import("vue").ComputedRef<any>;
    placeholderText: import("vue").ComputedRef<string>;
    selectButtonText: import("vue").ComputedRef<string>;
    handleItemSelect: (item: SelectItem) => void;
    clearSelection: () => void;
    triggerFocus: (evt: any, isToggled: Ref<boolean>) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "change" | "update:modelValue" | "selected")[], "input" | "change" | "selected" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    kpopAttributes: {
        type: ObjectConstructor;
        default: () => {
            popoverClasses: string;
        };
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    labelAttributes: {
        type: ObjectConstructor;
        default: () => {};
    };
    /**
     * The width of the select and popover's min-width
     */
    width: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    /**
     * The display style, can be either dropdown, select, or button
     */
    appearance: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Override the text displayed on the button if `appearance` is `button` after an item
     * has been selected. By default display the selected item's label
     */
    buttonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Items are JSON objects with required 'label' and 'value'
     * {
     *  label: 'Item 1',
     *  value: 'item1'
     * }
     */
    items: {
        type: PropType<SelectItem[]>;
        required: false;
        default: () => never[];
        validator: (items: SelectItem[]) => boolean;
    };
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Override default filter functionality of case-insensitive search on label
     */
    filterFunc: {
        type: FunctionConstructor;
        default: (params: SelectFilterFnParams) => SelectItem[];
    };
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSelected?: ((...args: any[]) => any) | undefined;
}, {
    width: string;
    appearance: string;
    label: string;
    placeholder: string;
    testMode: boolean;
    items: SelectItem[];
    buttonText: string;
    positionFixed: boolean;
    modelValue: string | number;
    labelAttributes: Record<string, any>;
    kpopAttributes: Record<string, any>;
    filterFunc: Function;
}>;
export default _default;
