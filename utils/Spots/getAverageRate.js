const getAvrgGrade = reviews => {
    return reviews.map(rev => rev.rate).reduce((a, b) => a + b, 0) / reviews.length
}

export default getAvrgGrade
