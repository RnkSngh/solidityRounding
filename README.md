# Solidity Rounding

[Ethers.js](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjN8MCPj5qDAxWik4kEHQm9ACQQFnoECBUQAQ&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fethers&usg=AOvVaw3OQZJdPG47nauSZCacDnY6&opi=89978449) is commonly used to send and manage blockchain transactions in Javascript. Though Ethers.js is great for sending simple transactions, it falls considerably short for modeling on-chain arithmetic (e.g. from [AAVE's Wad Ray Math](https://github.com/aave/aave-protocol/blob/master/contracts/libraries/WadRayMath.sol), or [Open Zeppelin's Math library](https://docs.openzeppelin.com/contracts/2.x/api/math)) in javascript. This repo contains a tiny library that adds functions to divide and multiply arbitrarily formatted decimals represented as floats. This library is intended to supplement Ethers.js and thus the inputs and outputs of most functions are of type `BigNumber`.

# Usage

## Multiplication

`DecimalMulBN` can be used to multiply two numbers, and output to arbitrary decimal formatting

Let's say we want to multiply and divide balances in ETH and USDC. ETH balances are always formatted to 18 decimals, and USDC balances are formatted to 6 decimals. Let's say we want to multiply a balance of 0.5 ETH and 0.5 USDC. We can do the following:

```
import { utils } from "ethers";
import { decimalMulBN } from "solidity-rounding";

const a = utils.parseEther(".5"); // ETH balance
const b = utils.parseUnits(".5", 6); // USDC balance

const product = decimalMulBN(a, b, 18, 6);

console.log("a mul b", product.toString()); // Logs 0.25e18
```

The outputs of `decimalMulBN ` defaults to 18 decimals. If we want to output to another decimal format, for example, to 6 decimals, we can pass in another argument to the decimalMulBN function:

```
const product6Decimals = decimalMulBN(a, b, 18, 6, 6)
console.log("a mul b", product6Decimals.toString()); // Logs 0.25e6
```

## Division

Division works similarly to multiplication. The first argument is the dividend, and the second is the divisor. Both are of `BigNumber` types.

Let's say we want to multiply a balance of 0.5 ETH (represented as 0.5 e18) and 0.5 USDC (represented as 0.5e6). We can do the following:

```
import { utils } from "ethers";
import { decimalDivBN } from "solidity-rounding";

const a = utils.parseEther(".5");
const b = utils.parseUnits(".5", 6);

const quotient = decimalDivBN(a, b, 18, 6);

console.log("a mul b", quotient.toString()); // Logs 1e18
```

Similarly to `decimalMulBN`, The outputs of `decimalDivBN ` defaults to 18 decimals. If we want to output to another decimal format, for example, to 6 decimals, we can pass in another argument:

```
const quotient6Decimals = decimalDivBN(a, b, 18, 6, 6)
console.log("a mul b", quotient6Decimals.toString()); // Logs 1e6
```

## Other functions

In additional to `decimalMulBN` and `decimalDivBN`, this library also adds `min`, `max`, `abs`, and `convertDecimals` functions.
