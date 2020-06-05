function useServiceAccountAuth(credentials,doc) {
    return new Promise((resolve, reject) => {
        doc.useServiceAccountAuth(credentials)
            .then(resolve)
            .catch(reject)
    })
}
module.exports = useServiceAccountAuth
