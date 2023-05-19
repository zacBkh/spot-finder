const getAvrgGrade = reviews => {
    const returnedGrade =
        reviews.map(rev => rev.rate).reduce((a, b) => a + b, 0) / reviews.length
    return isNaN(returnedGrade) ? null : returnedGrade.toFixed(2)
}

export default getAvrgGrade
