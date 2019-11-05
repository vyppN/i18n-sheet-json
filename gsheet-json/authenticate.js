function useServiceAccountAuth(credentials,doc) {
    return new Promise((resolve, reject) => {
        doc.useServiceAccountAuth(credentials, err => {
            if (err) reject(err)
            resolve()
        })
    })
}
module.exports = useServiceAccountAuth