declare const _default: import("vue").DefineComponent<{
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the body content
     */
    content: {
        type: StringConstructor;
        default: string;
    };
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearnace of the close/cancel button
     */
    cancelButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
}, {
    close: () => void;
    proceed: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("canceled" | "proceed")[], "canceled" | "proceed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the body content
     */
    content: {
        type: StringConstructor;
        default: string;
    };
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Set the appearnace of the close/cancel button
     */
    cancelButtonAppearance: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onProceed?: ((...args: any[]) => any) | undefined;
    onCanceled?: ((...args: any[]) => any) | undefined;
}, {
    content: string;
    hideTitle: boolean;
    isVisible: boolean;
    actionButtonText: string;
    actionButtonAppearance: string;
    cancelButtonText: string;
    cancelButtonAppearance: string;
}>;
export default _default;
