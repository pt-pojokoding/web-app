# Pojokoding Documentation

## Topik

### 1. Langkah-langkah pembuatan Fitur yang mempunyai Data Fetching

- Definisikan hal yang ingin dibuat data fetching (misal review kursus)
- Buat file di stores (misal stores/review.ts)
- buatlah operasi CRUD untuk hal tersebut didalam file yang dibuat
- dengan menggunakan fungsi didalam stores/review.ts  buatlah fungsi untuk handling operations dalam level pages (misal pada pages/[course]/index.vue)
- Berikan fungsi-fungsi atau object hasil fetch kedalam komponen sebagai parameter komponen
- pada komponen gunakan data-data dan fungsi-fungsi yang diberikan

### 2. Pembuatan Komponen

- Apa definisi komponen?
    Sebuah potongan dari sebuah fitur atau section yang hanya bertanggung jawab dalam satu hal
- Parent component dan child component
    - di pojokoding terdapat parent dan child component
    - child component hanya bisa satu level dari parent component = tidak boleh membuat child component dari child component
- Kapan sebuah section, fitur, harus dipecah menjadi sebuah parent component
    - parent component bertaggung jawab untuk menangani satu buah object, misal object review dalam daftar review dan menampilkan satu object kursus dalam card daftar kursus
- Kapan sebuah parent component dipecah menjadi child component
    - ketika pemecahan komponen dapat mengurangi jumlah baris kode di parent element

### 3. Auth

Ada tiga jenis user di pojokoding

- Unauthorized
    - Artikel
- Login tanpa Subscription
    - Artikel
    - Progress
    - Quiz
- Login dengan Subscription
    - Artikel
    - Progress
    - Quiz
    - Latihan
    - Sertifikat

### 4. Jika ada component yang memiliki child-component
awali nama child componen tersebut dengan nama parent component
Navbar.vue
NavbarDropdown.vue 

## Folders

Untuk sebagian besar folder masih mengikuti dokumentasi dari nuxt. silahkan melihat dokumentasi nuxt untuk memahami sebagian besar folder. 

Namun ada beberapa folder unik di proyek pojokoding

### 1. Cypress
Berisikan E2E testing

### 2. Stores
 Berisikan stores dari Pinia. berfugsi untuk menyimpan variable dan fungsi sehingga tersedia secara global dan dapat dipakai accross component

### 3. Services
Fungsi yang berkaitan dengan GET POST data, satu file didalam folder bertanggung jawab terhadap satu jenis request