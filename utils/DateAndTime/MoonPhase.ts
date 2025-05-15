export const getMoonPhase = (date: Date = new Date()) => {
  // Get the year, month, and day in the local timezone
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // months are 0-based in JavaScript
  const day = date.getDate();

  // Convert the month and year for January and February
  if (month < 3) {
    year--;
    month += 12;
  }

  // Calculate the Julian date at 12h local time
  const c = 365.25 * year;
  const e = 30.6 * (month + 1);
  const jd = c + e + day - 694039.09; // 694039.09 is the Julian date at epoch 1900.0
  const phase = (jd / 29.53058867) % 1; // Modulo to get fractional part
  const phaseIndex = Math.floor(phase * 8 + 0.5) % 8; // Adjust and get index

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

  const phaseName = phaseNames[phaseIndex];
  const phaseNameTH = phaseNamesTH[phaseIndex];

  return {
    phase: phaseIndex,
    phaseName,
    phaseNameTH,
  };
};