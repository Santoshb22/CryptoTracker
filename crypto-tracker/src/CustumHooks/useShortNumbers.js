
export const useShortNumbers = () => {
    const formatCurrency = (value) => {
        const number = Number(value);

        if(number >= 1e12) return (number / 1e12).toFixed(2) + "T";
        if(number >= 1e9) return (number / 1e9).toFixed(2) + "B";
        if (number >= 1e6) return (number / 1e6).toFixed(2) + "M";
        if (number >= 1e3) return (number / 1e3).toFixed(2) + "K"; 

        return number.toFixed(2);
    }

    return formatCurrency;
}