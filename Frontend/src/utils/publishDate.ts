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

export const extractFirst15Words = (content: string) => {
    const words = content.split(/\s+/);
    
    const first15Words = words.slice(0, 15).join(" ");
    
    return first15Words;
}
