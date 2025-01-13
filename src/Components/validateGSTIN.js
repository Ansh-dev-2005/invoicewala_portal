import { state } from "../constants/constant";

function validateGSTIN(gstin) {
  // Remove any spaces and convert to uppercase
  gstin = gstin.trim().toUpperCase();

  // Check length and format
  if (gstin.length !== 15) {
    return { valid: false, message: "GSTIN must be 15 characters long." };
  }

  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/;
  if (!gstinRegex.test(gstin)) {
    return { valid: false, message: "Invalid GSTIN format." };
  }

  // Extract state code
  const stateCode = gstin.substring(0, 2);
//   const stateName = stateCode[stateCode] || "Unknown State";
const stateName = state.statecode.find((s) => s.code === stateCode)?.name;

  return {
    valid: true,
    stateCode: stateCode,
    stateName: stateName,
  };
}

export default validateGSTIN;