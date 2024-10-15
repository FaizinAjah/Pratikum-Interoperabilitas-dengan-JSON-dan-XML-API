const axios = require('axios');
const { Builder } = require('xmlbuilder2');

// Mengambil data dari JSON API
axios.get('http://localhost:3000/person')
    .then(response => {
        const persons = response.data;

        // Membuat struktur XML dari data JSON
        const xml = Builder.create({ version: '1.0' })
            .ele('persons')
            .ele(persons.map(person => ({
                person: {
                    id: person.id,
                    name: person.nama,
                    age: person.umur,
                    address: { street: person.alamat.jalan, city: person.alamat.kota },
                    hobbies: { hobby: person.hobi }
                }
            })))
            .end({ prettyPrint: true });

        // Menampilkan hasil XML di konsol
        console.log(xml);
    })
    .catch(error => console.error(error));
