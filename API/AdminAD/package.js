const package_details = require("../../Modals/packageDetails");

class PackageD {
    constructor() {

    }
    async addPackage(body) {
        const {
            package_name,
            min_amount,
            mex_amount
        } = body;
        const pack = new package_details({
            package_type: {
                package_name,
                min_amount,
                mex_amount,
                added_on: new Date(),
            }
        })
        const result = await pack.save()
        return result
    }
}
const package = new PackageD();
module.exports={package}