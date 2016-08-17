export const copy = (value) => {
    $('#copy')
        .val(value)
        .select();

    document.execCommand('copy');
};