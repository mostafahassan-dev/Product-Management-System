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

let data;

if(localStorage.product != null){
    data = JSON.parse(localStorage.product)

}else{
    data = [];
}

submit.onclick = function(){
    let newProduct ={
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
            if(newProduct.count > 1){
            for(let i = 0; i < newProduct.count; i++){
                data.push(newProduct);
            }    
            }else{
                data.push(newProduct);
            }
        }else{
            data[ tmp ] = newProduct ;
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

    localStorage.setItem('product', JSON.stringify(data))
    
    
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
    for(let i = 0; i < data.length; i++ ){
        table += `
        <tr>
            <th>${i+1}</th>
            <th>${data[i].title}</th>
            <th>${data[i].price}</th>
            <th>${data[i].taxes}</th>
            <th>${data[i].ads}</th>
            <th>${data[i].discount}</th>
            <th>${data[i].total}</th>
            <th>${data[i].category}</th>
            <th> <button onclick="updateData(${i})" id="update">Uptdate </button></th>
            <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
            </tr>
            `;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllbtn = document.getElementById("delete-all");
    if(data.length > 0){
    deleteAllbtn.innerHTML = `<button onclick="deleteAll()" id="delete-all">Delete All (${data.length})</button>`;
    
    }else {
        deleteAllbtn.innerHTML = '';
    }
}
showData()

// delete
function deleteData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);

    showData()
}

function deleteAll(){
    localStorage.clear()
    data.splice(0)
    showData()
}


// update

function updateData(i){
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    category.value = data[i].category;
    
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
    

    let table ='';
    if (searchMood == 'title'){

        for(let i = 0; i < data.length; i++){
            if(data[i].title.includes(value.toLowerCase() ) ){
                table += `
                <tr>
                    <th>${i+1}</th>
                    <th>${data[i].title}</th>
                    <th>${data[i].price}</th>
                    <th>${data[i].taxes}</th>
                    <th>${data[i].ads}</th>
                    <th>${data[i].discount}</th>
                    <th>${data[i].total}</th>
                    <th>${data[i].category}</th>
                    <th> <button onclick="updateData(${i})" id="update">Uptdate </button></th>
                    <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
                </tr>
                    `;
            }
        }


    }else{ 
        for(let i = 0; i < data.length; i++){
            if(data[i].category.includes(value.toLowerCase() ) ){
            table += `
            <tr>
                <th>${i+1}</th>
                <th>${data[i].title}</th>
                <th>${data[i].price}</th>
                <th>${data[i].taxes}</th>
                <th>${data[i].ads}</th>
                <th>${data[i].discount}</th>
                <th>${data[i].total}</th>
                <th>${data[i].category}</th>
                <th> <button onclick="updateData(${i})" id="update">Uptdate </button></th>
                <th> <button onclick="deleteData(${i} )" id="delete">Delete</button></th>
            </tr>
                `;
        }
    }
    }
    document.getElementById('tbody').innerHTML = table;

}


