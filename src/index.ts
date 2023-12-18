import { BigNumber, BigNumberish } from "ethers";
import { parseUnits } from "ethers/lib/utils";

/**
 * Returns the larger of two given BigNumbers
 * @param A BigNumber to compare
 * @param B BigNumber to compare
 * @returns The larger of the two given BigNumbers
 */
export const maxBN = (A: BigNumber, B: BigNumber) => {
  return A.gt(B) ? A : B;
};

/**
 * Returns the smaller of two given BigNumbers
 * @param A BigNumber to compare
 * @param B BigNumber to compare
 * @returns The smaller of the two given BigNumbers
 */
export const minBN = (A: BigNumber, B: BigNumber) => {
  return A.lt(B) ? A : B;
};

/**
 *  Multiply Big Numbers, A and B, while maintaining accuracy to a given number of decimals
 * @param A BigNumber to multiply
 * @param B BigNumber to multiply
 * @param aDecimals Decimals for given input A; defaults to 18
 * @param bDecimals Decimals for given input B; defaults to 18
 * @param outDecimals Number of decimals to format the return number in; defaults to 18
 * @return The product, in BigNumber, formatted to the given outDecimals
 */
export function decimalMulBN(
  A: BigNumber,
  B: BigNumber,
  aDecimals = 18,
  bDecimals = 18,
  outDecimals = 18
) {
  let unformattedProduct = A.mul(B);
  if (aDecimals + bDecimals > outDecimals) {
    // Only round if outDecimals is less than A.div(B) decimals
    const roundingPadding = parseUnits(
      ".5",
      aDecimals + bDecimals - outDecimals
    ) as BigNumber;
    unformattedProduct = unformattedProduct.add(roundingPadding); // Add rounding padding to result before dividing to round up if last accurate digit >= 5
  }

  return convertDecimals(
    unformattedProduct,
    aDecimals + bDecimals,
    outDecimals
  );
}

/**
 *  Divide Big Numbers, A and B, while maintaining accuracy to 18 decimals
 * @param A BigNumber representing the dividend
 * @param B BigNumber representing the divisor
 * @param aDecimals Decimals for given input A; defaults to 18
 * @param bDecimals Decimals for given input B; defaults to 18
 * @param outDecimals Number of decimals to format the return number in; defaults to 18
 * @return The quotient, in BigNumber to outDecimals
 */
export function decimalDivBN(
  A: BigNumber,
  B: BigNumber,
  aDecimals = 18,
  bDecimals = 18,
  outDecimals = 18
): BigNumber {
  const paddingFactor = outDecimals + bDecimals;
  const decimalPaddedDividend = convertDecimals(A, aDecimals, paddingFactor); // Pad the dividend so that decimals will return in outDecimals after dividing
  const roundingPadding = B.div(2);
  return decimalPaddedDividend.add(roundingPadding).div(B); // Add rounding padding to result before dividing to round up if last accurate digit >= 5
}

// Converts a given bigNumber from fromDecimals to toDecimals
export const convertDecimals = (
  A: BigNumber,
  fromDecimals: number,
  toDecimals: number
) => {
  return fromDecimals > toDecimals
    ? A.div(parseUnits("1", fromDecimals - toDecimals) as BigNumber)
    : A.mul(parseUnits("1", toDecimals - fromDecimals) as BigNumber);
};

/**
 * @notice Computes the absolute difference between two BigNumbers
 */
export const absDifference = (A: BigNumber, B: BigNumber) => {
  return A.gt(B) ? A.sub(B) : B.sub(A);
};
