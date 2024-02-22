saldo = 0 // Variabel "saldo" telah dideklarasikan dengan nilai awal

function tambahSaldo() // Fungsi "tambahSaldo()" telah diimplementasikan menggunakan window.prompt() untuk menambahkan saldo
{
    tambah = window.prompt("Masukkan jumlah saldo yang ingin ditambahkan: ")
    if(tambah != null && tambah != "" && Number.isInteger(parseInt(tambah))){
        saldo += parseInt(tambah)
        console.log(saldo);
        document.getElementById("saldo").innerHTML = saldo;
        alert("Saldo berhasil ditambah menjadi Rp." + saldo)
    } else {
        alert("Input tidak valid")
    }
}

function kurangiSaldo() // Fungsi "kurangiSaldo()" telah diimplementasikan menggunakan window.prompt() untuk mengurangi saldo
{
    kurang = window.prompt("Masukkan jumlah saldo yang ingin dikurangkan: ")
    if(kurang != null && kurang != "" && Number.isInteger(parseInt(kurang))){
        if (parseInt(kurang) > saldo) {
            console.log("Saldo tidak mencukupi")
            kurangiSaldo();
        }
        saldo -= parseInt(kurang)
        console.log(saldo);
        document.getElementById("saldo").innerHTML = saldo;
        alert("Saldo berhasil dikurangkan menjadi Rp." + saldo)
    } else {
        alert("Input tidak valid")
    }
}