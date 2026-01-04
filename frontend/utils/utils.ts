
export function formatRMCurrency(value: number | null, isShowRM: boolean) {
    if (!value) {
        return 0;
    }

    if (isShowRM) {
        return new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR" }).format(value);
    }

    return new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR"
    }).format(value).replace('RM', '').trim();
}