# Pojokoding Documentation

## Cara Kerja Umum Repository
Logic per fitur di pisah di folder component yang kemudian digunakan di folder pages
didalam component dibagi lagi menjadi beberapa folder, setiap folder mewakili satu buah fitur
state data dan fungsi fungsi di handle Pinia dan ada di folder stores
data dan fungsi yang ada di stores digunakan di komponen

## Sifat aplikasi
Saat pertama kali page load, aplikasi akan menampilkan layar loading, layar ini menunggu
firebase untuk mengambil data user yang sedang login sekarang. Setelah firebase selesai mengecek
apakah ada user yang sedang loading maka aplikasi mulai di render (lihat app.vue)
