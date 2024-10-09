// const studentsData = [
//     { name: "John", lastName: "Doe", password: "password123", age: "2008-05-15", email: "john.doe1@example.com", phone: "1234567890" },
//     { name: "Jane", lastName: "Smith", password: "password456", age: "2005-10-30", email: "jane.smith1@example.com", phone: "0987654321" },
//     { name: "Michael", lastName: "Johnson", password: "password789", age: "1995-07-20", email: "michael.johnson1@example.com", phone: "1122334455" },
//     { name: "Emily", lastName: "Davis", password: "password321", age: "1987-02-14", email: "emily.davis1@example.com", phone: "2233445566" },
//     { name: "Chris", lastName: "Brown", password: "password654", age: "2012-11-03", email: "chris.brown1@example.com", phone: "3344556677" },
//     { name: "Jessica", lastName: "Williams", password: "password987", age: "2003-09-17", email: "jessica.williams1@example.com", phone: "4455667788" },
//     { name: "David", lastName: "Jones", password: "password741", age: "2010-01-29", email: "david.jones1@example.com", phone: "5566778899" },
//     { name: "Sarah", lastName: "Miller", password: "password852", age: "1990-12-05", email: "sarah.miller1@example.com", phone: "6677889900" },
//     { name: "James", lastName: "Garcia", password: "password963", age: "1975-08-23", email: "james.garcia1@example.com", phone: "7788990011" },
//     { name: "Linda", lastName: "Martinez", password: "password159", age: "1983-06-13", email: "linda.martinez1@example.com", phone: "8899001122" },
//     { name: "Robert", lastName: "Rodriguez", password: "password753", age: "2006-03-11", email: "robert.rodriguez1@example.com", phone: "9900112233" },
//     { name: "Patricia", lastName: "Martinez", password: "password951", age: "1998-07-22", email: "patricia.martinez1@example.com", phone: "1011223344" },
//     { name: "Thomas", lastName: "Hernandez", password: "password357", age: "1989-04-28", email: "thomas.hernandez1@example.com", phone: "1122334455" },
//     { name: "Jennifer", lastName: "Lopez", password: "password258", age: "2011-08-15", email: "jennifer.lopez1@example.com", phone: "2233445566" },
//     { name: "Daniel", lastName: "Gonzalez", password: "password369", age: "2004-12-31", email: "daniel.gonzalez1@example.com", phone: "3344556677" },
//     { name: "Nancy", lastName: "Wilson", password: "password147", age: "1993-11-09", email: "nancy.wilson1@example.com", phone: "4455667788" },
//     { name: "Matthew", lastName: "Anderson", password: "password258", age: "1978-01-07", email: "matthew.anderson1@example.com", phone: "5566778899" },
//     { name: "Lisa", lastName: "Thomas", password: "password369", age: "1981-05-19", email: "lisa.thomas1@example.com", phone: "6677889900" },
//     { name: "Anthony", lastName: "Taylor", password: "password147", age: "2007-03-30", email: "anthony.taylor1@example.com", phone: "7788990011" },
//     { name: "Dorothy", lastName: "Moore", password: "password258", age: "1999-12-25", email: "dorothy.moore1@example.com", phone: "8899001122" },
//     { name: "Mark", lastName: "Jackson", password: "password369", age: "1984-09-14", email: "mark.jackson1@example.com", phone: "9900112233" },
//     { name: "Sandra", lastName: "Martin", password: "password741", age: "1970-02-20", email: "sandra.martin1@example.com", phone: "1011223344" },
//     { name: "Paul", lastName: "Lee", password: "password852", age: "2009-11-07", email: "paul.lee1@example.com", phone: "1122334455" },
//     { name: "Steven", lastName: "Perez", password: "password963", age: "1982-04-12", email: "steven.perez1@example.com", phone: "2233445566" },
//     { name: "Michelle", lastName: "White", password: "password159", age: "1976-07-29", email: "michelle.white1@example.com", phone: "3344556677" },
//     { name: "Kevin", lastName: "Harris", password: "password753", age: "1997-08-24", email: "kevin.harris1@example.com", phone: "4455667788" },
//     { name: "Laura", lastName: "Clark", password: "password951", age: "2000-06-16", email: "laura.clark1@example.com", phone: "5566778899" },
//     { name: "Joshua", lastName: "Lewis", password: "password357", age: "2014-05-18", email: "joshua.lewis1@example.com", phone: "6677889900" },
//     { name: "Elizabeth", lastName: "Walker", password: "password258", age: "1986-01-22", email: "elizabeth.walker1@example.com", phone: "7788990011" },
//     { name: "Brian", lastName: "Hall", password: "password369", age: "1979-03-05", email: "brian.hall1@example.com", phone: "8899001122" }
// ];


// const registerStudents = async (students) => {
//     for (const student of students) {
//         try {
//             const response = await fetch('http://localhost:3000/api/singIn', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(student)
//             });
//             const result = await response.json();
//             console.log(result.message);
//         } catch (error) {
//             console.error('Error registrando estudiante:', student.email, error);
//         }
//     }
// };

// // Llamar a la función para registrar estudiantes
// registerStudents(studentsData);


// const studentIds = [
//     "66a1f342cc3200b18616c4a2",
//     "66a1f343cc3200b18616c4a7",
//     "66a1f343cc3200b18616c4ac",
//     "66a1f344cc3200b18616c4b1",
//     "66a1f344cc3200b18616c4b6",
//     "66a1f344cc3200b18616c4bb",
//     "66a1f345cc3200b18616c4c0",
//     "66a1f345cc3200b18616c4c5",
//     "66a1f345cc3200b18616c4ca",
//     "66a1f346cc3200b18616c4cf",
//     "66a1f346cc3200b18616c4d4",
//     "66a1f347cc3200b18616c4d9",
//     "66a1f347cc3200b18616c4de",
//     "66a1f347cc3200b18616c4e3",
//     "66a1f348cc3200b18616c4e8",
//     "66a1f348cc3200b18616c4ed",
//     "66a1f348cc3200b18616c4f2",
//     "66a1f349cc3200b18616c4f7",
//     "66a1f349cc3200b18616c4fc",
//     "66a1f34acc3200b18616c501",
//     "66a1f34acc3200b18616c506",
//     "66a1f34acc3200b18616c50b",
//     "66a1f34bcc3200b18616c510",
//     "66a1f34bcc3200b18616c515",
//     "66a1f34ccc3200b18616c51a",
//     "66a1f34ccc3200b18616c51f",
//     "66a1f34ccc3200b18616c524",
//     "66a1f34dcc3200b18616c529",
//     "66a1f34dcc3200b18616c52e",
//     "66a1f34dcc3200b18616c533"
// ];

// const courses = [
//     "66983d69c1e32bd4a6d829d1", // Curso de natación Básico
//     "66983d95c1e32bd4a6d829dc", // Curso de natación intermedio
//     "66983db5c1e32bd4a6d829e7"  // Curso de natación avanzado
// ];

// const getRandomCourse = () => {
//     const randomIndex = Math.floor(Math.random() * courses.length);
//     return courses[randomIndex];
// };

// const getRandomDate = (start, end) => {
//     const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//     return date.toLocaleString();
// };

// const enrollStudents = async (students) => {
//     for (const studentId of students) {
//         const enrollmentData = {
//             id_student: studentId,
//             id_course: getRandomCourse(),
//             amount: 400
//         };

//         try {
//             const response = await fetch('http://localhost:3000/api/enrollment', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(enrollmentData)
//             });
//             const result = await response.json();
//             console.log(result.message || result);
//         } catch (error) {
//             console.error('Error inscribiendo estudiante:', studentId, error);
//         }
//     }
// };

// // Llamar a la función para inscribir estudiantes
// enrollStudents(studentIds);

const studentIds = [
    "66a1f342cc3200b18616c4a2",
    "66a1f343cc3200b18616c4a7",
    "66a1f343cc3200b18616c4ac",
    "66a1f344cc3200b18616c4b1",
    "66a1f344cc3200b18616c4b6",
    "66a1f344cc3200b18616c4bb",
    "66a1f345cc3200b18616c4c0",
    "66a1f345cc3200b18616c4c5",
    "66a1f345cc3200b18616c4ca",
    "66a1f346cc3200b18616c4cf",
    "66a1f346cc3200b18616c4d4",
    "66a1f347cc3200b18616c4d9",
    "66a1f347cc3200b18616c4de",
    "66a1f347cc3200b18616c4e3",
    "66a1f348cc3200b18616c4e8",
    "66a1f348cc3200b18616c4ed",
    "66a1f348cc3200b18616c4f2",
    "66a1f349cc3200b18616c4f7",
    "66a1f349cc3200b18616c4fc",
    "66a1f34acc3200b18616c501",
    "66a1f34acc3200b18616c506",
    "66a1f34acc3200b18616c50b",
    "66a1f34bcc3200b18616c510",
    "66a1f34bcc3200b18616c515",
    "66a1f34ccc3200b18616c51a",
    "66a1f34ccc3200b18616c51f",
    "66a1f34ccc3200b18616c524",
    "66a1f34dcc3200b18616c529",
    "66a1f34dcc3200b18616c52e",
    "66a1f34dcc3200b18616c533"
];

const trainingTypes = ['crol', 'pecho', 'torso', 'mariposa'];
const levels = ['beginner', 'intermediate', 'advanced'];
const distances = [25, 50, 100];

// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (dob) => {
    const diffMs = Date.now() - new Date(dob).getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
};

// Función para generar estatura y peso basado en la edad
const generateHeightWeight = (age) => {
    let height, weight;

    if (age >= 6 && age <= 10) {
        height = Math.floor(Math.random() * (130 - 110 + 1) + 110);
        weight = Math.floor(Math.random() * (30 - 20 + 1) + 20);
    } else if (age >= 11 && age <= 15) {
        height = Math.floor(Math.random() * (165 - 135 + 1) + 135);
        weight = Math.floor(Math.random() * (55 - 35 + 1) + 35);
    } else {
        height = Math.floor(Math.random() * (180 - 150 + 1) + 150);
        weight = Math.floor(Math.random() * (80 - 50 + 1) + 50);
    }

    return { height, weight };
};

// Función para generar el tiempo de entrenamiento basado en la distancia y el nivel
const generateTrainingTime = (distance, level) => {
    const times = {
        beginner: { '25': 30, '50': 60, '100': 120 },
        intermediate: { '25': 20, '50': 45, '100': 90 },
        advanced: { '25': 15, '50': 35, '100': 70 }
    };

    return times[level][distance.toString()];
};

// Función para obtener una fecha específica en julio
const getSpecificJulyDate = (day) => {
    const date = new Date(`2024-07-${String(day).padStart(2, '0')}`);
    return date.toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

// Función para crear evaluaciones
const createEvaluations = async (studentIds) => {
    for (const studentId of studentIds) {
        const age = Math.floor(Math.random() * (60 - 5 + 1) + 5); // Edad aleatoria entre 5 y 60
        const { height, weight } = generateHeightWeight(age);

        for (let day = 1; day <= 31; day++) { // Generar una evaluación por cada día de julio
            const distance = distances[Math.floor(Math.random() * distances.length)];
            const trainingType = trainingTypes[Math.floor(Math.random() * trainingTypes.length)];
            const level = levels[Math.floor(Math.random() * levels.length)];
            const time = generateTrainingTime(distance, level);

            const evaluationData = {
                trainingType: trainingType,
                date: getSpecificJulyDate(day),
                time: time.toString(),
                distance: distance.toString(),
                year: '2024',
                month: 'Julio',
                weight: weight,
                height: height
            };

            try {
                const response = await fetch('http://localhost:3000/api/evaluation-create/' + studentId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(evaluationData)
                });
                const result = await response.json();
                console.log(result.message || result);
            } catch (error) {
                console.error('Error creando evaluación para estudiante:', studentId, error);
            }
        }
    }
};

// Llamar a la función para crear evaluaciones
createEvaluations(studentIds);