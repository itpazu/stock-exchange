const urlCompany = new URLSearchParams(window.location.search);
console.log(urlCompany);

for(key of urlCompany) { 
    console.log(key); }

    console.log(urlCompany.get("symbol"));
    