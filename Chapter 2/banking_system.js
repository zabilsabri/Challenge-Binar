const saldo = new BankAccount(0);

function updateSaldo() {
    document.getElementById("saldo").innerHTML = saldo.saldo;
}

function tambahSaldo() {
    const tambah = window.prompt("Masukkan jumlah saldo yang ingin ditambahkan: ")
    if (tambah) {
        const depositMessage = saldo.deposit(parseInt(tambah));
        setTimeout(() => {
            console.log(depositMessage);
            updateSaldo();
        }, 2000);
    } else {
        alert("Masukkan nominal yang valid!");
    }
}

function kurangiSaldo() {
    const kurang = window.prompt("Masukkan jumlah saldo yang ingin dikurangkan: ")
    if (kurang) {
        const depositMessage = saldo.withdraw(parseInt(kurang));
        setTimeout(() => {
            console.log(depositMessage);
            updateSaldo();
        }, 2000);
    } else {
        alert("Masukkan nominal yang valid!");
    }
}