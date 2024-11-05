const firebaseConfig = {
    apiKey: "AIzaSyBanoiCrthH1-drvwHLDUM2s-mPBlEW3Yg",
    authDomain: "indexeddb-6d93d.firebaseapp.com",
    projectId: "indexeddb-6d93d",
    storageBucket: "indexeddb-6d93d.firebasestorage.app",
    messagingSenderId: "442440895445",
    appId: "1:442440895445:web:7f06c3401adc601e874b5c",
    measurementId: "G-Z39L3YVENP"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Função de Cadastro
function registerUser() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const name = document.getElementById("registerName").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection("users").doc(user.uid).set({
                email: email,
                nome: name,
            });
        })
        .then(() => {
            alert("Cadastro realizado com sucesso!");
            document.getElementById("registerForm").reset();
        })
        .catch((error) => {
            console.error("Erro ao cadastrar usuário: ", error);
            alert(error.message);
        });
}

// Função de Login
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            document.getElementById("welcomeMessage").textContent = "Bem-vindo, " + user.email + "!";
            alert("Login realizado com sucesso!");
            document.getElementById("loginForm").reset();
            window.location.href = "dashboard.html"; // Link de redirecionamento
        })
        .catch((error) => {
            console.error("Erro ao fazer login: ", error);
            alert(error.message);
        });
}