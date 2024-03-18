class BankAccount {

    constructor(saldo){
        this.saldo = saldo;
    }

    deposit(amount){
        if(amount != null && amount != "" && Number.isInteger(parseInt(amount))){
            this.saldo += parseInt(amount)
            return("Saldo berhasil ditambah menjadi Rp." + this.saldo)
        } else {
            return("Input tidak valid")
        }
    }

    withdraw(amount){
        if(amount != null && amount != "" && Number.isInteger(parseInt(amount))){
            if (parseInt(amount) > this.saldo) {
                console.log("Saldo tidak mencukupi")
                alert("Saldo Tidak Mencukupi")
                return
            }
            this.saldo -= parseInt(amount)
            return("Saldo berhasil dikurangkan menjadi Rp." + this.saldo)
        } else {
            return("Input tidak valid")
        }
    }
}