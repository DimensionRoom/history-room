export const getMoonPhase = (date: Date = new Date()) => {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1; // months are 0-based in JavaScript
  const day = date.getUTCDate();

  // Convert the month and year for January and February
  if (month < 3) {
    year--;
    month += 12;
  }

  // Calculate the Julian date at 12h UT
  const c = 365.25 * year;
  const e = 30.6 * (month + 1);
  const jd = c + e + day - 694039.09; // 694039.09 is the Julian date at epoch 1900.0
  const phase = jd / 29.53058867; // Divide by the average length of the synodic month
  const phaseIndex = Math.floor(phase); // Get the integer part to find the phase

  const phaseNames = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent",
  ];

  const phaseNamesTH = [
    "จันทร์ดับ",
    "ข้างขึ้นเสี้ยว",
    "ข้างขึ้นครึ่งดวง",
    "ข้างขึ้นเกือบเต็มดวง",
    "พระจันทร์เต็มดวง",
    "ข้างแรมเกือบเต็มดวง",
    "ข้างแรมครึ่งดวง",
    "ข้างแรมเสี้ยว",
  ];

  const phaseName = phaseNames[phaseIndex % 8];
  const phaseNameTH = phaseNamesTH[phaseIndex % 8];

  return {
    phase: phaseIndex % 8,
    phaseName,
    phaseNameTH,
  };
};
