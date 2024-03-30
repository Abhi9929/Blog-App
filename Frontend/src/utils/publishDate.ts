export const PublishedDate = (publishedDate: string) => {
    const dateObject = new Date(publishedDate ?? '')
    const inputdate = dateObject.toDateString();
    const formattedDate = new Date(inputdate).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    return formattedDate;
} 