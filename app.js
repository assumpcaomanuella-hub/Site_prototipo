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

    faturamento: 128475,

    lucro: 107000,

    gastos: 86300,

    produtos: 8

};

function updateTotalProducts(){

    const total =
    document.querySelectorAll(
    "#inventoryBody tr"
    ).length;

    const totalElement =
    document.getElementById(
    "totalProdutos"
    );

    if(totalElement){
        totalElement.textContent = total;
    }

    if(typeof updateReportDashboard === "function"){
        updateReportDashboard();
    }

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

    const totalProducts =
    document.getElementById(
    "dashboardTotalProducts"
    );

    if(totalProducts){
        totalProducts.textContent =
        "1.248";
    }

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
            "Jun",
            "Jul"
        ],

        datasets:[
        {

            label:"Quant. Atual de Estoque",

            data:[
                33,
                30,
                40,
                41,
                44,
                47,
                51
            ],

            borderColor:"#0b77ff",

            backgroundColor:
            "rgba(11,119,255,0.08)",

            tension:0.4,

            fill:true

        },
        {

            label:"Estoque Ideal",

            data:[
                16,
                14,
                20,
                21,
                23,
                25,
                27
            ],

            borderColor:"#10b981",

            backgroundColor:
            "rgba(16,185,129,0.08)",

            tension:0.4,

            fill:false

        }
        ]

    },

    options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                position:"top"
            }
        },
        scales:{
            y:{
                beginAtZero:true,
                max:60
            }
        }
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

/* ===========================
   CHART RELATÓRIOS
=========================== */

const reportCtx =
document.getElementById(
    "categoryChart"
);

if(reportCtx){

new Chart(reportCtx, {

    type:"doughnut",

    data:{

        labels:[
            "Jaquetas",
            "Camisetas Polo",
            "Calças Jeans",
            "Camisas Sociais",
            "Bermudas"
        ],

        datasets:[{

            data:[
                30,
                25,
                20,
                15,
                10
            ],

            backgroundColor:[
                "#83c343",
                "#079abc",
                "#1e2f73",
                "#0b77ff",
                "#9333ea"
            ]

        }]

    },

    options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                position:"bottom"
            }
        },
        cutout:"62%"
    }

});

}

const reportPageCtx =
document.getElementById(
    "bestSellersChart"
);

if(reportPageCtx){

    var bestSellersChart =
    new Chart(reportPageCtx, {

        type:"bar",

        data:{
            labels:[],
            datasets:[
            {
                label:"Produtos vendidos",
                data:[],
                backgroundColor:"#0b77ff"
            },
            {
                label:"Faturamento",
                data:[],
                backgroundColor:"#83c343",
                xAxisID:"xRevenue"
            },
            {
                label:"Estoque baixo",
                data:[],
                backgroundColor:"#9333ea"
            }
            ]
        },

        options:{
            indexAxis:"y",
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    position:"top"
                },
                tooltip:{
                    callbacks:{
                        label(context){
                            if(context.dataset.label === "Faturamento"){
                                return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                            }

                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales:{
                x:{
                    beginAtZero:true,
                    position:"bottom",
                    title:{
                        display:true,
                        text:"Quantidade"
                    }
                },
                xRevenue:{
                    beginAtZero:true,
                    position:"top",
                    grid:{
                        drawOnChartArea:false
                    },
                    ticks:{
                        callback(value){
                            return formatCurrency(value);
                        }
                    },
                    title:{
                        display:true,
                        text:"Faturamento"
                    }
                }
            }
        }

    });

}

const stockDistributionCtx =
document.getElementById(
    "stockDistributionChart"
);

if(stockDistributionCtx){

    var stockDistributionChart =
    new Chart(stockDistributionCtx, {

        type:"doughnut",

        data:{
            labels:[],
            datasets:[{
                data:[],
                backgroundColor:[
                    "#83c343",
                    "#079abc",
                    "#1e2f73",
                    "#0b77ff",
                    "#9333ea",
                    "#f59e0b",
                    "#ef4444"
                ]
            }]
        },

        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    position:"bottom"
                },
                tooltip:{
                    callbacks:{
                        label(context){
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            },
            cutout:"62%"
        }

    });

}

const reportMonthData = {
    1:{
        sold:92,
        orders:41,
        costs:13800,
        productSales:[18,14,9,12,21,11,7,16],
        productLowStock:[4,6,8,5,3,7,9,4]
    },
    2:{
        sold:116,
        orders:52,
        costs:15200,
        productSales:[22,18,11,15,24,14,9,20],
        productLowStock:[3,5,7,6,2,6,8,5]
    },
    3:{
        sold:134,
        orders:58,
        costs:16900,
        productSales:[25,21,13,17,27,16,11,23],
        productLowStock:[5,4,9,5,3,7,10,4]
    },
    4:{
        sold:121,
        orders:55,
        costs:16100,
        productSales:[23,19,12,16,25,15,10,21],
        productLowStock:[4,6,8,7,3,6,9,5]
    },
    5:{
        sold:148,
        orders:64,
        costs:18400,
        productSales:[28,23,15,19,31,17,12,26],
        productLowStock:[3,5,7,5,2,8,10,4]
    },
    6:{
        sold:173,
        orders:72,
        costs:20300,
        productSales:[33,27,18,22,36,20,14,30],
        productLowStock:[2,4,6,5,3,7,9,4]
    }
};

let selectedReportMonth = 1;

function formatCurrency(value){

    return value.toLocaleString(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    );

}

function parseCurrency(value){

    return Number(
        String(value)
        .replace(/[^\d,.-]/g,"")
        .replace(".","")
        .replace(",",".")
    ) || 0;

}

function getReportProducts(){

    return [
        ...document.querySelectorAll("#inventoryBody tr")
    ].map(row => {

        const cells = [
            ...row.querySelectorAll("td")
        ];

        const compactRow = cells.length < 8;
        const nameIndex = compactRow ? 1 : 0;
        const categoryIndex = compactRow ? 2 : 4;
        const priceIndex = compactRow ? 3 : 5;
        const stockIndex = compactRow ? 4 : null;

        const name =
        cells[nameIndex]?.textContent
        .replace("▣","")
        .trim() || "Produto";

        const category =
        cells[categoryIndex]?.textContent
        .trim() || "Sem categoria";

        const price =
        parseCurrency(
            cells[priceIndex]?.textContent || "0"
        );

        const stock =
        Number(row.dataset.stock || cells[stockIndex]?.textContent || 0);

        return {
            name,
            category,
            price,
            stock
        };

    });

}

function buildReportSnapshot(month){

    const products =
    getReportProducts();

    const monthData =
    reportMonthData[month] ||
    reportMonthData[1];

    const stockTotal =
    products.reduce(
        (total, product) => total + product.stock,
        0
    );

    const averagePrice =
    products.length
    ? products.reduce(
        (total, product) => total + product.price,
        0
    ) / products.length
    : 0;

    const monthFactor =
    0.82 + month * 0.08;

    const revenue =
    Math.round(
        monthData.sold *
        averagePrice *
        monthFactor
    );

    const costs =
    monthData.costs;

    const netProfit =
    revenue - costs;

    const lowStock =
    products.filter(product =>
        product.stock > 0 &&
        product.stock <= 20
    ).length;

    const stockout =
    products.filter(product =>
        product.stock <= 0
    ).length;

    const soldByProduct =
    products.map((product,index) => {

        return {
            ...product,
            sold:monthData.productSales[index] ||
            Math.max(6, 10 + month + index),
            lowStockAmount:monthData.productLowStock[index] ||
            Math.max(2, 4 + ((month + index) % 5))
        };

    })
    .sort((a,b) => b.sold - a.sold)
    .slice(0,5);

    const categoryTotals =
    products.reduce((totals, product) => {

        totals[product.category] =
        (totals[product.category] || 0) +
        product.stock;

        return totals;

    },{});

    const categoryPercentages =
    Object.entries(categoryTotals)
    .map(([category,total]) => ({
        category,
        percent:stockTotal
        ? (total / stockTotal) * 100
        : 0
    }));

    return {
        products,
        monthData,
        revenue,
        costs,
        netProfit,
        lowStock,
        stockTotal,
        stockoutRate:products.length
        ? (stockout / products.length) * 100
        : 0,
        profitMargin:revenue
        ? (netProfit / revenue) * 100
        : 0,
        soldByProduct,
        categoryPercentages
    };

}

function setReportValue(id,value){

    const element =
    document.getElementById(id);

    if(element)
        element.textContent = value;

}

function updateReportDashboard(){

    const snapshot =
    buildReportSnapshot(selectedReportMonth);

    setReportValue(
        "reportSoldProducts",
        snapshot.monthData.sold.toLocaleString("pt-BR")
    );

    setReportValue(
        "reportRevenue",
        formatCurrency(snapshot.revenue)
    );

    setReportValue(
        "reportOrders",
        snapshot.monthData.orders.toLocaleString("pt-BR")
    );

    setReportValue(
        "reportAverageTicket",
        formatCurrency(
            snapshot.monthData.orders
            ? snapshot.revenue / snapshot.monthData.orders
            : 0
        )
    );

    setReportValue(
        "reportLowStock",
        snapshot.lowStock.toLocaleString("pt-BR")
    );

    setReportValue(
        "reportCosts",
        formatCurrency(snapshot.costs)
    );

    setReportValue(
        "reportStockoutRate",
        `${snapshot.stockoutRate.toFixed(1).replace(".",",")}%`
    );

    setReportValue(
        "reportProfitMargin",
        `${snapshot.profitMargin.toFixed(1).replace(".",",")}%`
    );

    setReportValue(
        "reportStockProducts",
        snapshot.stockTotal.toLocaleString("pt-BR")
    );

    setReportValue(
        "reportNetProfit",
        formatCurrency(snapshot.netProfit)
    );

    if(typeof bestSellersChart !== "undefined"){

        bestSellersChart.data.labels =
        snapshot.soldByProduct.map(product => product.name);

        bestSellersChart.data.datasets[0].data =
        snapshot.soldByProduct.map(product => product.sold);

        bestSellersChart.data.datasets[1].data =
        snapshot.soldByProduct.map(product =>
            Math.round(product.sold * product.price)
        );

        bestSellersChart.data.datasets[2].data =
        snapshot.soldByProduct.map(product =>
            product.lowStockAmount
        );

        bestSellersChart.update();

    }

    if(typeof stockDistributionChart !== "undefined"){

        stockDistributionChart.data.labels =
        snapshot.categoryPercentages.map(item => item.category);

        stockDistributionChart.data.datasets[0].data =
        snapshot.categoryPercentages.map(item => item.percent);

        stockDistributionChart.update();

    }

}

document
.querySelectorAll("[data-report-month]")
.forEach(button => {

    button.addEventListener("click", () => {

        document
        .querySelectorAll("[data-report-month]")
        .forEach(monthButton =>
            monthButton.classList.remove("active")
        );

        button.classList.add("active");

        selectedReportMonth =
        Number(button.dataset.reportMonth);

        updateReportDashboard();

    });

});

updateReportDashboard();

/* ===========================
   PESQUISA INVENTÁRIO
=========================== */

const inventorySearch =
document.getElementById(
"searchProduct"
);

const inventoryBody =
document.getElementById(
"inventoryBody"
);

const emptyProducts =
document.getElementById(
"emptyProducts"
);

function getInventoryRows(){

    if(!inventoryBody)
        return [];

    return [
        ...inventoryBody.querySelectorAll("tr")
    ];

}

function updateInventoryStats(){

    const rows =
    getInventoryRows();

    const active =
    rows.filter(row =>
        row.querySelector(".inventory-status")
        ?.textContent.trim() === "Ativo"
    ).length;

    const inactive =
    rows.filter(row =>
        row.querySelector(".inventory-status")
        ?.textContent.trim() === "Inativo"
    ).length;

    const out =
    rows.filter(row =>
        Number(row.dataset.stock || 0) <= 0
    ).length;

    const totalElement =
    document.getElementById("inventoryTotal");

    if(totalElement)
        totalElement.textContent = rows.length;

    const activeElement =
    document.getElementById("inventoryActive");

    if(activeElement)
        activeElement.textContent = active;

    const inactiveElement =
    document.getElementById("inventoryInactive");

    if(inactiveElement)
        inactiveElement.textContent = inactive;

    const outElement =
    document.getElementById("inventoryOut");

    if(outElement)
        outElement.textContent = out;

}

function filterInventory(){

    if(!inventorySearch)
        return;

    const search =
    inventorySearch.value
    .trim()
    .toLowerCase();

    let visibleRows = 0;

    getInventoryRows()
    .forEach(row => {

        const shouldShow =
        row.textContent
        .toLowerCase()
        .includes(search);

        row.style.display =
        shouldShow
        ? ""
        : "none";

        if(shouldShow)
            visibleRows++;

    });

    if(emptyProducts){

        emptyProducts.style.display =
        visibleRows
        ? "none"
        : "block";

    }

}

if(inventorySearch){

    inventorySearch.addEventListener(
    "input",
    filterInventory
    );

}

/* ===========================
   ALERTA DE ESTOQUE
=========================== */

function checkStock(){

    getInventoryRows()
    .forEach(row => {

        const status =
        row.querySelector(
        ".inventory-status"
        );

        if(!status)
            return;

        const stock =
        Number(row.dataset.stock || 0);

        if(stock <= 0){
            status.textContent = "Inativo";
            status.className = "inventory-status inactive";
        }
        else{
            status.textContent = "Ativo";
            status.className = "inventory-status active";
        }

    });

    updateInventoryStats();
    filterInventory();

}

checkStock();

/* ===========================
   NOTIFICAÇÕES BUYFLOW
=========================== */

const notifications = [

"⚠️ Camiseta Polo Piquet precisa de reposição.",

"📈 Lucro aumentou 12% este mês.",

"🚚 Fornecedor Casa Prado entregará amanhã.",

"🔥 Jaqueta Bomber Masculina está em alta demanda."

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
document.getElementById(
"addProductButton"
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

        row.dataset.stock = estoque;

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

/* ===========================
   CONFIGURAÇÕES
=========================== */

const settingToggles =
document.querySelectorAll(
"#configuracoes .toggle"
);

settingToggles.forEach(toggle => {

    toggle.addEventListener(
    "click",

    () => {

        toggle.classList.toggle("active");

        toggle.setAttribute(
        "aria-pressed",
        toggle.classList.contains("active")
        ? "true"
        : "false"
        );

    });

});

const addEmailBtn =
document.getElementById(
"addEmailBtn"
);

const notificationEmail =
document.getElementById(
"notificationEmail"
);

const emailList =
document.getElementById(
"emailList"
);

function removeEmail(button){

    button.closest(".email-chip")
    .remove();

    showToast(
    "E-mail removido."
    );

}

if(emailList){

    emailList
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
        "click",
        () => removeEmail(button)
        );

    });

}

if(addEmailBtn){

    addEmailBtn.addEventListener(
    "click",

    () => {

        const email =
        notificationEmail.value.trim();

        if(
            !email ||
            !email.includes("@")
        ){
            showToast(
            "Informe um e-mail válido."
            );
            return;
        }

        const chip =
        document.createElement("div");

        chip.className =
        "email-chip";

        chip.innerHTML = `
        ${email}
        <button type="button" aria-label="Remover e-mail">×</button>
        `;

        chip.querySelector("button")
        .addEventListener(
        "click",
        event => removeEmail(event.target)
        );

        emailList.appendChild(chip);

        notificationEmail.value =
        "";

        showToast(
        "E-mail adicionado."
        );

    });

}

const togglePassword =
document.getElementById(
"togglePassword"
);

const userPassword =
document.getElementById(
"userPassword"
);

if(togglePassword){

    togglePassword.addEventListener(
    "click",

    () => {

        const isPassword =
        userPassword.type === "password";

        userPassword.type =
        isPassword
        ? "text"
        : "password";

        togglePassword.textContent =
        isPassword
        ? "🙈"
        : "👁";

    });

}

const backupNow =
document.getElementById(
"backupNow"
);

if(backupNow){

    backupNow.addEventListener(
    "click",

    () => {

        const now =
        new Date();

        document.getElementById(
        "lastBackup"
        ).textContent =
        now.toLocaleDateString("pt-BR") +
        " " +
        now.toLocaleTimeString(
        "pt-BR",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
        );

        showToast(
        "Backup realizado com sucesso."
        );

    });

}

const saveSettings =
document.getElementById(
"saveSettings"
);

if(saveSettings){

    saveSettings.addEventListener(
    "click",

    () => {

        const firstName =
        document.getElementById(
        "firstName"
        ).value.trim();

        const lastName =
        document.getElementById(
        "lastName"
        ).value.trim();

        const fullName =
        `${firstName} ${lastName}`.trim() ||
        "Manuella Pedrotti";

        const companyName =
        document.getElementById(
        "companyName"
        );

        companyName.value =
        companyName.value.trim() ||
        fullName;

        const profileName =
        document.querySelector(
        ".profile-name"
        );

        const profileEmail =
        document.querySelector(
        ".profile-email"
        );

        const userEmailInput =
        document.getElementById(
        "userEmail"
        );

        profileName.textContent =
        fullName;

        profileEmail.textContent =
        userEmailInput.value;

        document.querySelector(
        ".user-area span"
        ).textContent =
        `Olá, gestora ${firstName || "Manuella"}`;

        showToast(
        "Configurações salvas."
        );

    });

}

const changePhotoBtn =
document.getElementById(
"changePhotoBtn"
);

if(changePhotoBtn){

    changePhotoBtn.addEventListener(
    "click",

    () => {

        showToast(
        "Foto de perfil pronta para atualização."
        );

    });

}

/* ===========================
   FORNECEDORES
=========================== */

const suppliersBody =
document.getElementById(
"suppliersBody"
);

const supplierSearch =
document.getElementById(
"supplierSearch"
);

const emptySuppliers =
document.getElementById(
"emptySuppliers"
);

function escapeHTML(value){

    return value
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

}

function updateSupplierStats(){

    if(!suppliersBody)
        return;

    const rows =
    [...suppliersBody.querySelectorAll("tr")];

    const active =
    rows.filter(row =>
        row.querySelector(".status-pill")
        .textContent.trim() === "Ativo"
    ).length;

    const inactive =
    rows.filter(row =>
        row.querySelector(".status-pill")
        .textContent.trim() === "Inativo"
    ).length;

    const pending =
    rows.filter(row =>
        row.querySelector(".status-pill")
        .textContent.trim() === "Pendente"
    ).length;

    document.getElementById(
    "supplierTotal"
    ).textContent = rows.length;

    document.getElementById(
    "supplierActive"
    ).textContent = active;

    document.getElementById(
    "supplierInactive"
    ).textContent = inactive;

    document.getElementById(
    "supplierPending"
    ).textContent = pending;

}

function filterSuppliers(){

    if(!supplierSearch || !suppliersBody)
        return;

    const search =
    supplierSearch.value
    .trim()
    .toLowerCase();

    let visibleRows = 0;

    suppliersBody
    .querySelectorAll("tr")
    .forEach(row => {

        const shouldShow =
        row.textContent
        .toLowerCase()
        .includes(search);

        row.style.display =
        shouldShow
        ? ""
        : "none";

        if(shouldShow)
            visibleRows++;

    });

    emptySuppliers.style.display =
    visibleRows
    ? "none"
    : "block";

}

function bindSupplierRow(row){

    const editButton =
    row.querySelector(".supplier-edit");

    const deleteButton =
    row.querySelector(".supplier-delete");

    editButton.addEventListener(
    "click",

    () => {

        const nameElement =
        row.querySelector(".supplier-company strong");

        const contactCell =
        row.children[1];

        const emailCell =
        row.children[2];

        const newName =
        prompt(
        "Nome do fornecedor:",
        nameElement.textContent
        );

        if(newName === null)
            return;

        const newContact =
        prompt(
        "Contato:",
        contactCell.textContent
        );

        if(newContact === null)
            return;

        const newEmail =
        prompt(
        "E-mail:",
        emailCell.textContent
        );

        if(newEmail === null)
            return;

        nameElement.textContent =
        newName.trim() || "Casa Prado";

        contactCell.textContent =
        newContact.trim() || "Rafael Lima";

        emailCell.textContent =
        newEmail.trim() ||
        "rafael.lima@casaprado.com.br";

        filterSuppliers();

        showToast(
        "Fornecedor atualizado."
        );

    });

    deleteButton.addEventListener(
    "click",

    () => {

        if(
            !confirm(
            "Excluir este fornecedor?"
            )
        ){
            return;
        }

        row.remove();
        updateSupplierStats();
        filterSuppliers();

        showToast(
        "Fornecedor removido."
        );

    });

}

function addSupplierRow(
name = "Casa Prado",
contact = "Rafael Lima",
email = "rafael.lima@casaprado.com.br",
phone = "+55 (65) 99999-9999",
products = "48",
status = "Ativo"
){

    const row =
    document.createElement("tr");

    const id =
    suppliersBody
    .querySelectorAll("tr").length + 1;

    const statusClass =
    status === "Inativo"
    ? "inactive"
    : status === "Pendente"
    ? "pending"
    : "active";

    row.innerHTML = `
    <td>
        <div class="supplier-company">
            <span class="company-icon">🏬</span>
            <div>
                <strong>${escapeHTML(name)}</strong>
                <small>ID: FOR-${String(id).padStart(3,"0")}</small>
            </div>
        </div>
    </td>
    <td>${escapeHTML(contact)}</td>
    <td>${escapeHTML(email)}</td>
    <td>${escapeHTML(phone)}</td>
    <td>${escapeHTML(products)}</td>
    <td><span class="status-pill ${statusClass}">${escapeHTML(status)}</span></td>
    <td>
        <div class="table-actions">
            <button type="button" class="supplier-edit" title="Editar fornecedor">✎</button>
            <button type="button" class="supplier-delete" title="Excluir fornecedor">🗑</button>
        </div>
    </td>
    `;

    suppliersBody.appendChild(row);
    bindSupplierRow(row);
    updateSupplierStats();
    filterSuppliers();

}

if(supplierSearch){

    supplierSearch.addEventListener(
    "input",
    filterSuppliers
    );

}

if(suppliersBody){

    suppliersBody
    .querySelectorAll("tr")
    .forEach(bindSupplierRow);

    updateSupplierStats();

}

const addSupplier =
document.getElementById(
"addSupplier"
);

if(addSupplier){

    addSupplier.addEventListener(
    "click",

    () => {

        const name =
        prompt(
        "Nome do fornecedor:",
        "Casa Prado"
        );

        if(name === null)
            return;

        const contact =
        prompt(
        "Contato:",
        "Rafael Lima"
        );

        if(contact === null)
            return;

        const email =
        prompt(
        "E-mail:",
        "rafael.lima@casaprado.com.br"
        );

        if(email === null)
            return;

        addSupplierRow(
        name.trim() || "Casa Prado",
        contact.trim() || "Rafael Lima",
        email.trim() ||
        "rafael.lima@casaprado.com.br"
        );

        showToast(
        "Fornecedor adicionado."
        );

    });

}

const exportSupplier =
document.getElementById(
"exportSupplier"
);

if(exportSupplier){

    exportSupplier.addEventListener(
    "click",

    () => {

        const rows =
        [...suppliersBody.querySelectorAll("tr")]
        .map(row => [
            row.querySelector(".supplier-company strong")
            .textContent,
            row.children[1].textContent,
            row.children[2].textContent,
            row.children[3].textContent,
            row.children[4].textContent,
            row.querySelector(".status-pill")
            .textContent
        ]);

        const csv =
        [
            [
                "Empresa",
                "Contato",
                "E-mail",
                "Telefone",
                "Produtos",
                "Status"
            ],
            ...rows
        ]
        .map(line =>
            line
            .map(value => `"${value.replaceAll('"','""')}"`)
            .join(",")
        )
        .join("\n");

        const blob =
        new Blob(
        [csv],
        {
            type:"text/csv;charset=utf-8"
        }
        );

        const link =
        document.createElement("a");

        link.href =
        URL.createObjectURL(blob);

        link.download =
        "fornecedores.csv";

        link.click();

        URL.revokeObjectURL(
        link.href
        );

        showToast(
        "Lista exportada."
        );

    });

}

const importSupplier =
document.getElementById(
"importSupplier"
);

if(importSupplier){

    importSupplier.addEventListener(
    "click",

    () => {

        addSupplierRow();

        showToast(
        "Fornecedor importado como exemplo."
        );

    });

}
