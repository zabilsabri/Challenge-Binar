-- DDL (CREATE DATABASE AND TABLE)
CREATE DATABASE banking_system;

CREATE TABLE nasabah (
	id BIGSERIAL PRIMARY KEY,
	nama VARCHAR(255),
	alamat TEXT,
	pekerjaan VARCHAR(255),
	penghasilan DECIMAL(12, 2),
	no_telp VARCHAR(20),
	email VARCHAR(255)
);


CREATE TABLE akun (
	id BIGSERIAL PRIMARY KEY,
	no_rek VARCHAR(255) UNIQUE,
	pin VARCHAR(255),
	saldo DECIMAL(12, 2),
	nasabah_id INTEGER,
	CONSTRAINT fk_nasabah FOREIGN KEY (nasabah_id) REFERENCES nasabah(id)
);

CREATE TYPE kegiatan_enum AS ENUM ('tarik', 'setor'); -- Membuat type ENUM

CREATE TABLE transaksi (
	id BIGSERIAL PRIMARY KEY,
	tgl_transaksi TIMESTAMP,
	kegiatan kegiatan_enum,
	nominal DECIMAL(12, 2),
	akun_id INTEGER,
	CONSTRAINT fk_akun FOREIGN KEY (akun_id) REFERENCES akun(id)
);

-- DML (INSERT DATA)
INSERT INTO nasabah (nama, alamat, pekerjaan, penghasilan, no_telp, email)
VALUES ('Zabil Sabri Muhammad', 'Jl. Dg. Tata', 'Backend Engineer', 5000000, '0816280445', 'zabilsabrimuhammad0@gmail.com'),
		('Mukram Mustamin', 'Sudiang', 'UI/UX', 5000000, '0816280446', 'mukram@gmail.com');
		

INSERT INTO akun (no_rek, pin, saldo, nasabah_id)
VALUES ('12345678910', '$2y$10$L4HTlcwcQ/74gbjc7C5DHOBcYJKjHMNBedvfMDJDZAA.M30gu0AP6', 10000000, 1),
		('101010220102', '$2y$10$bphsXGxOoj3LKcJ/c7GqNOgqrBnJ2Ya2Q196aIT1vRPrzPcUGsYUO', 100000000, 1),
		('112233445566', '$2y$10$BjVgmAQCVkVUlBMNwmXequkwdboOlG8WpYBfjmrmnO9rm1agDzm8i', 9000000, 2);
		
INSERT INTO transaksi (tgl_transaksi, kegiatan, nominal, akun_id)
VALUES ('2024-03-18 12:26:00', 'tarik', 90000000, 1),
		('2024-03-17 11:00:00', 'tarik', 1000000, 3),
		('2024-03-17 11:00:00', 'setor', 2000000, 3);

-- DML (SELECT DATA)
SELECT * FROM nasabah;

SELECT * FROM akun;

SELECT * FROM transaksi;

-- DML (UPDATE DATA)
UPDATE nasabah
SET email = 'mukrammustamin@gmail.com'
WHERE id = 2;

-- DML (DELETE DATA)
DELETE from transaksi
WHERE id = 2