const mongoose = require('mongoose')
// const validator = require('validator')


const planSchema = new mongoose.Schema({
    package_type: {
        package_name: {
            type: String,
            default: "Starter"
        },
        min_amount: {
            type: Number,
            default: 0
        },
        mex_amount: {
            type: Number,
            default: 1e18
        },
        status: {
            type: Number,
            default: 1
        },
        added_on: {
            type: String,
            default: new Date()
        },
        updated_on: {
            type: String,
            default: null
        }
    },
    level_income: {
        income_type: {
            options: {
                type: String,
                default: "percentage,fix"
            },
            value: {
                type: String,
                default: "percentage"
            }
        },
        level_1: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 10
            }
        },
        level_2: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 9
            }
        },
        level_3: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 8
            }
        },
        level_4: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 7
            }
        },
        level_5: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 6
            }
        },
        level_6: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 5
            }
        },
        level_7: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 4
            }
        },
        level_8: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 3
            }
        },
        level_9: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 2
            }
        },
        level_10: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 1
            }
        },
        level_11: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_12: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_13: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_14: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_15: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_16: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_17: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_18: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_10: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
        level_20: {
            direct_required: {
                type: Number,
                default: 0
            },
            value: {
                type: Number,
                default: 0
            }
        },
    },
    roi_level_income: {
        status: {
            type: Number,
            default: 0
        },
        level_1: {
            type: Number,
            default: 0
        },
        level_2: {
            type: Number,
            default: 0
        },
        level_3: {
            type: Number,
            default: 0
        },
        level_4: {
            type: Number,
            default: 0
        },
        level_5: {
            type: Number,
            default: 0
        },
        level_6: {
            type: Number,
            default: 0
        },
        level_7: {
            type: Number,
            default: 0
        },
        level_8: {
            type: Number,
            default: 0
        },
        level_9: {
            type: Number,
            default: 0
        },
        level_10: {
            type: Number,
            default: 0
        },
        level_11: {
            type: Number,
            default: 0
        },
        level_12: {
            type: Number,
            default: 0
        },
        level_13: {
            type: Number,
            default: 0
        },
        level_14: {
            type: Number,
            default: 0
        },
        level_15: {
            type: Number,
            default: 0
        },
        level_16: {
            type: Number,
            default: 0
        },
        level_17: {
            type: Number,
            default: 0
        },
        level_18: {
            type: Number,
            default: 0
        },
        level_19: {
            type: Number,
            default: 0
        },
        level_20: {
            type: Number,
            default: 0
        },
    },
    roi_income: {
        value: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            default: 0
        }
    }
})
const plan = new mongoose.model('plan', planSchema)
module.exports = plan