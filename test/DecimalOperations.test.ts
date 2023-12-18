import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { BigNumber } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { decimalDivBN, decimalMulBN } from "../src/";
chai.use(solidity);

const ONE_18 = parseEther("1") as BigNumber; // 1 in 18 decimals
const THREE_18 = ONE_18.mul(3) as BigNumber; // 3 in 18 decimals
const ONE_THIRD_18 = ONE_18.div(3) as BigNumber; // 1/3 in 18 decimals
const ONE_SIXTH_18 = ONE_18.div(6) as BigNumber; //  1/6 in 18 decimals

const ONE_6 = parseUnits("1", 6) as BigNumber; // 1 in 6 decimals
const THREE_6 = ONE_6.mul(3) as BigNumber; // 3 in 6 decimals
const ONE_THIRD_6 = ONE_6.div(3) as BigNumber; //  1/3 in 6 decimals
const ONE_SIXTH_6 = ONE_6.div(6) as BigNumber; //  1/6 in 6 decimals

describe("Test BigNumber decimal multiplication ", () => {
  describe("Should be able to multiply 6 decimal * 6 decimals and output to 18 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalMulBN(ONE_6, ONE_THIRD_6, 6, 6, 18)).to.equal(
        "333333000000000000"
      );
    });

    it("Rounding up", async () => {
      expect(decimalMulBN(ONE_SIXTH_6, ONE_SIXTH_6, 6, 6, 18)).to.equal(
        BigNumber.from("27777555556000000")
      );
    });
  });

  describe("Should be able to multiply 6 decimal * 18 decimals and output to 18 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalMulBN(ONE_6, ONE_THIRD_18, 6, 18, 18)).to.equal(
        ONE_THIRD_18
      );
    });

    it("Rounding up", async () => {
      // Decimal can only be accurate to 6 digits since that's the minimum
      expect(decimalMulBN(ONE_SIXTH_6, ONE_SIXTH_18, 6, 18, 18)).to.equal(
        BigNumber.from("27777666666666667")
      );
    });
  });

  describe("Should be able to multiply 6 decimal * 18 decimals and output to 6 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalMulBN(ONE_6, ONE_THIRD_18, 6, 18, 6)).to.equal(ONE_THIRD_6);
    });

    it("Rounding up", async () => {
      expect(decimalMulBN(ONE_SIXTH_6, ONE_SIXTH_18, 6, 18, 6)).to.equal(
        ONE_SIXTH_6.div(6).add(1)
      );
    });
  });

  describe("Should be able to multiply 18 decimal * 18 decimals and output to 18 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalMulBN(ONE_18, ONE_THIRD_18, 18, 18, 18)).to.equal(
        ONE_THIRD_18
      );
    });

    it("Rounding up", async () => {
      expect(decimalMulBN(ONE_SIXTH_18, ONE_SIXTH_18, 18, 18, 18)).to.equal(
        ONE_SIXTH_18.div(6).add(1)
      );
    });
  });

  describe("Should be able to multiply 18 decimal * 18 decimals and output to 6 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalMulBN(ONE_18, ONE_THIRD_18, 18, 18, 6)).to.equal(
        ONE_THIRD_6
      );
    });

    it("Rounding up", async () => {
      expect(decimalMulBN(ONE_SIXTH_18, ONE_SIXTH_18, 18, 18, 6)).to.equal(
        ONE_SIXTH_6.div(6).add(1)
      );
    });
  });
});

describe("Test BigNumber decimal division", () => {
  describe("Should be able to divide 6 decimal with 6 decimals and output to 18 decimals ", () => {
    it("Rounding down", async () => {
      // 1/3
      expect(decimalDivBN(ONE_6, THREE_6, 6, 6, 18)).to.equal(ONE_THIRD_18);
    });

    it("Rounding up", async () => {
      // 1/6
      expect(decimalDivBN(ONE_6, THREE_6.mul(2), 6, 6, 18)).to.equal(
        ONE_THIRD_18.div(2).add(1)
      );
    });
  });

  describe("Should be able to divide 6 decimal with 18 decimals and output to 18 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalDivBN(ONE_6, THREE_18, 6, 18, 18)).to.equal(ONE_THIRD_18);
      expect(decimalDivBN(ONE_18, THREE_6, 18, 6, 18)).to.equal(ONE_THIRD_18);
    });

    it("Rounding up", async () => {
      expect(decimalDivBN(ONE_6, THREE_18.mul(2), 6, 18, 18)).to.equal(
        ONE_THIRD_18.div(2).add(1)
      );
      expect(decimalDivBN(ONE_18, THREE_6.mul(2), 18, 6, 18)).to.equal(
        ONE_THIRD_18.div(2).add(1)
      );
    });
  });

  describe("Should be able to divide 6 decimal with 18 decimals and output to 6 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalDivBN(ONE_6, THREE_18, 6, 18, 6)).to.equal(ONE_THIRD_6);
      expect(decimalDivBN(ONE_18, THREE_6, 18, 6, 6)).to.equal(ONE_THIRD_6);
    });

    it("Rounding up", async () => {
      expect(decimalDivBN(ONE_6, THREE_18.mul(2), 6, 18, 6)).to.equal(
        ONE_THIRD_6.div(2).add(1)
      );
      expect(decimalDivBN(ONE_18, THREE_6.mul(2), 18, 6, 6)).to.equal(
        ONE_THIRD_6.div(2).add(1)
      );
    });
  });

  describe("Should be able to divide 18 decimal with 18 decimals and output to 18 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalDivBN(ONE_18, THREE_18, 18, 18, 18)).to.equal(ONE_THIRD_18);
    });

    it("Rounding up", async () => {
      expect(decimalDivBN(ONE_18, THREE_18.mul(2), 18, 18, 18)).to.equal(
        ONE_THIRD_18.div(2).add(1)
      );
    });
  });

  describe("Should be able to divide 18 decimal with 18 decimals and output to 6 decimals ", () => {
    it("Rounding down", async () => {
      expect(decimalDivBN(ONE_18, THREE_18, 18, 18, 6)).to.equal(ONE_THIRD_6);
    });

    it("Rounding up", async () => {
      expect(decimalDivBN(ONE_18, THREE_18.mul(2), 18, 18, 6)).to.equal(
        ONE_THIRD_6.div(2).add(1)
      );
    });
  });
});
