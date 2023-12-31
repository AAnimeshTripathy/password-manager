const table=document.querySelector(".password-table");

const masking=(txt)=>{
    let s=``;
    for( char in txt){
        s+=`*`;
    }
    return s;
}
const showTable= ()=>{
    table.innerHTML=`<thead>
    <tr>
        <th class="website">Website</th>
        <th class="user-name">User Name</th>
        <th class="password">Password</th>
        <th class="delete">Delete</th>
    </tr>
</thead>
    `;
    let data=localStorage.getItem("passwords");
    let storage=JSON.parse(data);
    if(!storage || storage.length === 0){
        table.innerHTML += `<tr><td colspan="4"  style="text-align: center;">Your Password is Empty!!!</td></tr>`;
    }
    else{
        let storage=JSON.parse(data);
        let string=`<tbody>
        `;
        let num=1;
        for(element of storage){
            let passMask=masking(element.password);
            string+= `<tr>
            <td class="website">${element.website} <img src="copy.svg" alt="Copy Button" style="cursor: pointer;" onclick="copyToClipboard('${element.website}','website')" width="15" height="15" ></td>
            <td class="user-name">${element.username} <img src="copy.svg" alt="Copy Button" style="cursor: pointer;" onclick="copyToClipboard('${element.username}','username')" width="15" height="15" ></td>
            <td class="password">${passMask} <img src="copy.svg" alt="Copy Button" style="cursor: pointer;" onclick="copyToClipboard('${element.password}','password')" width="15" height="15" ></td>
            <td class="delete"><button id="${num}" onclick="deleteData(${num})">Delete</button></td>
            </tr>`;
            num++;
        }
        table.innerHTML+=(string+`</tbody`);
    }
    website.value="";
    username.value="";
    password.value="";
}

const deleteData = (btnId) => {
    let data = JSON.parse(localStorage.getItem("passwords"));
    data.splice(btnId - 1, 1);
    localStorage.setItem("passwords", JSON.stringify(data));
    showTable();
}

const copyToClipboard= async(text,key)=>{
    try {
        await navigator.clipboard.writeText(text);
        document.querySelector("#alert-copy").innerText=`(${key} copied)`;
        setTimeout(() => {
            document.querySelector("#alert-copy").innerText=``;
        }, 1500);
      } catch (err) {
        document.querySelector("#alert-copy").innerText=`(${key} copying failed)`;
        setTimeout(() => {
            document.querySelector("#alert-copy").innerText=``;
        }, 1500);
      }
}

// Opening The website
showTable();

document.querySelector("#save-btn").addEventListener("click",(evt)=>{
    evt.preventDefault();
    let passwords=localStorage.getItem("passwords");
    if(passwords==null){
        let json=[];
        json.push({website:website.value,username:username.value,password:password.value});
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    else{
        let json=JSON.parse(localStorage.getItem("passwords"));
        json.push({website:website.value,username:username.value,password:password.value});
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    showTable();
})

