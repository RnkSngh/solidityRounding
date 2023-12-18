"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.absDifference = exports.convertDecimals = exports.decimalDivBN = exports.decimalMulBN = exports.minBN = exports.maxBN = void 0;
const utils_1 = require("ethers/lib/utils");
/**
 * Returns the larger of two given BigNumbers
 * @param A BigNumber to compare
 * @param B BigNumber to compare
 * @returns The larger of the two given BigNumbers
 */
const maxBN = (A, B) => {
    return A.gt(B) ? A : B;
};
exports.maxBN = maxBN;
/**
 * Returns the smaller of two given BigNumbers
 * @param A BigNumber to compare
 * @param B BigNumber to compare
 * @returns The smaller of the two given BigNumbers
 */
const minBN = (A, B) => {
    return A.lt(B) ? A : B;
};
exports.minBN = minBN;
/**
 *  Multiply Big Numbers, A and B, while maintaining accuracy to a given number of decimals
 * @param A BigNumber to multiply
 * @param B BigNumber to multiply
 * @param aDecimals Decimals for given input A; defaults to 18
 * @param bDecimals Decimals for given input B; defaults to 18
 * @param outDecimals Number of decimals to format the return number in; defaults to 18
 * @return The product, in BigNumber, formatted to the given outDecimals
 */
function decimalMulBN(A, B, aDecimals = 18, bDecimals = 18, outDecimals = 18) {
    let unformattedProduct = A.mul(B);
    if (aDecimals + bDecimals > outDecimals) {
        // Only round if outDecimals is less than A.div(B) decimals
        const roundingPadding = (0, utils_1.parseUnits)(".5", aDecimals + bDecimals - outDecimals);
        unformattedProduct = unformattedProduct.add(roundingPadding); // Add rounding padding to result before dividing to round up if last accurate digit >= 5
    }
    return (0, exports.convertDecimals)(unformattedProduct, aDecimals + bDecimals, outDecimals);
}
exports.decimalMulBN = decimalMulBN;
/**
 *  Divide Big Numbers, A and B, while maintaining accuracy to 18 decimals
 * @param A BigNumber representing the dividend
 * @param B BigNumber representing the divisor
 * @param aDecimals Decimals for given input A; defaults to 18
 * @param bDecimals Decimals for given input B; defaults to 18
 * @param outDecimals Number of decimals to format the return number in; defaults to 18
 * @return The quotient, in BigNumber to outDecimals
 */
function decimalDivBN(A, B, aDecimals = 18, bDecimals = 18, outDecimals = 18) {
    const paddingFactor = outDecimals + bDecimals;
    const decimalPaddedDividend = (0, exports.convertDecimals)(A, aDecimals, paddingFactor); // Pad the dividend so that decimals will return in outDecimals after dividing
    const roundingPadding = B.div(2);
    return decimalPaddedDividend.add(roundingPadding).div(B); // Add rounding padding to result before dividing to round up if last accurate digit >= 5
}
exports.decimalDivBN = decimalDivBN;
// Converts a given bigNumber from fromDecimals to toDecimals
const convertDecimals = (A, fromDecimals, toDecimals) => {
    return fromDecimals > toDecimals
        ? A.div((0, utils_1.parseUnits)("1", fromDecimals - toDecimals))
        : A.mul((0, utils_1.parseUnits)("1", toDecimals - fromDecimals));
};
exports.convertDecimals = convertDecimals;
/**
 * @notice Computes the absolute difference between two BigNumbers
 */
const absDifference = (A, B) => {
    return A.gt(B) ? A.sub(B) : B.sub(A);
};
exports.absDifference = absDifference;
