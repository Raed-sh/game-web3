export const getMaticPrice = async () => {
    let maticPrice = await fetch("https://api.coincap.io/v2/assets")
        .then((response) => response.json())
        .then((response) => response.data.filter((item: any) => item.symbol == "MATIC")[0].priceUsd)
    return maticPrice
}