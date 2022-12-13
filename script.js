var selectedRow = null;
const notyf = new Notyf({
    duration : 3000,
    position : {
        x: 'right',
        y: 'top'
    }
});
$(document).ready(function(){
    for(var i= 0; i< localStorage.length; i++){
        var key = localStorage.key(i);
        if(key.includes("formData")){
            var value = localStorage.getItem(key);
            var product = JSON.parse(value);
            addProduct(product);
        } 
    }

    TableIsNull();

    $("tbody").on("click", ".btnEdit", function(){
        isValid();
        selectedRow = $(this).closest("tr")[0];
        modalTitleValueChange("Изменение", selectedRow.cells[0].innerHTML);
        modalButtonValueChange("Изменить");
        $("#Name").val(selectedRow.cells[0].innerHTML);
        $("#Proteins").val(selectedRow.cells[1].innerHTML);
        $("#Fats").val(selectedRow.cells[2].innerHTML);
        $("#Сarbohydrates").val(selectedRow.cells[3].innerHTML);
    });

    $("tbody").on("click", ".btnDelete", function(){
        selectedRow = $(this).closest("tr");
        $("#deleteModal").modal("toggle");
        $("#h1DeleteModal")[0].innerText = "Удалить продукт " + $(this).closest("tr")[0].cells[0].innerText + "?";
    });

    $("#deleteModal").on("click", "#deleteButtonDeleteModal", function(){
        selectedRow.remove();
        var productName = selectedRow[0].children[0].innerText;
        localStorage.removeItem("formData" + productName);
        TableIsNull();
        $("#deleteModal").modal("hide");
        notyf.success('Продукт ' + productName + ' Был успешно удалён!');
        selectedRow = null;
    });

    $(".openModal").on("click", function(){
        isValid();
        modalTitleValueChange("Добавление");
        modalButtonValueChange("Добавить");
        Reset();
    });

    $("#productForm").submit(function(){
        isValid();
        event.preventDefault();
        var formData = readFormData();
        
        checkDataForNull(formData);

        if(selectedRow === null & formData.Name != "" & formData.Proteins != "" & formData.Fats != "" & formData.Сarbohydrates != "")
        {   
            if(!checkDataForNull(formData))
            {
                addProduct(formData); 
                $("#exampleModal").modal("hide");
                Reset();
                notyf.success('Продукт ' + formData.Name + ' успешно был добавлен!');
            }   
        }
        else if(formData.Name != "" & formData.Proteins != "" & formData.Fats != "" & formData.Сarbohydrates != ""){
            if(!checkDataForNull(formData)){
                Update(formData);
                selectedRow = null;
                $("#exampleModal").modal("hide");
                Reset();
                notyf.success('Продукт ' + formData.Name + ' успешно был изменен!');
            } 
        }
    });
});

// document.addEventListener("DOMContentLoaded",function(){
//     for(var i= 0; i< localStorage.length; i++){
//         var key = localStorage.key(i);
//         var value = localStorage.getItem(key);
//         var product = JSON.parse(value);
//         addProduct(product);
//     }
// })



// function onFormSubmit(e)
// {
//     event.preventDefault();
//     var formData = readFormData();
//     if(formData.Name === "" || formData.Fats === "" || formData.Proteins === "" || formData.Сarbohydrates === ""){
//         alert("Введены не верные данные")
//     } else {
//         if(selectedRow === null)
//         {
//             addProduct(formData);
//         }
//         else {
//             Update(formData);
//             selectedRow = null;
//         }
//         Reset();
//     }
// }

function readFormData(){
    var formData = {};
    formData["Name"] = $("#Name").val();
    //formData["Name"] = document.getElementById("Name").value;
    formData["Proteins"] = $("#Proteins").val();
    //formData["Proteins"] = document.getElementById("Proteins").value;
    formData["Fats"] = $("#Fats").val();
    //formData["Fats"] = document.getElementById("Fats").value;
    formData["Сarbohydrates"] = $("#Сarbohydrates").val();
    //formData["Сarbohydrates"] = document.getElementById("Сarbohydrates").value;
    //localStorage.setItem("formData" + formData.Name, JSON.stringify(formData));
    return formData;
};

function addProduct(data) {
    var table = $("tbody")[0];
    var newRow = table.insertRow(table.lenght);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.Name;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.Proteins;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.Fats;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.Сarbohydrates;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button class="btn btn-outline-primary btnEdit" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Изменить</button> <button class="btn btn-outline-danger btnDelete">Удалить</button>`; 
    localStorage.setItem("formData" + data.Name, JSON.stringify(data));   
    TableIsNull();
};
    
    // selectedRow = td.parentElement.parentElement;
    // selectedRow = $(this).closest("tr");
    // console.log(selectedRow);
    // $("#Name").val(selectedRow.cells[0].innerHTML);
    // $("#Proteins").val(selectedRow.cells[1].innerHTML);
    // $("#Fats").val(selectedRow.cells[2].innerHTML);
    // $("#Сarbohydrates").val(selectedRow.cells[3].innerHTML); 

// function onEdit(td){
//     // selectedRow = td.parentElement.parentElement;
//     // document.getElementById("Name").value = selectedRow.cells[0].innerHTML;
//     // document.getElementById("Proteins").value = selectedRow.cells[1].innerHTML;
//     // document.getElementById("Fats").value = selectedRow.cells[2].innerHTML;
//     // document.getElementById("Сarbohydrates").value = selectedRow.cells[3].innerHTML;
//     selectedRow = td.parentElement.parentElement;
//     $("#Name").val(selectedRow.cells[0].innerHTML);
//     $("#Proteins").val(selectedRow.cells[1].innerHTML);
//     $("#Fats").val(selectedRow.cells[2].innerHTML);
//     $("#Сarbohydrates").val(selectedRow.cells[3].innerHTML);
// }

function Update (formData){
    var a = selectedRow.querySelector("td").innerHTML; //?
    localStorage.removeItem("formData" + a);
    selectedRow.cells[0].innerHTML = formData.Name;
    selectedRow.cells[1].innerHTML = formData.Proteins;
    selectedRow.cells[2].innerHTML = formData.Fats;
    selectedRow.cells[3].innerHTML = formData.Сarbohydrates;
    localStorage.setItem("formData" + formData.Name, JSON.stringify(formData));
};

// function Delete(td){
//     row = td.parentElement.parentElement;
//     document.querySelector("#products-list").deleteRow(row.rowIndex); //?
//     var a = row.querySelector("td").innerHTML;
//     localStorage.removeItem("formData"+a);
// }

function Reset(){
    // document.getElementById("Name").value = "";
    // document.getElementById("Proteins").value = "";
    // document.getElementById("Fats").value = "";
    // document.getElementById("Сarbohydrates").value = "";

    $("#Name").val("");
    $("#Proteins").val("");
    $("#Fats").val("");
    $("#Сarbohydrates").val("");
};

function TableIsNull (){
    var table = $("tbody")[0];
    if(table.firstElementChild === null)
    {  
        var newRow = table.insertRow(table.lenght);
        var cell1 = newRow.insertCell(0);
            cell1.colSpan = 5;
            cell1.innerHTML = "В таблице нету продуктов";
    }else{
        if(table.firstElementChild.innerText === "В таблице нету продуктов" ){
            table.firstElementChild.remove();
        }
    }
};

function isInValid(input){
    $(input).addClass("is-invalid");
}

function isValid(){
    $("#Name").removeClass("is-invalid");
    $("#Proteins").removeClass("is-invalid");
    $("#Fats").removeClass("is-invalid");
    $("#Сarbohydrates").removeClass("is-invalid");
};

function modalTitleValueChange(data, productName = ""){
    $("#exampleModalLabel")[0].innerText = data + " Продукта " + productName;
};

function modalButtonValueChange(buttonName){
    $("#submit")[0].value = buttonName;
};

function checkDataForNull (formData){
    var result = false;
    if(!formData.Name){
        isInValid("#Name");
        result = true;
    } 
    if(!formData.Proteins){
        $("#proteinsFeedback")[0].innerText = "Введите данные в поле Белки";
        isInValid("#Proteins");
        result = true;
    } else if(formData.Proteins <= 0 || formData.Proteins > 100){
        $("#proteinsFeedback")[0].innerText = "Число должно находиться в пределах от 1 до 100";
        isInValid("#Proteins");
        result = true;
    } 
    if(!formData.Fats){
        $("#fatsFeedback")[0].innerText = "Введите данные в поле Жиры";
        isInValid("#Fats");
        result = true;
    } else if(formData.Fats <= 0 || formData.Fats > 100){
        $("#fatsFeedback")[0].innerText = "Число должно находиться в пределах от 1 до 100";
        isInValid("#Fats");
        result = true;
    }  
    if(!formData.Сarbohydrates){
        $("#carbohydratesFeedback")[0].innerText = "Введите данные в поле Углеводы";
        isInValid("#Сarbohydrates");
        result = true;
    } else if(formData.Сarbohydrates <= 0 || formData.Сarbohydrates > 100){
        $("#carbohydratesFeedback")[0].innerText = "Число должно находиться в пределах от 1 до 100";
        isInValid("#Сarbohydrates");
        result = true;
    } 
    if(result){
        notyf.error('Введены неверные данные!');
    }
    return result;;
}