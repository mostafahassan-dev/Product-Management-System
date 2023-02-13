let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood = 'create';
let tmp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit)



// get total
function getTotal(){
    if(price.value != ''){
        
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ='#040';
    }else{
        total.innerHTML = '';
        total.style.background ='#a00d02';
    }

}






// create product

let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)

}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro ={
        title: title.value.toLowerCase() ,
        price: price.value ,
        taxes: taxes.value ,
        ads: ads.value ,
        discount: discount.value ,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    // clean data
    if (title.value != ''
        && price.value != '' 
        && category.value != ''
        && count.value < 101){
        if ( mood === 'create'){
            if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
            }    
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[ tmp ] = newPro ;
            mood = 'create';
            submit.innerHTML = 'Create';
            submit.style.background = 'rgba(255, 255, 255,.75)';
            submit.style.color = '#000';
            count.style.display = 'block';
        
        }
        clearData()
    }else{
        
        title.focus()    
    }
    
    // save localstorge

    localStorage.setItem('product', JSON.stringify(dataPro))
    
    
    showData()
}


// clearinputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData(){
    getTotal()

    let table = '';
    for(let i = 0; i < dataPro.length; i++ ){
        table += `
        <tr>
            <th>${i+1}</th>
            <th>${dataPro[i].title}</th>
            <th>${dataPro[i].price}</th>
            <th>${dataPro[i].taxes}</th>
            <th>${dataPro[i].ads}</th>
            <th>${dataPro[i].discount}</th>
            <th>${dataPro[i].total}</th>
            <th>${dataPro[i].category}</th>
            <th> <button onclick="updateData(${i})" id="update">Uptdate </button></th>
            <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
            </tr>
            `;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllbtn = document.getElementById("delete-all");
    if(dataPro.length > 0){
    deleteAllbtn.innerHTML = `<button onclick="deleteAll()" id="delete-all">Delete All (${dataPro.length})</button>`;
    
    }else {
        deleteAllbtn.innerHTML = '';
    }
}
showData()

// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);

    showData()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


// update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    
    getTotal()
    count.style.display='none';
    submit.innerHTML = 'Update';
    submit.style.background = '#a3c2c2';
    submit.style.color = '#000';

    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
    
}

//search

let searchMood = 'title';

function getShearcgMood(id){
    let search = document.getElementById('search');

    // console.log(search)

    if(id == 'search-title' ){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus()
    search.value = '';
    showData()
}

function searchData(value){
    // console.log(value);

    let table ='';
    if (searchMood == 'title'){

        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase() ) ){
                table += `
                <tr>
                    <th>${i+1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th> <button onclick="updateData(${i})" id="update">Uptdate </button></th>
                    <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
                </tr>
                    `;
            }
        }


    }else{ 
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase() ) ){
            table += `
            <tr>
                <th>${i+1}</th>
                <th>${dataPro[i].title}</th>
                <th>${dataPro[i].price}</th>
                <th>${dataPro[i].taxes}</th>
                <th>${dataPro[i].ads}</th>
                <th>${dataPro[i].discount}</th>
                <th>${dataPro[i].total}</th>
                <th>${dataPro[i].category}</th>
                <th> <button onclick="updateData(${i})" id="update">Uptdate </button></th>
                <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
            </tr>
                `;
        }
    }
    }
    document.getElementById('tbody').innerHTML = table;

}


