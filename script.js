function div(s){
    const d=document.createElement('div');
    let arr =s.split(' ');
    for(let i=0;i<arr.length;i++){
        d.classList.add(arr[i]);
    }
    return d;
}
const home=document.querySelector('.home');
const pro=document.querySelector('.pro');
const note=document.querySelector('.note');
let cont=document.querySelector('.cont');
let body=document.querySelector('body');
const btnn2=document.querySelector('.btn2');
btnn2.addEventListener('click',()=>{
    const inn=add_ele(btnn2,cont);
    cont.replaceChild(inn,btnn2);
});

class list{
    constructor(title,discription,date,prio,done,project){
        this.title=title;
        this.discription=discription;
        this.date=new Date(date);
        this.prio=prio;
        this.done=done;
        this.project=project;
    }
}
let lists=JSON.parse(localStorage['lists']|| '[]');

let notes=JSON.parse(localStorage['notes']|| '[]');
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function clr(){
    if(home.classList.contains('actv'))home.classList.remove('actv');
    if(pro.classList.contains('actv'))pro.classList.remove('actv');
    if(note.classList.contains('actv'))note.classList.remove('actv');
}

function clr_btns(high,med,low){
    if(med.classList.contains('act'))med.classList.remove('act');
    if(low.classList.contains('act'))low.classList.remove('act');
    if(high.classList.contains('act'))high.classList.remove('act');
}

function list_item(i,ncont,h=false){
    let col='green';
    if(i.prio=='L')col='red';
    else if(i.prio=='M')col='orange';
    const content=div('content item');
    content.style['border-left']='10px solid '+col;
    const toplist=div('toplist');
    const project=div('project');
    project.textContent=i.project;
    project.style['color']=col;
    const operation=div('operation')
    const del=document.createElement('button');
    del.classList.add('del','btn3');
    del.addEventListener('click',()=>{
        for(let j=0;j<lists.length;j++){
            if(lists[j]===i){
                lists.splice(j,1);
                localStorage['lists']=JSON.stringify(lists);
                break;
            }
        }
        ncont.removeChild(content);
    });
    const edit=document.createElement('button');
    edit.classList.add('edit','btn3');
    edit.addEventListener('click',()=>{
        const inn=edit_i(i,content,ncont,h);
        ncont.replaceChild(inn,content);
    });

    operation.append(del,edit);
    toplist.append(project,operation);
    const tit=div('tit');
    tit.textContent=i.title;
    const dis=div('dis');
    dis.textContent=i.discription;
    const downlist=div('downlist');
    const time=document.createElement('time');
    time.classList.add('time');
    time.dateTime=i.date;
    const weekday=div('weekday');
    weekday.textContent=weekdays[i.date.getDay()];
    const day=document.createElement('span');
    day.classList.add('day');
    day.textContent=i.date.getDate();
    const mon=document.createElement('span');
    mon.classList.add('month');
    mon.textContent=month[i.date.getMonth()];
    const year=document.createElement('span');
    year.classList.add('year');
    year.textContent=i.date.getFullYear();
    time.append(weekday,day,mon,year);
    const check=document.createElement('input');
    check.classList.add('check');
    check.type='checkbox';
    if(i.done){
        check.checked=true;
        content.classList.add('blur');
    }
    check.addEventListener('change',()=>{
        if(check.checked){
            i.done=true;
            content.classList.add('blur');
        }
        else{
            i.done=false;
            content.classList.remove('blur');
        }
    });

    downlist.append(time,check);
    content.append(toplist,tit,dis,downlist);
    return content;
}

function edit_i(i,b,ncont,h){
    let obj=i;
    const item_in=div('item in');
    const form=document.createElement('form');
    const tite=document.createElement('input');
    tite.type='text';
    tite.classList.add('tite');
    tite.placeholder='Title';
    tite.required=true;
    tite.value=obj.title;
    const disc=document.createElement('textarea');
    disc.classList.add('disc');
    disc.cols='30';
    disc.rows='10';
    disc.placeholder='Discription';
    disc.textContent=obj.discription;
    const sel=div('sel');
    let txt1=div('txt1');
    txt1.textContent='Project';
    const proj=document.createElement('select');
    proj.disabled=h;
    const op1=document.createElement('option');
    op1.value='GYM';
    op1.textContent='GYM';
    const op2=document.createElement('option');
    op2.value='Today';
    op2.textContent='Today';
    const op3=document.createElement('option');
    op3.value='Study';
    op3.textContent='Study';
    proj.required=true;
    proj.append(op1,op2,op3);
    proj.value=obj.project;
    sel.append(txt1,proj);
    const dt=div('dt');
    const txt2=div('txt1');
    txt2.textContent='Due Date';
    const date=document.createElement('input');
    date.type='date';
    date.classList.add('date');
    date.required=true;
    date.valueAsDate=obj.date;
    dt.append(txt2,date);
    const prio=div('prio');
    txt1=div('txt1');
    txt1.textContent='Priority';
    let lst=obj.prio;
    const options=div('options');
    const high=document.createElement('button');
    high.classList.add('high','btn4');
    const med=document.createElement('button');
    med.classList.add('med','btn4');
    const low=document.createElement('button');
    low.classList.add('low','btn4');
    high.type='button';high.textContent='H';
    low.type='button';low.textContent='L';
    med.type='button';med.textContent='M';
    if(lst=='H')high.classList.add('act');
    else if(lst=='L')low.classList.add('act');
    else med.classList.add('act');
    high.addEventListener('click',()=>{
        clr_btns(high,low,med);
        high.classList.add('act');
        lst='H';
    });
    med.addEventListener('click',()=>{
        clr_btns(high,low,med);
        med.classList.add('act');
        lst='M';
    });
    low.addEventListener('click',()=>{
        clr_btns(high,low,med);
        low.classList.add('act');
        lst='L';
    });
    options.append(high,med,low);
    prio.append(txt1,options);
    const op=div('op');
    const can=document.createElement('button');
    can.classList.add('can','btn5');
    can.type='button';can.textContent='Cancle';
    can.addEventListener('click',()=>{
        ncont.replaceChild(b,item_in);
    });
    const sub=document.createElement('button');
    sub.classList.add('sub','btn5');sub.textContent='Save';
    sub.type='submit';
    form.addEventListener('submit',()=>{
        if(form.checkValidity){
            const title=tite.value;
            const discription=disc.value;
            const project=proj.value;
            const dat=date.value;
            const nlist=new list(title,discription,dat,lst,obj.done,project);
            for(let j=0;j<lists.length;j++){
                if(lists[j]===i){
                    lists[j]=nlist;
                    localStorage['lists']=JSON.stringify(lists);
                    break;
                }
            }
            i=nlist;
            b=list_item(i,ncont);
            ncont.replaceChild(b,item_in);
        }
        
    });
    op.append(can,sub);
    form.append(tite,disc,sel,dt,prio,op);
    item_in.append(form);
    return item_in;
}



function add_ele(b,ncont){
    const item_in=div('item in');
    const form=document.createElement('form');
    const tite=document.createElement('input');
    tite.type='text';
    tite.classList.add('tite');
    tite.placeholder='Title';
    tite.required=true;
    const disc=document.createElement('textarea');
    disc.classList.add('disc');
    disc.cols='30';
    disc.rows='10';
    disc.placeholder='Discription';
    const sel=div('sel');
    let txt1=div('txt1');
    txt1.textContent='Project';
    const proj=document.createElement('select');
    const op1=document.createElement('option');
    op1.value='GYM';
    op1.textContent='GYM';
    const op2=document.createElement('option');
    op2.value='Today';
    op2.textContent='Today';
    const op3=document.createElement('option');
    op3.value='Study';
    op3.textContent='Study';
    proj.required=true;
    proj.append(op1,op2,op3);
    sel.append(txt1,proj);
    const dt=div('dt');
    const txt2=div('txt1');
    txt2.textContent='Due Date';
    const date=document.createElement('input');
    date.type='date';
    date.classList.add('date');
    date.required=true;
    dt.append(txt2,date);
    const prio=div('prio');
    txt1=div('txt1');
    txt1.textContent='Priority';
    let lst='H';
    const options=div('options');
    const high=document.createElement('button');
    high.classList.add('high','btn4','act');
    const med=document.createElement('button');
    med.classList.add('med','btn4');
    const low=document.createElement('button');
    low.classList.add('low','btn4');
    high.type='button';high.textContent='H';
    low.type='button';low.textContent='L';
    med.type='button';med.textContent='M';
    
    high.addEventListener('click',()=>{
        clr_btns(high,low,med);
        high.classList.add('act');
        lst='H';
    });
    med.addEventListener('click',()=>{
        clr_btns(high,low,med);
        med.classList.add('act');
        lst='M';
    });
    low.addEventListener('click',()=>{
        clr_btns(high,low,med);
        low.classList.add('act');
        lst='L';
    });
    options.append(high,med,low);
    prio.append(txt1,options);
    const op=div('op');
    const can=document.createElement('button');
    can.classList.add('can','btn5');
    can.type='button';can.textContent='Cancle';
    can.addEventListener('click',()=>{
        ncont.replaceChild(b,item_in);
    });
    const sub=document.createElement('button');
    sub.classList.add('sub','btn5');sub.textContent='Add';
    sub.type='submit';
    form.addEventListener('submit',()=>{
        if(form.checkValidity){
            const title=tite.value;
            const discription=disc.value;
            const project=proj.value;
            const dat=date.value;
            const nlist=new list(title,discription,dat,lst,false,project);
            lists.push(nlist);
            localStorage['lists']=JSON.stringify(lists);
            const content=list_item(lists[lists.length-1],ncont);
            ncont.append(content);
            ncont.replaceChild(b,item_in);
        }
        
    });
    op.append(can,sub);
    form.append(tite,disc,sel,dt,prio,op);
    item_in.append(form);
    return item_in;
}

function c_home(){
    const ncont=div('cont');
    const btn2=document.createElement('button');
    btn2.textContent='+';
    btn2.classList.add('btn2', 'item');
    btn2.addEventListener('click',()=>{
        const inn=add_ele(btn2,ncont);
        ncont.replaceChild(inn,btn2);
    });
    ncont.append(btn2);
    for(let i=0;i<lists.length;i++){
        const content=list_item(lists[i],ncont);
        ncont.append(content);
    }
    return ncont;
}



function add_pro(){
    const pcont=div('PROJECT');
    const protop=div('projecttop');
    const btop1=document.createElement('button');
    btop1.classList.add('ptop', 'act');
    btop1.textContent='Today';
    const btop2=document.createElement('button');
    btop2.classList.add('ptop');
    btop2.textContent='GYM';
    const btop3=document.createElement('button');
    btop3.classList.add('ptop');
    btop3.textContent='Study';
    const contt=div('cont');
    while(contt.firstChild){
        contt.removeChild(contt.lastChild);
    }
    for(let i=0;i<lists.length;i++){
        if(lists[i].project=='Today'){
            const content=list_item(lists[i],contt,true);
            contt.append(content);
        }
    }
    btop1.addEventListener('click',()=>{
        clr_btns(btop1,btop2,btop3);
        while(contt.firstChild){
            contt.removeChild(contt.lastChild);
        }
        btop1.classList.add('act');
        for(let i=0;i<lists.length;i++){
            if(lists[i].project=='Today'){
                const content=list_item(lists[i],contt,true);
                contt.append(content);
            }
        }
    });
    btop2.addEventListener('click',()=>{
        clr_btns(btop1,btop2,btop3);
        while(contt.firstChild){
            contt.removeChild(contt.lastChild);
        }
        btop2.classList.add('act');
        for(let i=0;i<lists.length;i++){
            if(lists[i].project=='GYM'){
                const content=list_item(lists[i],contt,true);
                contt.append(content);
            }
        }
    });
    btop3.addEventListener('click',()=>{
        clr_btns(btop1,btop2,btop3);
        while(contt.firstChild){
            contt.removeChild(contt.lastChild);
        }
        btop3.classList.add('act');
        for(let i=0;i<lists.length;i++){
            if(lists[i].project=='Study'){
                const content=list_item(lists[i],contt,true);
                contt.append(content);
            }
        }
    });
    protop.append(btop1,btop2,btop3);
    pcont.append(protop,contt);
    return pcont;
}

function edit_note(i,b,ncont){
    let obj=i;
    const item_in=div('item in in2');
    const form=document.createElement('form');
    const disc=document.createElement('textarea');
    disc.classList.add('disc');
    disc.cols='30';
    disc.rows='10';
    disc.placeholder='Note.....';
    disc.required=true;
    disc.textContent=obj;
    const op=div('op');
    const can=document.createElement('button');
    can.classList.add('can','btn5');
    can.type='button';can.textContent='Cancle';
    can.addEventListener('click',()=>{
        ncont.replaceChild(b,item_in);
    });
    const sub=document.createElement('button');
    sub.classList.add('sub','btn5');sub.textContent='Save';
    sub.type='submit';
    form.addEventListener('submit',()=>{
        if(form.checkValidity){
            const discription=disc.value;
            for(let j=0;j<notes.length;j++){
                if(notes[j]===i){
                    notes[j]=discription;
                    localStorage['notes']=JSON.stringify(notes);
                    break;
                }
            }
            i=discription;
            b=add_note(i,ncont);
            ncont.replaceChild(b,item_in);
        }
        
    });
    op.append(can,sub);
    form.append(disc,op);
    item_in.append(form);
    return item_in;
}


function new_note(b,ncont){
    const item_in=div('item in in2');
    const form=document.createElement('form');
    const disc=document.createElement('textarea');
    disc.classList.add('disc');
    disc.cols='30';
    disc.rows='10';
    disc.placeholder='Note.....';
    disc.required=true;
    const op=div('op');
    const can=document.createElement('button');
    can.classList.add('can','btn5');
    can.type='button';can.textContent='Cancle';
    can.addEventListener('click',()=>{
        ncont.replaceChild(b,item_in);
    });
    const sub=document.createElement('button');
    sub.classList.add('sub','btn5');sub.textContent='Save';
    sub.type='submit';
    form.addEventListener('submit',()=>{
        if(form.checkValidity){
            const discription=disc.value;
            notes.push(discription);
            localStorage['notes']=JSON.stringify(notes);
            const n=add_note(notes[notes.length-1],ncont);
            ncont.appendChild(n);
            ncont.replaceChild(b,item_in);
        }
        
    });
    op.append(can,sub);
    form.append(disc,op);
    item_in.append(form);
    return item_in;
}
function add_note(i,ncont){
    const content=div('content item notee');
    const toplist=div('toplist topnote');
    const operation=div('operation')
    const del=document.createElement('button');
    del.classList.add('del','btn3');
    del.addEventListener('click',()=>{
        for(let j=0;j<notes.length;j++){
            if(notes[j]===i){
                notes.splice(j,1);
                localStorage['notes']=JSON.stringify(notes);
                break;
            }
        }
        ncont.removeChild(content);
    });
    const edit=document.createElement('button');
    edit.classList.add('edit','btn3');
    edit.addEventListener('click',()=>{
        const inn=edit_note(i,content,ncont);
        ncont.replaceChild(inn,content);
    });

    operation.append(del,edit);
    toplist.append(operation);
    const dis=div('dis dis2');
    dis.textContent=i;
    content.append(toplist,dis);
    return content;
}
function c_note(){
    const ncont=div('cont');
    const btn22=document.createElement('button');
    btn22.textContent='+';
    btn22.classList.add('btn2', 'item','btnnote');
    btn22.addEventListener('click',()=>{
        const inn=new_note(btn22,ncont);
        ncont.replaceChild(inn,btn22);
    });
    ncont.append(btn22);
    for(let i=0;i<notes.length;i++){
        const content=add_note(notes[i],ncont);
        ncont.append(content);
    }
    return ncont;
}



home.addEventListener('click',()=>{
    clr();
    home.classList.add('actv');
    if(body.contains(cont))body.removeChild(cont);
    cont=c_home();
    body.appendChild(cont);
});
pro.addEventListener('click',()=>{
    clr();
    pro.classList.add('actv');
    if(body.contains(cont))body.removeChild(cont);
    cont=add_pro();
    body.appendChild(cont);
});
note.addEventListener('click',()=>{
    clr();
    note.classList.add('actv');
    if(body.contains(cont))body.removeChild(cont);
    cont=c_note();
    body.appendChild(cont);
});
for(let i=0;i<lists.length;i++){
    lists[i].date=new Date(lists[i].date);
    const content=list_item(lists[i],cont);
    cont.append(content);
}