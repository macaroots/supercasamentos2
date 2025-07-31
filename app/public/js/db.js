function conectar() {
    return new Promise((resolve, reject) => {
        let db;
        const request = indexedDB.open("MyTestDatabase", 2);
        request.onerror = (event) => {
            reject(new Error("Sem IndexedDB!"));
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            console.log({event});

            switch(event.newVersion) {
                case 1:
                    let servicosStore = db.createObjectStore("servicos", { keyPath: "id", autoIncrement: true });
                    servicosStore.createIndex("nome", "nome", { unique: false });
                    break;
                case 2:
                    let pessoasStore = db.createObjectStore("pessoas", { keyPath: "id", autoIncrement: true });
                    pessoasStore.createIndex("nome", "nome", { unique: false });
                    break;
            }
        };
        
    });
}