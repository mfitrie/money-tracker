
export function formatRMCurrency(value: number | null) {
    if (!value) {
        return 0;
    }
    return new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR" }).format(value);
}