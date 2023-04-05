const xhr = (url, method = `GET`) =>
    new Promise((resolve) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if(this.readyState === 4 && this.status === 200)
            {
                displayData(this.responseXML);

                // console.log(this.responseXML.getElementsByTagName(`customer`));
            }
        };
        xhttp.open(method,url);
        xhttp.send();
    });

function stringToNode(html)
{
    const template = document.createElement(`template`);
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}
function createCustomer(cust)
{
    const content = 
    `
        
        <li>
            <article>
                
                <p>Customer ID: ${cust.custID}</p>
                <p>${cust.title} ${cust.name}</p>
                <p>Address : ${cust.address}</p>
                <p>Phone : ${cust.phone}</p>
                <p>Customer ID: ${cust.email}</p>
                <div>
                    <table border=1>
                        <tr>
                            <th colspan="5">
                                <h3 style="text-align:center">Orders</h3>
                            </tr>
                        </tr>
                        <tr>
                            <th>Order ID:</th>
                            <th>Order By:</th>
                            <th>Order Date:</th>
                            <th>Item Price:</th>
                            <th>Item Qty:</th>
                        </tr>
                        <tr>
                            <td>${cust.orderID}</td>
                            <td>${cust.orderBy}</td>
                            <td>${cust.orderDate}</td>
                            <td>${cust.itemPrice}</td>
                            <td>${cust.itemQty}</td>
                        </tr>
                    </table>
                </div>
                <hr/>
            </article>    
        </li>
    
    `;
    return stringToNode(content);
}


function parseCustomer(xml)
{
    console.log(xml.getElementsByTagName(`customer`)[1]);
    const custID = xml.attributes[0].nodeValue;  //have to ask in class
    const title = xml.getElementsByTagName(`name`)[0].attributes[0].nodeValue;
    const name = xml.getElementsByTagName(`name`)[0].childNodes[0].nodeValue;
    const address = xml.getElementsByTagName(`address`)[0].childNodes[0].nodeValue;
    const phone = xml.getElementsByTagName(`phone`)[0].childNodes[0].nodeValue;
    
    if(xml.getElementsByTagName(`email`)[0])
    {
        var email = xml.getElementsByTagName(`email`)[0].childNodes[0].nodeValue;
    }
    else
    {
        email = "No email was found."
    }



    const orderID = xml.getElementsByTagName(`order`)[0].attributes[0].nodeValue;
    const orderBy = xml.attributes[0].nodeValue;
    const orderDate = xml.getElementsByTagName(`orderDate`)[0].childNodes[0].nodeValue;
    const itemPrice = xml.getElementsByTagName(`itemPrice`)[0].childNodes[0].nodeValue;
    const itemQty = xml.getElementsByTagName(`itemQty`)[0].childNodes[0].nodeValue;
    

    return{
        custID,
        title,
        name,
        address,
        phone,
        email,
        orderID,
        orderBy,
        orderDate,
        itemPrice,
        itemQty,
    }
}

const displayData = (xmlDoc) => {
    const customers = xmlDoc.getElementsByTagName(`customer`);
    const list = document.getElementById(`customers`);

    for(let index = 0 ; index < customers.length ; index++)
    {
        const element = customers[index];
        const parsedCustomer = parseCustomer(element);

        const customerElement = createCustomer(parsedCustomer);

        list.appendChild(customerElement);
    }
};
xhr("customers.xml").then((data) => displayData(data))