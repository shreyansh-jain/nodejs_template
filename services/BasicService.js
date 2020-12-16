module.exports = {
    // Check Null, Undefined and Empty String 
    check_string: async function (value) {
        return new Promise((resolve, reject) => {
            try {
                if (value != undefined && value != null && value != "") {
                    resolve(value)
                } else {
                    resolve("")
                }
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Check Null, Undefined and 0
    check_int: async function (value) {
        return new Promise((resolve, reject) => {
            try {
                if (value != undefined && value != null && value != "") {
                    resolve(value)
                } else {
                    resolve(0)
                }
            }
            catch (e) {
                reject(e)
            }
        })
    },
    // Check Null, Undefined and false
    check_bool: async function (value) {
        return new Promise((resolve, reject) => {
            try {
                if (value != undefined && value != null && value != "") {
                    resolve(value)
                } else {
                    resolve(false)
                }
            }
            catch (e) {
                reject(e)
            }
        })
    }
}