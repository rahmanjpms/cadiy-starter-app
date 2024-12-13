export const generatePassword = () => {
    //
    function generateAlphabetRangeArray(startChar = "A", endChar = "Z") {
        const start = startChar.charCodeAt(0);
        const end = endChar.charCodeAt(0);
        return Array.from({ length: end - start + 1 }, (_, i) => String.fromCharCode(start + i));
    }
    const letterAtoH = generateAlphabetRangeArray("A", "Z");
    const letterItoP = generateAlphabetRangeArray("I", "P");
    const letterQtoZ = generateAlphabetRangeArray("Q", "Z");
    const smallLetter_a_m = generateAlphabetRangeArray("a", "m");
    const smallLetter_n_z = generateAlphabetRangeArray("n", "z");
    const numbers: string[] = Array.from({ length: 10 }, (_, index) => index.toString());
    const symbol: string[] = ["!", "@", "$", "&", "*", "<", ">", "%", "#"];

    const A_H = letterAtoH[Math.floor(Math.random() * letterAtoH.length)];
    const I_P = letterItoP[Math.floor(Math.random() * letterItoP.length)];
    const Q_Z = letterQtoZ[Math.floor(Math.random() * letterQtoZ.length)];
    const a_m = smallLetter_a_m[Math.floor(Math.random() * smallLetter_a_m.length)];
    const n_z = smallLetter_n_z[Math.floor(Math.random() * smallLetter_n_z.length)];
    const num1 = numbers[Math.floor(Math.random() * numbers.length)];
    const num2 = numbers[Math.floor(Math.random() * numbers.length)];
    const sym = symbol[Math.floor(Math.random() * symbol.length)];
    const password = A_H + n_z + num1 + Q_Z + num2 + a_m + I_P + sym;
    console.log("PASSWORD : " + password);
    return password;
};
