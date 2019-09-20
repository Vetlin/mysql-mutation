const Mutation = require('./index');

const m = new Mutation({
    user: 'root',
    password: '',
    host: 'localhost',
    name: 'osnova',
    tables: {
        users: {
            rows: {
                id: {type: 'int', length: 11, primary_key: true, auto_increment: 'id'},
                name: {type: 'varchar', length: 256},
                email: {type: 'varchar', length: 256},
                password: {type: 'varchar', length: 256},
                church_id: {type: 'int', length: 11},
                created_at: {type: 'timestamp', length: 11, default: 'CURRENT_TIMESTAMP'},
            },
        },
        churches: {
            rows: {
                id: {type: 'int', length: 11, primary_key: true, auto_increment: 'id'},
                name: {type: 'varchar', length: 256},
                latitude: {type: 'varchar', length: 256},
                meridian: {type: 'varchar', length: 256},
                denomination_id: {type: 'int', length: 11},
            },
        },
        denominations: {
            rows: {
                id: {type: 'int', length: 11, primary_key: true, auto_increment: 'id'},
                name_en: {type: 'varchar', length: 256},
                name_ru: {type: 'varchar', length: 256},
                name_ua: {type: 'varchar', length: 256},
            },
        }
    },
    autofill: {
        users: [
            {name: 'Amur', email: 'amur@gmail.com',password: '9da8711025b54a179d89e1aae8590154382970fd9fea4d94803d05997f93cc48', church_id: 1},
            {name: 'Bogdan', email: 'bogdan@gmail.com',password: '691f1c41b1df83af0617e31a35f31caed58bdb9c19a08e9c931b0ec866d567c4', church_id: 1},
        ],
        churches: [
            {name: 'Основянская Церковь', latitude: '1.1', meridian: '2.1', denomination_id: '3'},
            {name: 'Церковь Святой Марии', latitude: '1.1', meridian: '2.1', denomination_id: '1'},
            {name: 'Церковь Святого Петра', latitude: '154.1', meridian: '2.577', denomination_id: '1'},
            {name: 'Церковь Святого Николая', latitude: '64.1', meridian: '42.78', denomination_id: '2'},
        ],
        denominations: [
            {name_en: 'Catholicism', name_ru: 'Католицизм', name_ua: 'Католицизм'},
            {name_en: 'Orthodoxy', name_ru: 'Православие', name_ua: 'Православ\'я'},
            {name_en: 'Protestantism', name_ru: 'Протестантизм', name_ua: 'Протестантизм'},
        ],
    },
});