import { BigNumber } from "@ethersproject/bignumber";
/**
 * Returns the larger of two given BigNumbers
 * @param A BigNumber to compare
 * @param B BigNumber to compare
 * @returns The larger of the two given BigNumbers
 */
export declare const maxBN: (A: BigNumber, B: BigNumber) => BigNumber;
/**
 * Returns the smaller of two given BigNumbers
 * @param A BigNumber to compare
 * @param B BigNumber to compare
 * @returns The smaller of the two given BigNumbers
 */
export declare const minBN: (A: BigNumber, B: BigNumber) => BigNumber;
/**
 *  Multiply Big Numbers, A and B, while maintaining accuracy to a given number of decimals
 * @param A BigNumber to multiply
 * @param B BigNumber to multiply
 * @param aDecimals Decimals for given input A; defaults to 18
 * @param bDecimals Decimals for given input B; defaults to 18
 * @param outDecimals Number of decimals to format the return number in; defaults to 18
 * @return The product, in BigNumber, formatted to the given outDecimals
 */
export declare function decimalMulBN(A: BigNumber, B: BigNumber, aDecimals?: number, bDecimals?: number, outDecimals?: number): BigNumber;
/**
 *  Divide Big Numbers, A and B, while maintaining accuracy to 18 decimals
 * @param A BigNumber representing the dividend
 * @param B BigNumber representing the divisor
 * @param aDecimals Decimals for given input A; defaults to 18
 * @param bDecimals Decimals for given input B; defaults to 18
 * @param outDecimals Number of decimals to format the return number in; defaults to 18
 * @return The quotient, in BigNumber to outDecimals
 */
export declare function decimalDivBN(A: BigNumber, B: BigNumber, aDecimals?: number, bDecimals?: number, outDecimals?: number): BigNumber;
export declare const convertDecimals: (A: BigNumber, fromDecimals: number, toDecimals: number) => BigNumber;
/**
 * @notice Computes the absolute difference between two BigNumbers
 */
export declare const absDifference: (A: BigNumber, B: BigNumber) => BigNumber;
