const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "GBP",
    style: "currency",
})

export function formatCurrency(price: number) {
    return CURRENCY_FORMATTER.format(price)
}