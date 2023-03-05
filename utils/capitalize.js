// Lowercase everything and apply capitalization on first letter of each words

const capitalize = string => {
    if (!string) {
        return
    } else {
        return string
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ')
    }
}

export default capitalize
