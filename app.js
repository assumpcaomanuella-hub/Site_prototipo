if(
localStorage.getItem(
"isLogged"
) !== "true"
){

    window.location.href =
    "login.html";

}

/* ===========================
   TROCA DE ABAS
=========================== */

const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(btn =>
            btn.classList.remove("active")
        );

        pages.forEach(page =>
            page.classList.remove("active-page")
        );

        item.classList.add("active");

        const targetPage =
            document.getElementById(
                item.dataset.page
            );

        targetPage.classList.add(
            "active-page"
        );

    });

});

/* ===========================
   DADOS SIMULADOS
=========================== */

const buyflowData = {

    faturamento: 124500,

    lucro: 107000,

    gastos: 86300,

    produtos: 1

};

function updateTotalProducts(){

    const total =
    document.querySelectorAll(
    "#inventoryBody tr"
    ).length;

    document.getElementById(
    "totalProdutos"
    ).textContent = total;

}

function showToast(message){

    const toast =
    document.getElementById(
    "toast"
    );

    toast.textContent =
    message;

    toast.style.opacity = "1";

    setTimeout(() => {

        toast.style.opacity = "0";

    },3000);

}

/* ===========================
   ANIMAÇÃO DOS KPIs
=========================== */

function animateValue(element, start, end, duration){

    let startTime = null;

    function animation(currentTime){

        if(!startTime)
            startTime = currentTime;

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );

        const value =
            Math.floor(
                progress *
                (end - start) +
                start
            );

        element.textContent =
            value.toLocaleString(
                "pt-BR"
            );

        if(progress < 1)
            requestAnimationFrame(animation);

    }

    requestAnimationFrame(animation);

}

window.addEventListener("load", () => {

    const cards =
        document.querySelectorAll(".card p");

    animateValue(
        cards[0],
        0,
        buyflowData.faturamento,
        1500
    );

    animateValue(
        cards[1],
        0,
        buyflowData.lucro,
        1500
    );

    animateValue(
        cards[2],
        0,
        buyflowData.gastos,
        1500
    );

    animateValue(
        cards[3],
        0,
        buyflowData.produtos,
        1500
    );

});

/* ===========================
   CHART VENDAS
=========================== */

const salesCtx =
document.getElementById(
    "salesChart"
);

if(salesCtx){

new Chart(salesCtx, {

    type:"line",

    data:{

        labels:[
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun"
        ],

        datasets:[{

            label:"Vendas",

            data:[
                15000,
                22000,
                28000,
                25000,
                32000,
                40000
            ],

            borderColor:"#079abc",

            backgroundColor:
            "rgba(7,154,188,0.2)",

            tension:0.4,

            fill:true

        }]

    },

    options:{
        responsive:true
    }

});

}



const lucroGastos =
document.getElementById(
"lucroGastosChart"
);

if(lucroGastos){

new Chart(lucroGastos,{

type:"bar",

data:{

labels:[
"Jan",
"Fev",
"Mar",
"Abr",
"Mai",
"Jun"
],

datasets:[

{
label:"Lucro",

data:[
12000,
15000,
18000,
17000,
21000,
24000
],

backgroundColor:"#83c343"
},

{
label:"Gastos",

data:[
8000,
10000,
12000,
13000,
11000,
14000
],

backgroundColor:"#079abc"
}

]

}

});

}

/* ===========================
   CHART LUCRO
=========================== */

const profitCtx =
document.getElementById(
    "profitChart"
);

if(profitCtx){

new Chart(profitCtx, {

    type:"bar",

    data:{

        labels:[
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun"
        ],

        datasets:[{

            label:"Lucro",

            data:[
            12000,
            15000,
            18000,
            17000,
            21000,
            24000
            ],

            backgroundColor:"#83c343"

        }]

    },

    options:{
        responsive:true
    }

});

}

/* =========================================
   NOVOS GRÁFICOS DA ABA RELATÓRIOS (BuyFlow)
   ========================================= */

// 1. Gráfico Principal: Produtos Mais Vendidos
const managerCtx = document.getElementById('managerChart');
if(managerCtx){
    new Chart(managerCtx, {
        type: 'bar',
        data: {
            labels: ['Camiseta Básica', 'Camiseta Oversized', 'Calça Jeans Slim', 'Jaqueta Jeans', 'Boné Casual'],
            datasets: [{
                label: 'Vendas',
                data: [350, 280, 210, 180, 120],
                backgroundColor: '#5dade2'
            }]
        },
        options: {
            indexAxis: 'y', 
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 30 // Aumente esse número para o gráfico diminuir e sobrar mais borda
            },
            plugins: { legend: { display: false } },
            scales: { 
                x: { grid: {color: '#1e2f73'}, ticks: {color: '#fff'} },
                y: { ticks: {color: '#fff'} }
            }
        }
    });
}

// 2. Gráfico de Rosca: Distribuição do Estoque (%)
const planCtx = document.getElementById('planChart');
if(planCtx){
    new Chart(planCtx, {
        type: 'doughnut',
        data: {
            labels: ['Camisetas', 'Calças', 'Jaquetas', 'Acessórios'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: ['#5dade2', '#83c343', '#f1c40f', '#a569bd']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 30 // Aumente esse número para o gráfico diminuir e sobrar mais borda
            },
            plugins: { legend: { position: 'bottom', labels: { color: '#fff', font: {size: 10} } } }
        }
    });
}

// 3. Gráfico Inferior Direito: Problemas de Estoque
const churnReasonCtx = document.getElementById('churnReasonChart');
if(churnReasonCtx){
    new Chart(churnReasonCtx, {
        type: 'bar',
        data: {
            labels: ['Estoque Baixo', 'Produto Parado', 'Produto Esgotado', 'Fornecedor Atrasado', 'Devoluções'],
            datasets: [{
                data: [12, 8, 5, 3, 7],
                backgroundColor: '#a569bd'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 30 // Aumente esse número para o gráfico diminuir e sobrar mais borda
            },
            plugins: { legend: { display: false } },
            scales: { 
                x: { grid: {color: '#1e2f73'}, ticks: {color: '#fff'} },
                y: { ticks: {color: '#fff'} }
            }
        }
    });
}

/* ===========================
   PESQUISA INVENTÁRIO
=========================== */

const inventorySearch =
document.querySelector(
".inventory-tools input"
);

if(inventorySearch){

inventorySearch.addEventListener(
"keyup",

() => {

    const search =
    inventorySearch.value
    .toLowerCase();

    const rows =
    document.querySelectorAll(
    "#inventario tbody tr"
    );

    rows.forEach(row => {

        const text =
        row.textContent
        .toLowerCase();

        row.style.display =
        text.includes(search)
        ? ""
        : "none";

    });

});

}


/* ===========================
   ALERTA DE ESTOQUE
=========================== */

function checkStock(){

    const rows =
    document.querySelectorAll(
    "#inventario tbody tr"
    );

    rows.forEach(row => {

        const estoque =
        parseInt(
        row.children[4]
        .textContent
        );

        const statusCell =
        row.children[5];

        if(estoque <= 10){

            statusCell.textContent =
            "Crítico";

            statusCell.style.color =
            "#ff3b30";

        }

        else if(estoque <= 20){

            statusCell.textContent =
            "Baixo";

            statusCell.style.color =
            "#ff9500";

        }

        else{

            statusCell.textContent =
            "OK";

            statusCell.style.color =
            "#34c759";

        }

    });

}

checkStock();

/* ===========================
   NOTIFICAÇÕES BUYFLOW
=========================== */

const notifications = [

"⚠️ Camiseta Básica precisa de reposição.",

"📈 Lucro aumentou 12% este mês.",

"🚚 Fornecedor Fashion Supply entregará amanhã.",

"🔥 Produto Oversized está em alta demanda."

];

function showNotification(){

    const random =
    notifications[
    Math.floor(
    Math.random() *
    notifications.length
    )
    ];

    showToast(random);

}

setInterval(
showNotification,
10000
);

/* ===========================
   FILTROS RELATÓRIOS
=========================== */

const filterButtons =
document.querySelectorAll(
".filters button"
);

filterButtons.forEach(button => {

button.addEventListener(
"click",

() => {

    filterButtons.forEach(btn =>
        btn.style.background =
        "#079abc"
    );

    button.style.background =
    "#83c343";

});

});

/* ===========================
   BOTÃO NOVO PRODUTO
=========================== */

const addProductButton =
document.querySelector(
".inventory-tools button"
);

const modal =
document.getElementById(
"productModal"
);

const closeModal =
document.getElementById(
"closeModal"
);

closeModal.addEventListener(
"click",

() => {

    modal.style.display =
    "none";

});

addProductButton
.addEventListener(
"click",

()=>{

modal.style.display =
"flex";

});

/* ===========================
   ALERTA DE BOAS VINDAS
=========================== */

window.addEventListener(
"load",

() => {

setTimeout(() => {

    showToast(
    "Bem-vindo ao BuyFlow 🚀"
    );

},1000);

});


const saveProduct =
document.getElementById(
"saveProduct"
);

let editingRow = null;

if(saveProduct){

    saveProduct.addEventListener(
    "click",

    () => {

        const nome =
        document.getElementById(
        "productName"
        ).value;

        const categoria =
        document.getElementById(
        "productCategory"
        ).value;

        const preco =
        document.getElementById(
        "productPrice"
        ).value;

        const estoque =
        document.getElementById(
        "productStock"
        ).value;

        if(
            !nome ||
            !categoria ||
            !preco ||
            !estoque
        ){
            showToast(
            "Preencha todos os campos."
            );
            return;
        }

        /* ===================
           EDITAR PRODUTO
        =================== */

        if(editingRow){

            editingRow.children[1].textContent =
            nome;

            editingRow.children[2].textContent =
            categoria;

            editingRow.children[3].textContent =
            `R$ ${preco}`;

            editingRow.children[4].textContent =
            estoque;

            checkStock();

            editingRow = null;

            modal.style.display =
            "none";

            showToast(
            "Produto atualizado!"
            );

            return;
        }

        let status = "OK";

        if(estoque <= 10){
            status = "Crítico";
        }
        else if(estoque <= 20){
            status = "Baixo";
        }


        const table =
        document.getElementById(
        "inventoryBody"
        );

        const row =
        document.createElement("tr");

        const id =
        document.querySelectorAll(
        "#inventoryBody tr"
        ).length + 1;

        row.innerHTML = `
        <td>${String(id).padStart(3,"0")}</td>
        <td>${nome}</td>
        <td>${categoria}</td>
        <td>R$ ${preco}</td>
        <td>${estoque}</td>
        <td>${status}</td>

        <td>

        <button class="edit-btn">
        ✏️
        </button>

        <button class="delete-btn">
        🗑️
        </button>

        </td>
        `;

        table.appendChild(row);

        updateTotalProducts();
        checkStock();

        showToast(
        "Produto cadastrado com sucesso!"
        );

        row.querySelector(
        ".edit-btn"
        ).addEventListener(
        "click",

        () => {

            editingRow = row;

            const cells =
            row.querySelectorAll("td");

            document.getElementById(
            "productName"
            ).value = cells[1].textContent;

            document.getElementById(
            "productCategory"
            ).value = cells[2].textContent;

            document.getElementById(
            "productPrice"
            ).value =
            cells[3].textContent
            .replace("R$ ","");

            document.getElementById(
            "productStock"
            ).value = cells[4].textContent;

            modal.style.display =
            "flex";

        });

        document
.querySelectorAll(".edit-btn")
.forEach(button => {

    button.addEventListener(
    "click",

    () => {

        editingRow =
        button.closest("tr");

        const cells =
        editingRow.querySelectorAll("td");

        document.getElementById(
        "productName"
        ).value = cells[1].textContent;

        document.getElementById(
        "productCategory"
        ).value = cells[2].textContent;

        document.getElementById(
        "productPrice"
        ).value =
        cells[3].textContent
        .replace("R$ ","");

        document.getElementById(
        "productStock"
        ).value =
        cells[4].textContent;

        modal.style.display =
        "flex";

    });

});

        row.querySelector(
        ".delete-btn"
        ).addEventListener(
        "click",

        () => {

            row.remove();
            updateTotalProducts();
            showToast(
            "Produto removido."
            );

        });


        modal.style.display =
        "none";

        document.getElementById(
        "productName"
        ).value = "";

        document.getElementById(
        "productCategory"
        ).value = "";

        document.getElementById(
        "productPrice"
        ).value = "";

        document.getElementById(
        "productStock"
        ).value = "";

    });

}

document
.querySelectorAll(".delete-btn")
.forEach(button => {

    button.addEventListener(
    "click",

    () => {

        button.closest("tr").remove();
        updateTotalProducts();

        showToast(
        "Produto removido."
        );

    });

});

window.addEventListener(
"click",

(event) => {

    if(event.target === modal){

        modal.style.display =
        "none";

    }

});

updateTotalProducts();

document.addEventListener(
"keydown",

(event) => {

    if(
        event.key === "Escape"
    ){

        modal.style.display =
        "none";

    }

});

const logoutBtn =
document.getElementById(
"logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
    "click",

    () => {

        localStorage.removeItem(
        "isLogged"
        );

        window.location.href =
        "login.html";

    });

}