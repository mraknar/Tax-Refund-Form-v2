rowCounter = 0

let total=0;
let totalhealth=0;
let totalfood=0;
let totalclothing=0;
let totalrent=0;
let counter=0;
let counterhealth=0;
let counterfood=0;
let counterclothing=0;
let counterrent=0;

let refund = 0;

let rateHealth = 10;
let rateFood = 1;
let rateClothing = 10;
let rateRent = 20;

let taxHealth = rateHealth/100;
let taxFood = rateFood/100;
let taxClothing = rateClothing/100;
let taxRent = rateRent/100;

let tempRowCounter = 0;

let deletedRows = [];

function append(){
    rowCounter+=1;
    tempRowCounter+=1;

    let table = document.getElementById("datatable");
    let date = document.getElementById("date").value;
    let number = document.getElementById("number").value;
    let who = document.getElementById("who").value;
    let type = document.getElementById("type").value;
    let price = parseFloat(document.getElementById("price").value);

    
    
    if (!isNaN(price) && type.trim() !== "" && number.trim() !== "" && who.trim() !== "" ){
        let template = `<tr background-color=red>
        <td id="date${rowCounter}" >${date}</td>
        <td id="number${rowCounter}" >${number}</td>
        <td id="who${rowCounter}" >${who}</td>
        <td id="type${rowCounter}" > ${type}</td>
        <td id="price${rowCounter}" >${price}</td>
        <td id="delbutton${rowCounter}" ><button class="delbutton" onclick="deleteRow(${rowCounter})"><span class="material-symbols-outlined">
        delete
        </span></button></td>
        </tr>`;
        
        

        table.innerHTML += template;


        total += price;
        counter += 1;

        

        switch (type){
            case "Health":
                counterhealth += 1;
                totalhealth += price;
                refund+=price-(price/(1+taxHealth))
                break;
            case "Food":
                counterfood += 1;
                totalfood += price;
                refund+=price-(price/(1+taxFood))

                break;
            case "Clothing":
                counterclothing += 1;
                totalclothing += price;
                refund+=price-(price/(1+taxClothing))

                break;
            case "Rent":
                counterrent +=1;
                totalrent += price;
                refund+=price-(price/(1+taxRent))

                break;
        }
        
        refund = parseFloat(refund.toFixed(2));

        document.getElementById("countertotal").value = counter;
        document.getElementById("counterhealth").value = counterhealth;
        document.getElementById("counterfood").value = counterfood;
        document.getElementById("counterclothing").value = counterclothing;
        document.getElementById("counterrent").value = counterrent;
        document.getElementById("pricetotal").value = total;
        document.getElementById("healthtotal").value = totalhealth;
        document.getElementById("foodtotal").value = totalfood;
        document.getElementById("clothingtotal").value = totalclothing;
        document.getElementById("renttotal").value = totalrent;
        document.getElementById("refund").value = refund.toFixed(2);

        
        document.getElementById("date").value = "";
        document.getElementById("number").value = "";
        document.getElementById("who").value = "";
        document.getElementById("type").value = "";
        document.getElementById("price").value = "";
    }

    else{
        alert("Please fill out all required fields.")
    }


    return false;
}


function openSettings(){
    let settings = document.getElementById("settingsid");
    settings.classList.add("open-settings")
}

function closeSettings(){
    let settings = document.getElementById("settingsid");
    settings.classList.remove("open-settings")
}


function saveSettings(){
    rateHealth = parseFloat(document.getElementById("healthtax").value);
    rateFood = parseFloat(document.getElementById("foodtax").value);
    rateClothing = parseFloat(document.getElementById("clothingtax").value);
    rateRent = parseFloat(document.getElementById("renttax").value);

    if (!isNaN(rateHealth)){
        taxHealth = parseFloat(rateHealth)/100;
        document.getElementById("healthtax").placeholder = rateHealth;

    }
    if (!isNaN(rateFood)){
        taxFood = parseFloat(rateFood)/100;
        document.getElementById("foodtax").placeholder = rateFood;

    }
    if (!isNaN(rateClothing)){
        taxClothing = parseFloat(rateClothing)/100;
        document.getElementById("clothingtax").placeholder = rateClothing;

    }
    if (!isNaN(rateRent)){
        taxRent = parseFloat(rateRent)/100;
        document.getElementById("renttax").placeholder = rateRent;

    }

    recalculateRefund();

    document.getElementById("healthtax").value = "";
    document.getElementById("foodtax").value = "";
    document.getElementById("clothingtax").value = "";
    document.getElementById("renttax").value = "";

}

function deleteRow(row) {
    let rowElement = document.getElementById("price" + row).parentNode;
    let pricefordelete = parseFloat(document.getElementById("price" + row).innerText);
    let typefordelete = document.getElementById("type" + row).innerText;
    rowElement.remove();

    rowCounter--;

    total -= pricefordelete;
    document.getElementById("pricetotal").value = total;

    counter -= 1;
    document.getElementById("countertotal").value = counter;

    deletedRows.push(row);

    
    switch (typefordelete) {
      case "Health":
        counterhealth -= 1;
        document.getElementById("counterhealth").value = counterhealth;
        totalhealth -= pricefordelete;
        document.getElementById("healthtotal").value = totalhealth;
        break;
      case "Food":
        counterfood -= 1;
        document.getElementById("counterfood").value = counterfood;
        totalfood -= pricefordelete;
        document.getElementById("foodtotal").value = totalfood;
        break;
      case "Clothing":
        counterclothing -= 1;
        document.getElementById("counterclothing").value = counterclothing;
        totalclothing -= pricefordelete;
        document.getElementById("clothingtotal").value = totalclothing;
        break;
      case "Rent":
        counterrent -= 1;
        document.getElementById("counterrent").value = counterrent;
        totalrent -= pricefordelete;
        document.getElementById("renttotal").value = totalrent;
        break;
    }
    
    recalculateRefund()
  
  
  }

  function recalculateRefund(){
    refund = 0;
    for (let i = 1; i <= tempRowCounter; i++) {

        if(!deletedRows.includes(i)){
            let tempprice = parseFloat(document.getElementById("price" + i).innerText);
            let temptype = document.getElementById("type" + i).innerText;
            switch (temptype) {
                case "Health":
                    refund += tempprice - (tempprice / (1 + taxHealth));

                    break;
                case "Food":
                    refund += tempprice - (tempprice / (1 + taxFood));
                    break;
                case "Clothing":
                    refund += tempprice - (tempprice / (1 + taxClothing));
                    break;
                case "Rent":
                    refund += tempprice - (tempprice / (1 + taxRent));
                    break;
            }
        }
    }
    document.getElementById("refund").value = refund.toFixed(2);
}





