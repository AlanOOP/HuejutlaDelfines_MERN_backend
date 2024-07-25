export const generateHeightWeight = (age) => {
    let height, weight;
    if (age <= 10) {
        height = Math.round(110 + Math.random() * 20); // entre 110 y 130 cm
        weight = Math.round(20 + Math.random() * 10);  // entre 20 y 30 kg
    } else if (age <= 20) {
        height = Math.round(150 + Math.random() * 30); // entre 150 y 180 cm
        weight = Math.round(40 + Math.random() * 30);  // entre 40 y 70 kg
    } else if (age <= 50) {
        height = Math.round(160 + Math.random() * 20); // entre 160 y 180 cm
        weight = Math.round(60 + Math.random() * 40);  // entre 60 y 100 kg
    } else {
        height = Math.round(150 + Math.random() * 20); // entre 150 y 170 cm
        weight = Math.round(60 + Math.random() * 30);  // entre 60 y 90 kg
    }
    return { height, weight };
};

export const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};