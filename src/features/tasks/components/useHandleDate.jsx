export function useHandleDate(setFormData) {
    // Function to format date to 'YYYY-MM-DD HH:mm:ss'
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    // Function to handle date updates and format them
    const handleDate = (dateType) => {
        const newDate = formatDate(new Date());
        setFormData((prevData) => ({
            ...prevData,
            [dateType]: newDate,
        }));
    };

    return { handleDate };
}